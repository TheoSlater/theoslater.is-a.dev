"use client";

import { Box } from "@mui/material";
import { ReactNode } from "react";

type BlurBackgroundProps = {
  children: ReactNode;
};

export function BlurBackground({ children }: BlurBackgroundProps) {
  return (
    <Box
      component="main"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        textAlign: "left",
        px: 2,
        overflow: "hidden",

        // "&::before": {
        //   content: '""',
        //   position: "absolute",
        //   inset: 0,
        //   backgroundImage: "url(/background.jpg)",
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   filter: "blur(14px)",
        //   transform: "scale(1.1)",
        //   zIndex: 0,
        // },

        // "&::after": {
        //   content: '""',
        //   position: "absolute",
        //   inset: 0,
        //   backgroundColor: "rgba(0,0,0,0.35)",
        //   zIndex: 1,
        // },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 2 }}>{children}</Box>
    </Box>
  );
}
