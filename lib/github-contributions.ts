import { GraphQLClient, gql } from "graphql-request";
import { getGithubUsername } from "./metadata";
import type { GithubContributionData } from "./types/github-types";
import { ONE_DAY_SECONDS } from "./cache";

const GetGithubContributions = gql`
  query ($userName: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $userName) {
      repositories(first: 1, orderBy: { direction: DESC, field: PUSHED_AT }) {
        nodes {
          pushedAt
        }
      }
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

const CACHE_TTL_MS = ONE_DAY_SECONDS * 1000;

type ContributionsCache = {
  expiresAt: number;
  hasValue: boolean;
  promise: Promise<GithubContributionData | null> | null;
  value: GithubContributionData | null;
};

type GithubContributionsResponse = {
  user: {
    repositories: {
      nodes: Array<{
        pushedAt: string | null;
      }>;
    };
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
        weeks: Array<{
          contributionDays: Array<{
            contributionCount: number;
            date: string;
          }>;
        }>;
      };
    };
  };
};

const contributionsCache: ContributionsCache = {
  expiresAt: 0,
  hasValue: false,
  promise: null,
  value: null,
};

const getGithubContributionsUncached =
  async (): Promise<GithubContributionData | null> => {
    const token = process.env.GITHUB_ACCESS_TOKEN;
    if (!token) {
      console.warn("GITHUB_ACCESS_TOKEN is not defined");
      return null;
    }

    const username = getGithubUsername();
    if (!username) {
      console.warn("GitHub username is not set");
      return null;
    }

    const client = new GraphQLClient(GITHUB_GRAPHQL_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    try {
      const now = new Date();
      const to = now.toISOString();
      const fromDate = new Date(now);
      fromDate.setUTCFullYear(now.getUTCFullYear() - 1);
      const from = fromDate.toISOString();

      const response = await client.request<GithubContributionsResponse>(
        GetGithubContributions,
        {
          userName: username,
          from,
          to,
        },
      );

      const calendar =
        response.user.contributionsCollection.contributionCalendar;
      const lastRepo = response.user.repositories.nodes[0];

      return {
        totalContributions: calendar.totalContributions,
        lastPushedAt: lastRepo?.pushedAt ?? new Date().toISOString(),
        contributions: calendar.weeks.flatMap((week) =>
          week.contributionDays.map((day) => ({
            count: day.contributionCount,
            date: day.date,
          })),
        ),
      };
    } catch (error) {
      console.error("Failed to load GitHub contributions", error);
      return null;
    }
  };

const cacheResult = (value: GithubContributionData | null) => {
  contributionsCache.value = value;
  contributionsCache.hasValue = true;
  contributionsCache.expiresAt = Date.now() + CACHE_TTL_MS;
};

const startCacheRefresh = () => {
  const promise = (async () => {
    try {
      const data = await getGithubContributionsUncached();
      cacheResult(data);
      return data;
    } finally {
      contributionsCache.promise = null;
    }
  })();

  contributionsCache.promise = promise;
  return promise;
};

export function invalidateGithubContributionsCache() {
  contributionsCache.hasValue = false;
  contributionsCache.expiresAt = 0;
}

export function refreshGithubContributionsCache() {
  invalidateGithubContributionsCache();
  return startCacheRefresh();
}

export async function getGithubContributions() {
  const now = Date.now();
  const cacheIsFresh =
    contributionsCache.hasValue && contributionsCache.expiresAt > now;

  if (cacheIsFresh) return contributionsCache.value;
  if (contributionsCache.promise) return contributionsCache.promise;
  return startCacheRefresh();
}
