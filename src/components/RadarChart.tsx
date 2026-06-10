interface RadarChartProps {
  benchmark?: number[];
  labels: string[];
  values: number[];
}

function polygonPoints(values: number[], centerX: number, centerY: number, radius: number) {
  return values
    .map((value, index) => {
      const angle = -Math.PI / 2 + (Math.PI * 2 * index) / values.length;
      const distance = radius * (value / 100);
      return `${centerX + Math.cos(angle) * distance},${centerY + Math.sin(angle) * distance}`;
    })
    .join(" ");
}

export function RadarChart({ benchmark, labels, values }: RadarChartProps) {
  const center = { x: 130, y: 118 };
  const radius = 82;

  return (
    <svg id="radar-chart" viewBox="0 0 260 230" role="img" aria-label="岗位能力雷达图">
      {[0.35, 0.65, 1].map((scale) => (
        <polygon
          key={scale}
          points={polygonPoints([100, 100, 100, 100, 100], center.x, center.y, radius * scale)}
          fill="none"
          stroke="rgba(32, 33, 31, 0.16)"
          strokeWidth="1"
        />
      ))}
      {labels.map((label, index) => {
        const angle = -Math.PI / 2 + (Math.PI * 2 * index) / labels.length;
        const x = center.x + Math.cos(angle) * (radius + 22);
        const y = center.y + Math.sin(angle) * (radius + 22);
        return (
          <g key={label}>
            <line
              x1={center.x}
              y1={center.y}
              x2={center.x + Math.cos(angle) * radius}
              y2={center.y + Math.sin(angle) * radius}
              stroke="rgba(32, 33, 31, 0.14)"
            />
            <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="#6e675d" fontSize="12">
              {label}
            </text>
          </g>
        );
      })}
      {benchmark ? (
        <polygon
          className="radar-benchmark"
          points={polygonPoints(benchmark, center.x, center.y, radius)}
          fill="none"
          stroke="#20211f"
          strokeDasharray="7 6"
          strokeWidth="2"
        />
      ) : null}
      <polygon
        className="radar-current"
        points={polygonPoints(values, center.x, center.y, radius)}
        fill="rgba(196, 69, 45, 0.22)"
        stroke="#c4452d"
        strokeWidth="3"
      />
    </svg>
  );
}
