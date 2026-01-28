"use client";

import { Box, Typography } from "@mui/material";
import HeatMap, { type SVGProps } from "@uiw/react-heat-map";
import React from "react";

import {
  formatDate,
  formatMonthDay,
  formatNumber,
  getDateSuffix,
} from "@/lib/formatters";
import type { GithubContributionData } from "@/types/github-contributions";

const getDateProps = () => {
  const today = new Date();
  const twelveMonthsAgo = new Date(today);
  twelveMonthsAgo.setFullYear(today.getFullYear() - 1);

  return { startDate: twelveMonthsAgo, endDate: today };
};

const RECT_SIZE = 16;
const SPACE = 4;

const renderRect =
  (handleMouseEnter: (value: string) => void): SVGProps["rectRender"] =>
  // eslint-disable-next-line react/display-name
  (props, data) => {
    const date = new Date(data.date);
    const formattedDate = `${formatMonthDay(date)}${getDateSuffix(date.getDate())}`;
    const tileInfo = `${data.count ? formatNumber(data.count) : "No"} contributions on ${formattedDate}`;

    return (
      <rect
        {...props}
        style={{ transition: "filter 200ms ease", cursor: "pointer" }}
        onMouseEnter={() => handleMouseEnter(tileInfo)}
      />
    );
  };

interface Props {
  data: GithubContributionData;
}

export default function GitHubActivityCard({ data }: Props) {
  const dayCount = data.contributions?.length ?? 0;
  const weekColumns = Math.max(1, Math.ceil(dayCount / 7));
  const heatmapMinWidth = Math.max(weekColumns * (RECT_SIZE + SPACE), 640);

  const defaultLabel = `${formatNumber(data.totalContributions)} contributions in the last year`;
  const [hoveredTile, setHoveredTile] = React.useState<string>(defaultLabel);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <Typography variant="body2" color="text.secondary" noWrap>
          {hoveredTile}
        </Typography>
      </Box>

      <Box sx={{ overflowX: "auto", width: "100%" }}>
        <HeatMap
          {...getDateProps()}
          onMouseLeave={() => setHoveredTile(defaultLabel)}
          value={data.contributions ?? []}
          weekLabels={false}
          monthLabels={false}
          legendCellSize={0}
          space={SPACE}
          rectSize={RECT_SIZE}
          rectProps={{ rx: 4 }}
          rectRender={renderRect((value) => setHoveredTile(value))}
          panelColors={{
            1: "#19222F",
            4: "#0F4E43",
            8: "#1F977B",
            12: "#1EF4AE",
          }}
          style={{
            color: "#fff",
            width: "100%",
            minWidth: `${heatmapMinWidth}px`,
          }}
        />
      </Box>

      <Typography variant="caption" color="text.secondary">
        Last pushed on {formatDate(new Date(data.lastPushedAt))}
      </Typography>
    </Box>
  );
}
