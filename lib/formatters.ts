
export const formatNumber = (value: number): string =>
  new Intl.NumberFormat("en-US").format(value);

export const formatDate = (value: Date): string =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(value);

export const formatMonthDay = (value: Date): string =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(value);

const suffixes: Record<number, string> = {
  1: "st",
  2: "nd",
  3: "rd",
};

export const getDateSuffix = (day: number): string => {
  if (day >= 11 && day <= 13) {
    return "th";
  }

  return suffixes[day % 10] ?? "th";
};
