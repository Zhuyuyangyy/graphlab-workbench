import { evidenceFlows, evidenceSources, roleProfiles } from "../data/workbench";
import type { RoleId, SourceId } from "../types/domain";

interface EvidenceFlowChartProps {
  activeRoleId: RoleId;
  activeSources: Set<SourceId>;
}

const capabilities = ["场景任务", "数据能力", "知识建模", "项目验证"];

export function EvidenceFlowChart({ activeRoleId, activeSources }: EvidenceFlowChartProps) {
  const visibleFlows = evidenceFlows.filter((flow) => activeSources.has(flow.sourceId));

  return (
    <div className="flow-chart" aria-label="证据流向图">
      <div className="viz-heading">
        <span>Evidence Flow</span>
        <strong>数据源到岗位的证据流向</strong>
      </div>
      <div className="flow-columns">
        <div className="flow-column">
          {evidenceSources.map((source) => (
            <span key={source.id} className={activeSources.has(source.id) ? "is-active" : ""}>{source.name}</span>
          ))}
        </div>
        <svg viewBox="0 0 560 240" className="flow-canvas" role="img" aria-label="证据流向路径">
          {visibleFlows.map((flow, index) => {
            const sourceIndex = evidenceSources.findIndex((source) => source.id === flow.sourceId);
            const capabilityIndex = capabilities.indexOf(flow.capability);
            const roleIndex = roleProfiles.findIndex((role) => role.id === flow.roleId);
            const y1 = 24 + sourceIndex * 34;
            const y2 = 42 + capabilityIndex * 48;
            const y3 = 50 + roleIndex * 58;
            const width = Math.max(2, flow.value / 7);
            const active = flow.roleId === activeRoleId;
            return (
              <g key={`${flow.sourceId}-${flow.capability}-${flow.roleId}-${index}`} className={active ? "is-active" : "is-muted"}>
                <path
                  d={`M 10 ${y1} C 150 ${y1}, 150 ${y2}, 280 ${y2} S 430 ${y3}, 550 ${y3}`}
                  fill="none"
                  stroke={active ? "#c4452d" : "#8d877d"}
                  strokeWidth={width}
                  strokeLinecap="round"
                  opacity={active ? 0.74 : 0.18}
                />
              </g>
            );
          })}
          {capabilities.map((capability, index) => (
            <text key={capability} x="252" y={46 + index * 48} textAnchor="middle" className="flow-label">
              {capability}
            </text>
          ))}
        </svg>
        <div className="flow-column role-column">
          {roleProfiles.map((role) => (
            <span key={role.id} className={role.id === activeRoleId ? "is-active" : ""}>{role.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
