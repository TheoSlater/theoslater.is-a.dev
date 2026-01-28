import { Box, Typography } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { BentoGrid } from "../components/bento/bento-grid";
import { BentoCard } from "../components/bento/bento-card";
import CardLabel from "../components/bento/card-label";

import { getGithubContributions } from "@/lib/github-contributions";
import GitHubActivityCard from "./github-activity-card";

export default async function GridPage() {
  const contributions = await getGithubContributions();

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        px: { xs: 3, md: 6, lg: 10 },
        py: { xs: 5, md: 8 },
      }}
    >
      <BentoGrid columns={4} gap={16} rowHeight={200}>
        <BentoCard colSpan={2} rowSpan={1} minHeight={320}>
          <CardLabel>Featured Work</CardLabel>
        </BentoCard>
        <BentoCard colSpan={1} rowSpan={1}>
          <CardLabel>Typing speed</CardLabel>
        </BentoCard>
        <BentoCard colSpan={2} rowSpan={1} minHeight={200}>
          <CardLabel>
            <Box
              component="span"
              sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
            >
              <GitHub fontSize="small" sx={{ fontSize: 16 }} />
              GitHub activity
            </Box>
          </CardLabel>
          {contributions ? (
            <GitHubActivityCard data={contributions} />
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 3 }}
            >
              Unable to load GitHub activity right now.
            </Typography>
          )}
        </BentoCard>
        <BentoCard colSpan={2} rowSpan={1} height={220}>
          <CardLabel>Tech stack</CardLabel>
        </BentoCard>
      </BentoGrid>
    </Box>
  );
}
