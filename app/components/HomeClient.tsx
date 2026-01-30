"use client";

import { Box } from "@mui/material";
import { useCallback, useState } from "react";
import { LoadingScreen } from "./LoadingScreen";
import { HeroSection } from "./HeroSection";

export function HomeClient() {
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), [setReady]);

  return (
    <>
      {!ready && <LoadingScreen />}
      <Box
        sx={{
          opacity: ready ? 1 : 0,
          transition: "opacity 600ms ease",
        }}
      >
        <HeroSection onReady={handleReady} />
      </Box>
    </>
  );
}
