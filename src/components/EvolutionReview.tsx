import { methodSteps } from "../data/workbench";
import type { TrendSummaryItem } from "../types/domain";
import { SlopeChart } from "./SlopeChart";
import { TrendChart } from "./TrendChart";

interface EvolutionReviewProps {
  onYearChange: (year: number) => void;
  syncPulse: number;
  trendSummary: TrendSummaryItem[];
  year: number;
}

export function EvolutionReview({ onYearChange, syncPulse, trendSummary, year }: EvolutionReviewProps) {
  return (
    <section className="review-grid" id="evolution">
      <article className="evolution-panel" data-sync-pulse={syncPulse}>
        <div className="panel-heading review-heading">
          <div>
            <span>Evolution Review</span>
            <h2>能力需求动态演化</h2>
          </div>
          <label className="year-control">
            <span>年份</span>
            <input
              id="year-slider"
              type="range"
              min="2022"
              max="2026"
              value={year}
              onChange={(event) => onYearChange(Number(event.target.value))}
            />
            <strong>{year}</strong>
          </label>
        </div>
        <div className="timeline-canvas">
          <span className="sync-beacon trend-sync" key={`trend-${syncPulse}`} aria-hidden="true" />
          <TrendChart year={year} />
        </div>
        <div className="evolution-summary">
          {trendSummary.map((entry, index) => (
            <div className="summary-item" key={entry.id}>
              <span>TOP {index + 1} / {year}</span>
              <strong style={{ color: entry.color }}>{entry.label} {entry.value}</strong>
            </div>
          ))}
        </div>
        <SlopeChart />
      </article>

      <article className="method-panel">
        <div className="panel-heading">
          <span>Method Spine</span>
          <h2>方案方法骨架</h2>
        </div>
        <ol className="method-list">
          {methodSteps.map(([title, detail]) => (
            <li key={title}>
              <strong>{title}</strong>
              <span>{detail}</span>
            </li>
          ))}
        </ol>
      </article>
    </section>
  );
}
