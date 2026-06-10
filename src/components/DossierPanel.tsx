import { evidenceSources } from "../data/workbench";
import type { RoleProfile, SourceId } from "../types/domain";
import { SourceContributionRing } from "./SourceContributionRing";

interface DossierPanelProps {
  activeSources: Set<SourceId>;
  matchScore: number;
  onToggleSource: (sourceId: SourceId) => void;
  role: RoleProfile;
  skillEntityCount: number;
  year: number;
}

export function DossierPanel({
  activeSources,
  matchScore,
  onToggleSource,
  role,
  skillEntityCount,
  year,
}: DossierPanelProps) {
  return (
    <aside className="dossier-panel" id="sources">
      <div className="panel-heading">
        <span>Evidence Intake</span>
        <h2>证据接入与清洗</h2>
      </div>
      <div className="query-card">
        <span>当前研究问题</span>
        <strong>哪些岗位能力正在从“工具掌握”转向“场景推理”？</strong>
      </div>
      <div className="source-toggles" aria-label="数据源开关">
        {evidenceSources.map((source) => (
          <button
            key={source.id}
            className={`source-chip ${activeSources.has(source.id) ? "is-on" : ""}`}
            type="button"
            onClick={() => onToggleSource(source.id)}
            aria-pressed={activeSources.has(source.id)}
            title={source.description}
          >
            {source.name}
          </button>
        ))}
      </div>
      <SourceContributionRing activeSources={activeSources} role={role} />
      <div className="metric-stack" aria-label="关键指标">
        <div>
          <span>接入数据源</span>
          <strong>{activeSources.size}</strong>
        </div>
        <div>
          <span>能力实体</span>
          <strong>{skillEntityCount}</strong>
        </div>
        <div>
          <span>岗位匹配率</span>
          <strong>{matchScore}%</strong>
        </div>
        <div>
          <span>趋势窗口</span>
          <strong>{year}</strong>
        </div>
      </div>
      <div className="intake-flow" aria-label="分析链路">
        <span>原始文本</span>
        <span>实体抽取</span>
        <span>关系归并</span>
        <span>图谱更新</span>
      </div>
    </aside>
  );
}
