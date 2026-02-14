"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
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
  const theme = useTheme();
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
        "&:hover": {
          textDecoration: "none",
        },
        "& *": {
          textDecoration: "none",
        },
        "&:focus-visible": {
          outline: `2px solid ${theme.palette.bento.focusOutline}`,
          outlineOffset: "4px",
        },
      }}
    >
      <BentoCard
        colSpan={colSpan}
        rowSpan={rowSpan}
        minHeight={minHeight}
        sx={[
          {
            cursor: "pointer",
            transition: "transform 200ms ease, box-shadow 200ms ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: theme.palette.bento.cardHoverShadow,
            },
          },
          sx,
        ]}
      >
        {children}
      </BentoCard>
    </Box>
  );
}
