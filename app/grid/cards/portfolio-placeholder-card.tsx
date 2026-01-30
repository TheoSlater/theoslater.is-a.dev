import { CollectionsBookmark } from "@mui/icons-material";

import { BentoCard } from "../../components/bento/bento-card";
import CardLabelWithIcon from "./card-label-with-icon";

export default function PortfolioPlaceholderCard() {
  return (
    <BentoCard
      colSpan={1}
      rowSpan={1}
      minHeight={200}
      sx={{ minHeight: { xs: "200px", md: "220px" } }}
    >
      <CardLabelWithIcon
        icon={<CollectionsBookmark fontSize="small" sx={{ fontSize: 18 }} />}
      >
        Portfolio
      </CardLabelWithIcon>
    </BentoCard>
  );
}
