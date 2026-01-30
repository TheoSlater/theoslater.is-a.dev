import { Code } from "@mui/icons-material";
import { BentoCard } from "../../components/bento/bento-card";
import CardLabelWithIcon from "./card-label-with-icon";
import TechStackCarousel from "../techstack-carousel";

export default function TechStackCard() {
  return (
    <BentoCard
      colSpan={2}
      rowSpan={1}
      sx={{
        minHeight: { xs: "200px", sm: "220px", md: "240px" },
        gridColumn: { sm: "span 2" },
      }}
    >
      <CardLabelWithIcon icon={<Code fontSize="small" sx={{ fontSize: 18 }} />}>
        Tech stack
      </CardLabelWithIcon>
      <TechStackCarousel />
    </BentoCard>
  );
}
