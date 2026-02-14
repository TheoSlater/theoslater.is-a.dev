import type {} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    bento: {
      cardBackground: string;
      cardBorder: string;
      cardHoverShadow: string;
      focusOutline: string;
      icon: string;
      heatmap: Record<number, string>;
    };
  }

  interface PaletteOptions {
    bento?: {
      cardBackground?: string;
      cardBorder?: string;
      cardHoverShadow?: string;
      focusOutline?: string;
      icon?: string;
      heatmap?: Record<number, string>;
    };
  }
}
