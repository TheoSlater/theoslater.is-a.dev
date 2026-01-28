"use client";
import { Container } from "@mui/material";
import type { ReactNode } from "react";

type ForegroundProps = {
  children: ReactNode;
};

export function Foreground({ children }: ForegroundProps) {
  return (
    <Container maxWidth="lg" sx={{ zIndex: 1 }}>
      {children}
    </Container>
  );
}
