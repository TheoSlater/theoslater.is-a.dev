"use client";

import { Chip, IconButton, Stack, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { motion } from "framer-motion";
import GreenPulse from "./Icons/GreenPulse";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 14,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function HeroContent() {
  return (
    <Stack
      spacing={4}
      alignItems="flex-start"
      textAlign="left"
      sx={{
        width: "100%",
        maxWidth: "min(640px, 100%)",
      }}
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} style={{ willChange: "filter, transform, opacity" }}>
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
      </motion.div>

      <motion.div variants={itemVariants} style={{ willChange: "filter, transform, opacity" }}>
        <Typography variant="h3" fontWeight={450}>
          Hi, I&apos;m Theo.
          <br />A software engineer.
        </Typography>
      </motion.div>

      <motion.div variants={itemVariants} style={{ willChange: "filter, transform, opacity" }}>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{
            maxWidth: {
              xs: "100%",
              sm: "32rem",
            },
          }}
        >
          Mainly working with modern languages, I focus on learning,
          problem-solving, and building.
        </Typography>
      </motion.div>

      <motion.div variants={itemVariants} style={{ willChange: "filter, transform, opacity" }}>
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
      </motion.div>
    </Stack>
  );
}
