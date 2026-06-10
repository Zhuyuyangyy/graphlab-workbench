import { evidenceSources } from "../data/workbench";
import type { RoleProfile, SourceId } from "../types/domain";

interface SourceContributionRingProps {
  activeSources: Set<SourceId>;
  role: RoleProfile;
}

const ringColors: Record<SourceId, string> = {
  job: "#c4452d",
  course: "#008f9b",
  paper: "#6954a1",
  contest: "#c69422",
  resume: "#4f7b4a",
  report: "#6e675d",
};

export function SourceContributionRing({ activeSources, role }: SourceContributionRingProps) {
  let cursor = 0;
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const activeTotal = evidenceSources.reduce(
    (sum, source) => sum + (activeSources.has(source.id) ? role.evidenceContribution[source.id] : 0),
    0,
  );

  return (
    <div className="source-ring-card">
      <div className="source-ring-copy">
        <span>证据贡献</span>
        <strong>{activeTotal}%</strong>
        <small>{role.name} 的可追溯来源权重</small>
      </div>
      <svg className="source-ring" viewBox="0 0 132 132" role="img" aria-label={`${role.name} 证据贡献环`}>
        <circle cx="66" cy="66" r={radius} className="source-ring-track" />
        {evidenceSources.map((source) => {
          const value = activeSources.has(source.id) ? role.evidenceContribution[source.id] : 0;
          const dash = (value / 100) * circumference;
          const gap = circumference - dash;
          const offset = -cursor;
          cursor += dash;
          return (
            <circle
              key={source.id}
              cx="66"
              cy="66"
              r={radius}
              className="source-ring-segment"
              stroke={ringColors[source.id]}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={offset}
            />
          );
        })}
      </svg>
      <div className="source-ring-legend">
        {evidenceSources.map((source) => (
          <span key={source.id}>
            <i style={{ backgroundColor: ringColors[source.id] }} />
            {source.name}
          </span>
        ))}
      </div>
    </div>
  );
}
