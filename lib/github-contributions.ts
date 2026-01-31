import { GraphQLClient, gql } from "graphql-request";
import { unstable_cache } from "next/cache";
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

    const response = (await client.request(GetGithubContributions, {
      userName: username,
      from,
      to,
    })) as { user: any };

      const calendar =
        response.user.contributionsCollection.contributionCalendar;
      const lastRepo = response.user.repositories.nodes[0];

      return {
        totalContributions: calendar.totalContributions,
        lastPushedAt: lastRepo?.pushedAt ?? new Date().toISOString(),
        contributions: calendar.weeks.flatMap((week: any) =>
          week.contributionDays.map((day: any) => ({
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

export const getGithubContributions = unstable_cache(
  getGithubContributionsUncached,
  ["github-contributions"],
  { revalidate: ONE_DAY_SECONDS },
);
