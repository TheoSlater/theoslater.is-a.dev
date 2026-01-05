"use client";

import { ReactNode } from "react";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#050505",
      paper: "#111113",
    },
    text: {
      primary: "#e5e5e5",
      secondary: "#c5c6ce",
    },
    primary: {
      main: "#60e6d7",
      contrastText: "#0b0b0c",
    },
    divider: "rgba(255, 255, 255, 0.12)",
  },
  typography: {
    fontFamily:
      "var(--font-inter), var(--font-jetbrains), system-ui, sans-serif",
  },
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
