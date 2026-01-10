"use client";

import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import { useState } from "react";

import { BlurBackground } from "./components/BlurBackground";
import DarkVeil from "./components/DarkVeil";
import { Foreground } from "./components/Foreground";
import { LoadingScreen } from "./components/LoadingScreen";
import GreenPulse from "./components/Icons/GreenPulse";

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <>
      {!ready && <LoadingScreen />}

      <Box
        sx={{
          opacity: ready ? 1 : 0,
          transition: "opacity 600ms ease",
        }}
      >
        {/* HERO SECTION */}
        <BlurBackground>
          <DarkVeil onReadyAction={() => setReady(true)} />
          <Foreground>
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

              <Typography variant="h3" fontWeight={500}>
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
          </Foreground>
        </BlurBackground>

        {/* UNDER CONSTRUCTION SECTION */}
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
              This section is actively being built. More projects, experiments,
              and things that might actually ship are coming soon.
            </Typography>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
