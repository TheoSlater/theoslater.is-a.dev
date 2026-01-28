
export const getGithubUsername = (): string | undefined => {
  const candidates = [
    process.env.GITHUB_USERNAME,
    process.env.NEXT_PUBLIC_GITHUB_USERNAME,
  ];

  const username = candidates
    .map((value) => value?.trim())
    .find((value): value is string => Boolean(value));

  return username ?? "TheoSlater";
};
