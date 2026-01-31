import { NextResponse } from "next/server";
import { ONE_DAY_SECONDS, ONE_HOUR_SECONDS } from "@/lib/cache";

// Next.js segment config requires a literal value.
export const revalidate = 60 * 60 * 24;

type MonkeytypeResult = {
  wpm: number;
  acc: number;
  mode: string;
  mode2?: string | number;
  testDuration: number;
  timestamp: number;
  language: string;
};

export async function GET() {
  const apeKey = process.env.MONKEYTYPE_APE_KEY;
  if (!apeKey) {
    return NextResponse.json(
      { error: "Missing MONKEYTYPE_APE_KEY" },
      { status: 500 },
    );
  }

  const res = await fetch("https://api.monkeytype.com/results?limit=250", {
    headers: { Authorization: `ApeKey ${apeKey}` },
  });

  if (!res.ok) {
    return NextResponse.json(
      {
        error: "Monkeytype API error",
        status: res.status,
        body: await res.text(),
      },
      { status: 502 },
    );
  }

  const json = (await res.json()) as { data?: MonkeytypeResult[] };
  const data = Array.isArray(json.data) ? json.data : [];

  const is15s = (r: MonkeytypeResult) => {
    const td = Number(r.testDuration);
    const m2 = r.mode2 != null ? String(r.mode2) : "";
    return m2 === "15" || (Number.isFinite(td) && td >= 14.5 && td <= 15.5);
  };

  const latest15 = data
    .filter((r) => r.mode === "time" && is15s(r))
    .sort((a, b) => b.timestamp - a.timestamp)[0];

  if (!latest15) {
    return NextResponse.json(
      { error: "no 15secs time result found in fetched results" },
      { status: 404 },
    );
  }

  return NextResponse.json(
    {
      wpm: Math.round(latest15.wpm),
      accuracy: Math.round(latest15.acc),
      duration: "15s",
      language: latest15.language,
      timestamp: latest15.timestamp,
    },
    {
      headers: {
        "Cache-Control":
          `public, max-age=0, s-maxage=${ONE_DAY_SECONDS}, stale-while-revalidate=${ONE_HOUR_SECONDS}`,
      },
    },
  );
}
