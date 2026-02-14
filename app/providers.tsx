"use client";
import { ReactNode } from "react";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { bentoPalette } from "@/lib/theme/bento";
const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#010000",
      paper: "#0f161c",
    },
    text: {
      primary: "#ffffff",
      secondary: "#c5c6ce",
    },
    primary: {
      main: "#60e6d7",
      contrastText: "#0b0b0c",
    },
    divider: "rgba(255, 255, 255, 0.12)",
    bento: bentoPalette,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          color: "inherit",
          textDecoration: "none",
          textDecorationColor: "transparent",
        },
        "a:visited": {
          color: "inherit",
          textDecoration: "none",
          textDecorationColor: "transparent",
        },
        "a:hover": {
          color: "inherit",
          textDecoration: "none",
          textDecorationColor: "transparent",
        },
        "a:active": {
          color: "inherit",
          textDecoration: "none",
          textDecorationColor: "transparent",
        },
        "a:focus-visible": {
          outline: "inherit",
        },
      },
    },
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
