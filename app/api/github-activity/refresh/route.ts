import { refreshGithubContributionsCache } from "@/lib/github-contributions";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST() {
  const data = await refreshGithubContributionsCache();
  revalidatePath("/");
  return NextResponse.json({ data });
}
