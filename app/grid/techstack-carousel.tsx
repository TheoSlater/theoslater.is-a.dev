import { Box, Typography } from "@mui/material";
import type { SimpleIcon } from "simple-icons";
import { bentoPalette } from "@/lib/theme/bento";
import {
  siAstro,
  siDotnet,
  siJavascript,
  siMui,
  siNextdotjs,
  siNodedotjs,
  siPython,
  siReact,
  siRust,
  siShadcnui,
  siTauri,
  siTypescript,
  siVite,
} from "simple-icons";

const TECH_STACK: Array<{ name: string; icon: SimpleIcon }> = [
  { name: "React", icon: siReact },
  { name: "Next.js", icon: siNextdotjs },
  { name: "TypeScript", icon: siTypescript },
  { name: "Node.js", icon: siNodedotjs },
  { name: "JavaScript", icon: siJavascript },
  { name: "C#", icon: siDotnet },
  { name: "Python", icon: siPython },
  { name: "Material UI", icon: siMui },
  { name: "shadcn/ui", icon: siShadcnui },
  { name: "Tauri", icon: siTauri },
  { name: "Vite", icon: siVite },
  { name: "Astro", icon: siAstro },
  { name: "Rust", icon: siRust },
];

const ICON_SIZE = 48;

function TechIcon({ icon, label }: { icon: SimpleIcon; label: string }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: ICON_SIZE + 36,
        color: bentoPalette.icon,
      }}
      aria-label={label}
    >
      <Box
        component="svg"
        viewBox="0 0 24 24"
        aria-hidden
        focusable="false"
        sx={{ width: ICON_SIZE, height: ICON_SIZE, flexShrink: 0 }}
      >
        <path fill="currentColor" d={icon.path} />
      </Box>
    </Box>
  );
}

export default function TechStackCarousel() {
  const items = [...TECH_STACK, ...TECH_STACK];

  return (
    <Box
      sx={{
        mt: "auto",
        pt: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 2,
        height: "100%",
      }}
    >
      <Box
        sx={{
          overflow: "hidden",
          maskImage:
            "linear-gradient(90deg, transparent, rgba(0,0,0,0.35) 18%, black 50%, rgba(0,0,0,0.35) 82%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, rgba(0,0,0,0.35) 18%, black 50%, rgba(0,0,0,0.35) 82%, transparent)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            width: "max-content",
            animation: "techstack-marquee 16s linear infinite",
            "@keyframes techstack-marquee": {
              "0%": { transform: "translateX(0)" },
              "100%": { transform: "translateX(-50%)" },
            },
            "@media (prefers-reduced-motion: reduce)": {
              animation: "none",
              transform: "translateX(0)",
            },
          }}
        >
          {items.map((item, index) => (
            <TechIcon
              key={`${item.name}-${index}`}
              icon={item.icon}
              label={item.name}
            />
          ))}
        </Box>
      </Box>
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
          Tech stacks I&apos;m familiar with
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Primarily focused on the JavaScript ecosystem, but always eager to
          explore and learn new technologies.
        </Typography>
      </Box>
    </Box>
  );
}
