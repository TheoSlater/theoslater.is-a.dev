"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import TranslateIcon from "@mui/icons-material/Translate";
import CardLabel from "./card-label";
import { BentoCard } from "./bento-card";

type TypingSpeedPayload = {
  wpm: number;
  accuracy: number; // Monkeytype "acc"
  duration: string; // "15s"
  language: string; // "english"
  timestamp: number; // ms epoch
};

interface TypingSpeedCardProps {
  colSpan?: number;
  minHeight?: number | string;
  sx?: SxProps<Theme>;
}

export default function TypingSpeedCard({
  colSpan = 1,
  minHeight = 0,
  sx,
}: TypingSpeedCardProps) {
  const [data, setData] = React.useState<TypingSpeedPayload | null>(null);

  React.useEffect(() => {
    let alive = true;

    fetch("/api/monkeytype/typing-speed")
      .then((r) => r.json())
      .then((j) => {
        if (!alive) return;
        if (j?.error) return;
        setData(j);
      })
      .catch(() => {});

    return () => {
      alive = false;
    };
  }, []);

  const wpm = data ? String(data.wpm) : "—";
  const duration = data ? data.duration : "—";
  const accuracy = data ? `${data.accuracy}%` : "—";
  const lang = data ? data.language : "—";

  return (
    <BentoCard colSpan={colSpan} minHeight={minHeight} sx={sx} rowSpan={1}>
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
          sx={(t) => ({
            fontSize: { xs: 160, md: 180 },
            fontWeight: 700,

            color: alpha(t.palette.text.primary, 0.04),
            maskImage:
              "linear-gradient(to bottom, white 50%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, white 50%, transparent 100%)",
          })}
        >
          {wpm}
        </Typography>
      </Box>

      <Box
        sx={{
          position: "relative",
          flex: 1,
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
          sx={(t) => ({
            position: "relative",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
            mt: 2,
            color: alpha(t.palette.text.primary, 0.5),
          })}
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
