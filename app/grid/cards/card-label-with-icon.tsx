import { Box } from "@mui/material";
import type { ReactNode } from "react";
import CardLabel from "../../components/bento/card-label";

interface CardLabelWithIconProps {
  icon: ReactNode;
  children: ReactNode;
}

export default function CardLabelWithIcon({
  icon,
  children,
}: CardLabelWithIconProps) {
  return (
    <CardLabel>
      <Box
        component="span"
        sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}
      >
        {icon}
        {children}
      </Box>
    </CardLabel>
  );
}
