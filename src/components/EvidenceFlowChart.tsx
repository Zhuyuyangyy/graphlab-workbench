import { useState } from "react";
import { evidenceFlows, evidenceSources, roleProfiles } from "../data/workbench";
import type { RoleId, SourceId } from "../types/domain";

interface EvidenceFlowChartProps {
  activeRoleId: RoleId;
  activeSources: Set<SourceId>;
}

const capabilities = ["场景任务", "数据能力", "知识建模", "项目验证"];

const sourceColors: Record<SourceId, string> = {
  job: "#c4452d",
  course: "#008f9b",
  paper: "#6954a1",
  contest: "#c69422",
  resume: "#4f7b4a",
  report: "#6e675d",
};

export function EvidenceFlowChart({ activeRoleId, activeSources }: EvidenceFlowChartProps) {
  const [hoveredFlowKey, setHoveredFlowKey] = useState<string | null>(null);
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
            const flowKey = `${flow.sourceId}-${flow.capability}-${flow.roleId}-${index}`;
            const sourceIndex = evidenceSources.findIndex((source) => source.id === flow.sourceId);
            const capabilityIndex = capabilities.indexOf(flow.capability);
            const roleIndex = roleProfiles.findIndex((role) => role.id === flow.roleId);
            const y1 = 24 + sourceIndex * 34;
            const y2 = 42 + capabilityIndex * 48;
            const y3 = 50 + roleIndex * 58;
            const width = Math.max(3, flow.value / 6);
            const active = flow.roleId === activeRoleId;
            const isHovered = hoveredFlowKey === flowKey;
            const isMuted = hoveredFlowKey ? !isHovered : !active;
            const path = `M 10 ${y1} C 150 ${y1}, 150 ${y2}, 280 ${y2} S 430 ${y3}, 550 ${y3}`;
            const stroke = sourceColors[flow.sourceId];
            return (
              <g
                key={flowKey}
                className={`flow-path ${active ? "is-active" : ""} ${isHovered ? "is-hovered" : ""}`}
                data-flow-active={active ? "true" : "false"}
                data-source-id={flow.sourceId}
                onPointerEnter={() => setHoveredFlowKey(flowKey)}
                onPointerLeave={() => setHoveredFlowKey(null)}
              >
                <path
                  className="flow-hitbox"
                  d={path}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={width + 12}
                  strokeLinecap="round"
                />
                <path
                  className="flow-stroke"
                  d={path}
                  fill="none"
                  stroke={isMuted ? "#8d877d" : stroke}
                  strokeWidth={isHovered ? width + 3 : active ? width + 1 : width}
                  strokeLinecap="round"
                  opacity={isHovered ? 0.96 : isMuted ? 0.13 : 0.82}
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
