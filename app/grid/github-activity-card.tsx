// i stole half this code from: https://github.com/jestsee/jestsee.com/blob/master/src/pages/_components/bento/BentoItemGithubActivity/BentoItemGithubActivityChart.tsx

"use client";

import { Box, Typography, useTheme } from "@mui/material";
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
  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);

  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 364);
  startDate.setHours(0, 0, 0, 0);

  const displayStartDate = new Date(startDate);
  displayStartDate.setDate(startDate.getDate() - startDate.getDay());

  return { startDate: displayStartDate, endDate };
};

const toLocalDateKey = (date: Date) =>
  `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

const toLocalDateFromIso = (date: string) => new Date(`${date}T00:00:00`);

const RECT_SIZE = 16;
const SPACE = 4;
const HEATMAP_LEFT_PAD = 5;

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
  const theme = useTheme();
  const { startDate, endDate } = getDateProps();
  const filledContributions = React.useMemo(() => {
    const contributions = data.contributions ?? [];
    const map = new Map(
      contributions.map((day) => [
        toLocalDateKey(toLocalDateFromIso(day.date)),
        day.count,
      ]),
    );
    const items: GithubContributionData["contributions"] = [];
    const cursor = new Date(startDate);

    while (cursor <= endDate) {
      const date = toLocalDateKey(cursor);
      items.push({ date, count: map.get(date) ?? 0 });
      cursor.setDate(cursor.getDate() + 1);
    }

    return items;
  }, [data.contributions, startDate, endDate]);

  const dayCount = filledContributions.length;
  const weekColumns = Math.max(1, Math.ceil(dayCount / 7));
  const heatmapMinWidth = Math.max(
    HEATMAP_LEFT_PAD + weekColumns * (RECT_SIZE + SPACE),
    640,
  );

  const defaultLabel = `${formatNumber(data.totalContributions)} contributions in the last year`;
  const [hoveredTile, setHoveredTile] = React.useState<string>(defaultLabel);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  const heatmapColors = theme.palette.bento.heatmap;

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [filledContributions.length]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <Typography variant="body2" color="text.secondary" noWrap>
          {hoveredTile}
        </Typography>
      </Box>

      <Box sx={{ overflowX: "auto", width: "100%" }} ref={scrollRef}>
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
          panelColors={heatmapColors}
          style={{
            color: theme.palette.text.primary,
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
