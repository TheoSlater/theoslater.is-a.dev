"use client";

import { Box } from "@mui/material";
import { useCallback, useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { HeroSection } from "./components/HeroSection";

export default function Home() {
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
