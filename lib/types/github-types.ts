
export interface GithubContributionDay {
  count: number;
  date: string;
}

export interface GithubContributionData {
  totalContributions: number;
  lastPushedAt: string;
  contributions: GithubContributionDay[];
}
