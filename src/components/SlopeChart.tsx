import { trendSeries } from "../data/workbench";

export function SlopeChart() {
  const startYear = 2022;
  const endYear = 2026;
  const width = 720;
  const height = 240;
  const leftX = 88;
  const rightX = 512;
  const top = 26;
  const plotHeight = 176;
  const labelLane = [...trendSeries]
    .sort((first, second) => second.values[second.values.length - 1] - first.values[first.values.length - 1])
    .reduce<Record<string, number>>((lanes, series, index) => {
      lanes[series.id] = 58 + index * 34;
      return lanes;
    }, {});

  return (
    <div className="slope-panel" aria-label="能力演化斜率图">
      <div className="viz-heading">
        <span>Slope Review</span>
        <strong>增长斜率</strong>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="slope-chart" role="img" aria-label={`${startYear} 到 ${endYear} 能力增长斜率`}>
        <text x={leftX} y="18" textAnchor="middle" className="slope-year">{startYear}</text>
        <text x={rightX} y="18" textAnchor="middle" className="slope-year">{endYear}</text>
        {trendSeries.map((series) => {
          const start = series.values[0];
          const end = series.values[series.values.length - 1];
          const y1 = top + plotHeight - (start / 100) * plotHeight;
          const y2 = top + plotHeight - (end / 100) * plotHeight;
          const delta = end - start;
          const labelY = labelLane[series.id];
          return (
            <g key={series.id}>
              <line x1={leftX} y1={y1} x2={rightX} y2={y2} stroke={series.color} strokeWidth="4" strokeLinecap="round" />
              <line x1={rightX + 7} y1={y2} x2={rightX + 38} y2={labelY - 4} stroke={series.color} strokeWidth="1.4" opacity="0.55" />
              <circle cx={leftX} cy={y1} r="5" fill={series.color} />
              <circle cx={rightX} cy={y2} r="6" fill={series.color} />
              <text x={rightX + 44} y={labelY} fill={series.color} fontSize="12" fontWeight="700">
                {series.label} +{delta}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
