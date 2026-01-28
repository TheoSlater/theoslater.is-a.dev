import React from "react";
import { Box, Chip } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";

type CardLabelVertical = "top" | "center" | "bottom";
type CardLabelHorizontal = "left" | "center" | "right";
export type CardLabelLocation =
  | `${CardLabelVertical} ${CardLabelHorizontal}`
  | `${CardLabelVertical}-${CardLabelHorizontal}`;

interface CardLabelProps {
  children: React.ReactNode;
  location?: CardLabelLocation;
}

const DEFAULT_LOCATION: CardLabelLocation = "top left";
const LOCATION_OFFSET = 20;

const resolveLocationStyles = (location: CardLabelLocation): SxProps<Theme> => {
  const normalizedLocation = location.replace("-", " ");
  const [vertical, horizontal] = normalizedLocation.split(" ") as [
    CardLabelVertical,
    CardLabelHorizontal,
  ];

  const styles: SxProps<Theme> = {
    position: "absolute",
    zIndex: 1,
  };

  if (vertical === "top") styles.top = LOCATION_OFFSET;
  else if (vertical === "bottom") styles.bottom = LOCATION_OFFSET;
  else styles.top = "50%";

  if (horizontal === "left") styles.left = LOCATION_OFFSET;
  else if (horizontal === "right") styles.right = LOCATION_OFFSET;
  else styles.left = "50%";

  const transforms: string[] = [];
  if (vertical === "center") transforms.push("translateY(-50%)");
  if (horizontal === "center") transforms.push("translateX(-50%)");
  if (transforms.length) styles.transform = transforms.join(" ");

  return styles;
};

export default function CardLabel({
  children,
  location = DEFAULT_LOCATION,
}: CardLabelProps) {
  return (
    <Box sx={resolveLocationStyles(location)}>
      <Chip
        label={children}
        sx={{
          alignItems: "center",
          ".MuiChip-label": {
            display: "inline-flex",
            alignItems: "center",
          },
        }}
      />
    </Box>
  );
}
