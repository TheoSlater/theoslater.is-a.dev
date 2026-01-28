"use client";

import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import type { ReactNode } from "react";

const toCssSize = (value?: number | string) =>
  value === undefined ? undefined : typeof value === "number" ? `${value}px` : value;

interface BentoGridProps {
  children: ReactNode;
  columns?: number;
  gap?: number;
  rowHeight?: number | string;
  sx?: SxProps<Theme>;
}

export function BentoGrid({
  children,
  columns = 4,
  gap = 16,
  rowHeight,
  sx,
}: BentoGridProps) {
  const gridAutoRows = rowHeight
    ? `minmax(${toCssSize(rowHeight)}, auto)`
    : "minmax(160px, auto)";
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: `repeat(${columns}, 1fr)`,
        },
        gridAutoRows,
        gap: `${gap}px`,
        width: "100%",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
