import { Box, Typography } from "@mui/material";
import { Code, GitHub, Keyboard, WorkOutline } from "@mui/icons-material";
import { BentoGrid } from "../components/bento/bento-grid";
import { BentoCard } from "../components/bento/bento-card";
import CardLabel from "../components/bento/card-label";

import { getGithubContributions } from "@/lib/github-contributions";
import GitHubActivityCard from "./github-activity-card";
import TechStackCarousel from "./techstack-carousel";

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
          <CardLabel>
            <Box
              component="span"
              sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}
            >
              <WorkOutline fontSize="small" sx={{ fontSize: "18px" }} />
              Featured Work
            </Box>
          </CardLabel>
        </BentoCard>
        <BentoCard colSpan={1} rowSpan={1}>
          <CardLabel>
            <Box
              component="span"
              sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}
            >
              <Keyboard fontSize="small" sx={{ fontSize: "18px" }} />
              Typing speed
            </Box>
          </CardLabel>
        </BentoCard>
        <BentoCard colSpan={2} rowSpan={1} minHeight={200}>
          <CardLabel>
            <Box
              component="span"
              sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}
            >
              <GitHub fontSize="small" sx={{ fontSize: "18px" }} />
              GitHub activity
            </Box>
          </CardLabel>
          {contributions ? (
            <GitHubActivityCard data={contributions} />
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
              Unable to load GitHub activity right now.
            </Typography>
          )}
        </BentoCard>
        <BentoCard colSpan={2} rowSpan={1} height={220}>
          <CardLabel>
            <Box
              component="span"
              sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}
            >
              <Code fontSize="small" sx={{ fontSize: "18px" }} />
              Tech stack
            </Box>
          </CardLabel>
          <TechStackCarousel />
        </BentoCard>
      </BentoGrid>
    </Box>
  );
}
