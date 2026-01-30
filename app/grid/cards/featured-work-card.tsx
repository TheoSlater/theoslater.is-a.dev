import { WorkOutline } from "@mui/icons-material";
import { BentoCard } from "../../components/bento/bento-card";
import CardLabelWithIcon from "./card-label-with-icon";

export default function FeaturedWorkCard() {
  return (
    <BentoCard
      colSpan={2}
      rowSpan={1}
      minHeight={320}
      sx={{
        minHeight: { xs: "220px", sm: "260px", md: "320px" },
        gridColumn: { sm: "span 2" },
      }}
    >
      <CardLabelWithIcon icon={<WorkOutline fontSize="small" sx={{ fontSize: 18 }} />}>
        Featured Work
      </CardLabelWithIcon>
    </BentoCard>
  );
}
