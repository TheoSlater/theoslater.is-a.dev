"use client";

import { Box, Typography } from "@mui/material";

export function LoadingScreen() {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      <Typography
        sx={{
          fontSize: "1.2rem",
          letterSpacing: "0.15em",
          opacity: 0.8,
        }}
      >
        LOADING
      </Typography>
    </Box>
  );
}
