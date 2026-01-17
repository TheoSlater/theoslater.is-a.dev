import { Chip, IconButton, Stack, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import GreenPulse from "./Icons/GreenPulse";

export function HeroContent() {
  return (
    <Stack spacing={4} alignItems="flex-start" textAlign="left">
      <Chip
        icon={<GreenPulse />}
        label="Available for projects"
        sx={(theme) => ({
          p: 1,
          width: "fit-content",
          fontWeight: 500,
          color: theme.palette.primary.main,
          backgroundColor: "transparent",
          border: `1px solid ${theme.palette.divider}`,
        })}
      />

      <Typography variant="h3" fontWeight={550}>
        Hi, I&apos;m Theo.
        <br />A software engineer.
      </Typography>

      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ maxWidth: "30vw" }}
      >
        Mainly working with modern languages, I focus on learning,
        problem-solving, and building.
      </Typography>

      <IconButton
        component="a"
        href="https://github.com/TheoSlater"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ width: "fit-content" }}
        aria-label="GitHub profile"
      >
        <GitHubIcon />
      </IconButton>
    </Stack>
  );
}
