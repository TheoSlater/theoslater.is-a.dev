"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    forceGithubActivityRefresh?: () => Promise<void>;
  }
}

const REFRESH_ENDPOINT = "/api/github-activity/refresh";

export default function GlobalBrowserCommands() {
  useEffect(() => {
    const refresh = async () => {
      try {
        await fetch(REFRESH_ENDPOINT, { method: "POST" });
      } catch (error) {
        console.error("Failed to refresh GitHub contributions cache", error);
      }
    };

    window.forceGithubActivityRefresh = refresh;

    return () => {
      delete window.forceGithubActivityRefresh;
    };
  }, []);

  return null;
}
