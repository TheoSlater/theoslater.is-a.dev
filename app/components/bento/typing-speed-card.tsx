"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import TranslateIcon from "@mui/icons-material/Translate";
import Link from "next/link";
import CardLabel from "./card-label";
import { BentoCard } from "./bento-card";

type TypingSpeedPayload = {
  wpm: number;
  accuracy: number;
  duration: string;
  language: string;
  timestamp: number;
};

const TYPING_SPEED_ENDPOINT = "/api/monkeytype/typing-speed";
const MONKEYTYPE_PROFILE_URL = "https://monkeytype.com/profile/TheoSlater";

interface TypingSpeedCardProps {
  colSpan?: number;
  minHeight?: number | string;
  sx?: SxProps<Theme>;
}

declare global {
  interface Window {
    forceTypingSpeedRefresh?: () => Promise<void>;
  }
}

export default function TypingSpeedCard({
  // ignore minHeight if you want true full-height behavior
  minHeight,
  sx,
}: TypingSpeedCardProps) {
  const theme = useTheme();
  const [data, setData] = React.useState<TypingSpeedPayload | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const res = await fetch(TYPING_SPEED_ENDPOINT);
        const json = await res.json();
        if (!isMounted || json?.error) return;
        setData(json);
      } catch {
        // ignore
      }
    };

    window.forceTypingSpeedRefresh = load;
    void load();

    return () => {
      isMounted = false;
      if (window.forceTypingSpeedRefresh === load) {
        delete window.forceTypingSpeedRefresh;
      }
    };
  }, []);

  const wpm = data ? String(data.wpm) : "—";
  const duration = data ? data.duration : "—";
  const accuracy = data ? `${data.accuracy}%` : "—";
  const lang = data ? data.language : "—";

  return (
    <BentoCard
      component={Link}
      href={MONKEYTYPE_PROFILE_URL}
      target="_blank"
      rel="noreferrer"
      ariaLabel="Open Monkeytype profile"
      rowSpan={1}
      minHeight={minHeight}
      sx={[
        {
          cursor: "pointer",
          textDecoration: "none !important",
          textDecorationColor: "transparent",
          color: "inherit",
          "&:link": {
            color: "inherit",
            textDecoration: "none",
            textDecorationColor: "transparent",
          },
          "&:visited": {
            color: "inherit",
            textDecoration: "none",
            textDecorationColor: "transparent",
          },
          "&:active": {
            color: "inherit",
            textDecoration: "none",
            textDecorationColor: "transparent",
          },
          "&:hover": {
            textDecoration: "none",
            textDecorationColor: "transparent",
          },
          "& *": {
            textDecoration: "none !important",
            textDecorationColor: "transparent",
            color: "inherit",
          },
          "& .MuiTypography-root": {
            textDecoration: "none !important",
            textDecorationColor: "transparent",
            color: "inherit",
          },
          "&:focus-visible": {
            outline: `2px solid ${theme.palette.bento.focusOutline}`,
            outlineOffset: "4px",
          },

          // ensure the card fills the grid row height
          height: "100%",
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
        },
        sx,
      ]}
    >
      <CardLabel>
        <Box
          component="span"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            color: "text.primary",
          }}
        >
          <KeyboardIcon fontSize="small" sx={{ fontSize: 18 }} />
          Typing speed
        </Box>
      </CardLabel>

      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 160, md: 180 },
            fontWeight: 700,
            color: alpha(theme.palette.text.primary, 0.04),
            maskImage:
              "linear-gradient(to bottom, white 50%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, white 50%, transparent 100%)",
          }}
        >
          {wpm}
        </Typography>
      </Box>

      <Box
        sx={{
          position: "relative",

          // let this area take the remaining height
          flex: 1,
          minHeight: 0,

          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          zIndex: 10,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
          <Typography
            sx={{
              fontSize: { xs: 64, sm: 72, md: 80 },
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "text.primary",
              lineHeight: 1,
            }}
          >
            {wpm}
          </Typography>
          <Typography
            sx={{
              fontSize: 20,
              color: "text.secondary",
              fontWeight: 600,
            }}
          >
            wpm
          </Typography>
        </Box>

        <Box
          sx={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
            mt: 2,
            color: alpha(theme.palette.text.primary, 0.5),
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <AccessTimeIcon sx={{ fontSize: 16 }} />
            <Typography sx={{ fontSize: 14 }}>{duration}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <TaskAltIcon sx={{ fontSize: 16 }} />
            <Typography sx={{ fontSize: 14 }}>{accuracy}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <TranslateIcon sx={{ fontSize: 16 }} />
            <Typography sx={{ fontSize: 14 }}>{lang}</Typography>
          </Box>
        </Box>
      </Box>
    </BentoCard>
  );
}
