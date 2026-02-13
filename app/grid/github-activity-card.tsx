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
import type { GithubContributionData } from "@/lib/types/github-types";

const getDateProps = () => {
  const now = new Date();
  const endDate = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  const startDate = new Date(endDate);
  startDate.setUTCFullYear(endDate.getUTCFullYear() - 1);
  const weekStartOffset = startDate.getUTCDay();
  startDate.setUTCDate(startDate.getUTCDate() - weekStartOffset);

  return { startDate, endDate };
};

const RECT_SIZE = 16;
const SPACE = 4;

const renderRect =
  (handleMouseEnter: (value: string) => void): SVGProps["rectRender"] =>
  // just to shut the error up, will find better solution
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
  const { startDate, endDate } = getDateProps();
  const filledContributions = React.useMemo(() => {
    const map = new Map(
      (data.contributions ?? []).map((day) => [day.date, day.count]),
    );
    const items: GithubContributionData["contributions"] = [];
    const cursor = new Date(startDate);

    while (cursor <= endDate) {
      const date = cursor.toISOString().slice(0, 10);
      items.push({ date, count: map.get(date) ?? 0 });
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    return items;
  }, [data.contributions, startDate, endDate]);

  const dayCount = filledContributions.length ?? 0;
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
          startDate={startDate}
          endDate={endDate}
          onMouseLeave={() => setHoveredTile(defaultLabel)}
          value={filledContributions}
          weekLabels={false}
          monthLabels={false}
          legendCellSize={0}
          space={SPACE}
          rectSize={RECT_SIZE}
          rectProps={{ rx: 4 }}
          rectRender={renderRect((value) => setHoveredTile(value))}
          panelColors={{
            0: "#0B1220",
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
