"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material";
import { BentoCard } from "./bento-card";

interface BentoLinkCardProps {
  href: string;
  children: ReactNode;
  colSpan?: number;
  rowSpan?: number;
  minHeight?: number | string;
  sx?: SxProps<Theme>;
}

export function BentoLinkCard({
  href,
  children,
  colSpan,
  rowSpan,
  minHeight,
  sx,
}: BentoLinkCardProps) {
  return (
    <Box
      component={Link}
      href={href}
      sx={{
        display: "block",
        width: "100%",
        height: "100%",
        textDecoration: "none",
        color: "inherit",
        "&:focus-visible": {
          outline: "2px solid rgba(148, 163, 184, 0.8)",
          outlineOffset: "4px",
        },
      }}
    >
      <BentoCard
        colSpan={colSpan}
        rowSpan={rowSpan}
        minHeight={minHeight}
        sx={{
          cursor: "pointer",
          transition: "transform 200ms ease, box-shadow 200ms ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 18px 40px rgba(15, 23, 42, 0.35)",
          },
          ...sx,
        }}
      >
        {children}
      </BentoCard>
    </Box>
  );
}
