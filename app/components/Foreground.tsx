"use client";
import { Container } from "@mui/material";

export function Foreground({ children }: { children: React.ReactNode }) {
  return (
    <Container maxWidth="lg" sx={{ zIndex: 1 }}>
      {children}
    </Container>
  );
}
