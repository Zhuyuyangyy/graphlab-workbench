import { trendSeries, trendYears } from "../data/workbench";

interface TrendChartProps {
  year: number;
}

export function TrendChart({ year }: TrendChartProps) {
  const left = 70;
  const top = 34;
  const width = 790;
  const height = 165;
  const yearIndex = trendYears.indexOf(year as (typeof trendYears)[number]);

  return (
    <svg id="trend-chart" viewBox="0 0 920 260" role="img" aria-label="能力需求趋势折线图">
      {[0, 25, 50, 75, 100].map((tick) => {
        const y = top + height - (tick / 100) * height;
        return (
          <g key={tick}>
            <line x1={left} y1={y} x2={left + width} y2={y} stroke="rgba(32, 33, 31, 0.12)" />
            <text x={22} y={y + 4} fill="#6e675d" fontSize="12">{tick}</text>
          </g>
        );
      })}
      {trendYears.map((trendYear, index) => {
        const x = left + (width / (trendYears.length - 1)) * index;
        const active = trendYear === year;
        return (
          <text
            key={trendYear}
            x={x}
            y={232}
            textAnchor="middle"
            fill={active ? "#20211f" : "#6e675d"}
            fontSize={active ? "14" : "12"}
            fontWeight={active ? "700" : "400"}
          >
            {trendYear}
          </text>
        );
      })}
      {trendSeries.map((series) => {
        const points = series.values.map((value, index) => {
          const x = left + (width / (trendYears.length - 1)) * index;
          const y = top + height - (value / 100) * height;
          return [x, y] as const;
        });
        const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point[0]} ${point[1]}`).join(" ");
        const lastPoint = points[points.length - 1];
        return (
          <g key={series.id}>
            <path d={path} fill="none" stroke={series.color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {points.map(([x, y], index) => (
              <circle
                key={`${series.id}-${index}`}
                cx={x}
                cy={y}
                r={index === yearIndex ? 7 : 4}
                fill={series.color}
                stroke="#f7f1e4"
                strokeWidth={index === yearIndex ? 3 : 2}
              />
            ))}
            <text x={lastPoint[0] + 12} y={lastPoint[1] + 4} fill={series.color} fontSize="12" fontWeight="700">
              {series.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
