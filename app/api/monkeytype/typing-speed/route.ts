import { NextResponse } from "next/server";
import { ONE_DAY_SECONDS, ONE_HOUR_SECONDS } from "@/lib/cache";

type MonkeytypeResult = {
  wpm: number;
  acc: number;
  mode: string;
  mode2?: string | number;
  testDuration: number;
  timestamp: number;
  language: string;
};

type TypingSpeedPayload = {
  wpm: number;
  accuracy: number;
  duration: "15s";
  language: string;
  timestamp: number;
};

const fetchTypingSpeed = async (): Promise<TypingSpeedPayload | null> => {
  const apeKey = process.env.MONKEYTYPE_APE_KEY;
  if (!apeKey) {
    console.error("Missing MONKEYTYPE_APE_KEY");
    return null;
  }

  const res = await fetch("https://api.monkeytype.com/results?limit=250", {
    headers: { Authorization: `ApeKey ${apeKey}` },
  });

  if (!res.ok) {
    console.error("Monkeytype API error", { status: res.status });
    return null;
  }

  const json = (await res.json()) as { data?: MonkeytypeResult[] };
  const data = Array.isArray(json.data) ? json.data : [];
  const best15 = data
    .filter((result) => {
      if (result.mode !== "time") return false;
      if (String(result.mode2 ?? "") === "15") return true;
      const duration = Number(result.testDuration);
      return Number.isFinite(duration) && duration >= 14.5 && duration <= 15.5;
    })
    .sort((a, b) => {
      const wpmDiff = b.wpm - a.wpm;
      if (wpmDiff !== 0) return wpmDiff;
      const accDiff = b.acc - a.acc;
      if (accDiff !== 0) return accDiff;
      return b.timestamp - a.timestamp;
    })[0];

  if (!best15) {
    console.error("No 15s time result found in fetched results");
    return null;
  }

  return {
    wpm: Math.round(best15.wpm),
    accuracy: Math.round(best15.acc),
    duration: "15s",
    language: best15.language,
    timestamp: best15.timestamp,
  };
};

export async function GET() {
  const data = await fetchTypingSpeed();

  if (!data) {
    return NextResponse.json(
      { error: "Unable to load typing speed" },
      { status: 502 },
    );
  }

  return NextResponse.json(data, {
    headers: {
      "Cache-Control":
        `public, max-age=0, s-maxage=${ONE_DAY_SECONDS}, stale-while-revalidate=${ONE_HOUR_SECONDS}`,
    },
  });
}
