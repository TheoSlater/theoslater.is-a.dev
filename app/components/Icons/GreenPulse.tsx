import { Box } from "@mui/material";

export default function GreenPulse() {
  return (
    <Box
      component="span"
      sx={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        backgroundColor: "success.main",
        boxShadow: "0 0 12px rgba(76, 175, 80, 0.75)",
        filter: "drop-shadow(0 0 8px rgba(76, 175, 80, 0.5))",
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "1px solid",
          borderColor: "success.main",
          animation: "pulse 1800ms ease-in-out infinite",
        },
        "@keyframes pulse": {
          "0%": {
            transform: "scale(0.85)",
            opacity: 0.7,
          },
          "70%": {
            transform: "scale(1.7)",
            opacity: 0,
          },
          "100%": {
            transform: "scale(0.85)",
            opacity: 0,
          },
        },
      }}
    />
  );
}
