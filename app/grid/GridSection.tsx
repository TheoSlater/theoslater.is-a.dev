import { Box } from "@mui/material";
import type { ElementType } from "react";
import { BentoGrid } from "../components/bento/bento-grid";

import { getGithubContributions } from "@/lib/github-contributions";
import TypingSpeedCard from "../components/bento/typing-speed-card";
import FeaturedWorkCard from "./cards/featured-work-card";
import GitHubActivityCardSection from "./cards/github-activity-card-section";
import TechStackCard from "./cards/tech-stack-card";
import PortfolioPlaceholderCard from "./cards/portfolio-placeholder-card";

type GridSectionProps = {
  component?: ElementType;
};

export default async function GridSection({
  component = "section",
}: GridSectionProps) {
  const contributions = await getGithubContributions();

  return (
    <Box
      component={component}
      sx={{
        minHeight: "100vh",
        px: { xs: 3, md: 6, lg: 10 },
        py: { xs: 5, md: 8 },
      }}
    >
      <BentoGrid
        columns={4}
        gap={16}
        rowHeight={200}
        sx={{
          gap: { xs: "12px", sm: "16px", lg: "20px" },
          gridAutoRows: {
            xs: "minmax(180px, auto)",
            sm: "minmax(200px, auto)",
            md: "minmax(220px, auto)",
          },
        }}
      >
        <FeaturedWorkCard />
        <PortfolioPlaceholderCard />
        <TypingSpeedCard />
        <GitHubActivityCardSection contributions={contributions} />
        <TechStackCard />
      </BentoGrid>
    </Box>
  );
}
