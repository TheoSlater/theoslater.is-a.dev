import { NextResponse } from "next/server";
import { ONE_DAY_SECONDS, ONE_HOUR_SECONDS } from "@/lib/cache";

// Next.js segment config requires a literal value.
export const revalidate = 86400;

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

const CACHE_TTL_MS = ONE_DAY_SECONDS * 1000;

type CacheState = {
  expiresAt: number;
  value: TypingSpeedPayload | null;
  promise: Promise<TypingSpeedPayload | null> | null;
};

const cache: CacheState = {
  expiresAt: 0,
  value: null,
  promise: null,
};

const is15s = (r: MonkeytypeResult) => {
  const td = Number(r.testDuration);
  const m2 = r.mode2 != null ? String(r.mode2) : "";
  return m2 === "15" || (Number.isFinite(td) && td >= 14.5 && td <= 15.5);
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
    .filter((r) => r.mode === "time" && is15s(r))
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

const startCacheRefresh = (): Promise<TypingSpeedPayload | null> => {
  const promise = (async () => {
    try {
      const data = await fetchTypingSpeed();
      if (data) {
        cache.value = data;
        cache.expiresAt = Date.now() + CACHE_TTL_MS;
      }
      return cache.value;
    } finally {
      cache.promise = null;
    }
  })();

  cache.promise = promise;
  return promise;
};

const getTypingSpeed = async () => {
  const now = Date.now();
  const cacheIsFresh = cache.value && cache.expiresAt > now;

  if (cacheIsFresh) return cache.value;
  if (cache.promise) return cache.promise;
  return startCacheRefresh();
};

export async function GET() {
  const data = await getTypingSpeed();

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
