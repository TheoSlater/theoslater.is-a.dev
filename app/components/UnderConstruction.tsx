"use client";

import { Box, Stack, Typography } from "@mui/material";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";

export function UnderConstruction() {
  return (
    <Box
      component="section"
      sx={(theme) => ({
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 4,
        borderTop: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Stack spacing={2.5} alignItems="center" textAlign="center">
        <BuildRoundedIcon
          sx={{
            fontSize: 42,
            color: "text.secondary",
          }}
        />

        <Typography variant="h4" fontWeight={500}>
          Under construction
        </Typography>

        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ maxWidth: 460 }}
        >
          This section is actively being built. More projects, experiments, and
          things that might actually ship are coming soon.
        </Typography>
      </Stack>
    </Box>
  );
}
