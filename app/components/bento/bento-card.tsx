"use client";

import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import type { ReactNode } from "react";

const toCssSize = (value?: number | string) =>
  value === undefined
    ? undefined
    : typeof value === "number"
      ? `${value}px`
      : value;

interface BentoCardProps {
  children?: ReactNode;
  colSpan?: number;
  rowSpan?: number;
  width?: number | string;
  height?: number | string;
  minHeight?: number | string;
  aspectRatio?: string;
  sx?: SxProps<Theme>;
}

export function BentoCard({
  children,
  colSpan = 1,
  rowSpan = 1,
  width,
  height,
  minHeight,
  aspectRatio,
  sx,
}: BentoCardProps) {
  const cardMinHeight = toCssSize(minHeight) ?? "160px";
  return (
    <Box
      sx={{
        gridColumn: { xs: "span 1", md: `span ${colSpan}` },
        gridRow: { xs: "span 1", md: `span ${rowSpan}` },
        backgroundColor: "rgba(30, 41, 59, 0.6)",
        borderRadius: "24px",
        border: "1px solid",
        borderColor: "divider",
        padding: "24px",
        minHeight: cardMinHeight,
        height: toCssSize(height),
        width: toCssSize(width),
        aspectRatio,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
