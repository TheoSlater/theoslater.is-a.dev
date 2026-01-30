import { GitHub } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { BentoCard } from "../../components/bento/bento-card";
import type { GithubContributionData } from "@/lib/types/github-types";
import GitHubActivityCard from "../github-activity-card";
import CardLabelWithIcon from "./card-label-with-icon";

interface GitHubActivityCardSectionProps {
  contributions: GithubContributionData | null;
}

export default function GitHubActivityCardSection({
  contributions,
}: GitHubActivityCardSectionProps) {
  return (
    <BentoCard
      colSpan={2}
      rowSpan={1}
      minHeight={200}
      sx={{
        minHeight: { xs: "220px", sm: "240px", md: "260px" },
        gridColumn: { sm: "span 2" },
      }}
    >
      <CardLabelWithIcon
        icon={<GitHub fontSize="small" sx={{ fontSize: 18 }} />}
      >
        GitHub activity
      </CardLabelWithIcon>
      {contributions ? (
        <GitHubActivityCard data={contributions} />
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          Unable to load GitHub activity right now.
        </Typography>
      )}
    </BentoCard>
  );
}
