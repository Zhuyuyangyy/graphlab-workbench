import { graphEdges, graphNodes } from "../data/workbench";
import { getFocusedNodeIds } from "../lib/analysis";
import type { RoleId, RoleProfile, SourceId } from "../types/domain";
import { AbilityHeatmap } from "./AbilityHeatmap";
import { EvidenceFlowChart } from "./EvidenceFlowChart";

interface KnowledgeGraphProps {
  activeRole: RoleProfile;
  activeSources: Set<SourceId>;
  onSelectRole: (roleId: RoleId) => void;
}

const roleNodeIds: RoleId[] = ["ai-pm", "data-engineer", "knowledge-analyst"];

export function KnowledgeGraph({ activeRole, activeSources, onSelectRole }: KnowledgeGraphProps) {
  const focusedIds = getFocusedNodeIds(activeRole.id, activeSources);

  return (
    <article className="graph-panel" id="graph">
      <div className="panel-heading graph-heading">
        <div>
          <span>Reasoning Canvas</span>
          <h2>岗位-能力-证据关系网络</h2>
        </div>
        <div className="legend">
          <span><i className="dot role" />岗位</span>
          <span><i className="dot skill" />能力</span>
          <span><i className="dot data" />证据</span>
        </div>
      </div>
      <div className="graph-stage">
        <svg id="knowledge-graph" viewBox="0 0 920 560" role="img" aria-label="岗位能力知识图谱">
          <g>
            {graphEdges.map(([fromId, toId]) => {
              const from = graphNodes.find((node) => node.id === fromId);
              const to = graphNodes.find((node) => node.id === toId);
              if (!from || !to) return null;
              const isRelevant = focusedIds.has(fromId) && focusedIds.has(toId);
              const isDim = !focusedIds.has(fromId) && !focusedIds.has(toId);
              return (
                <line
                  key={`${fromId}-${toId}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  className={`graph-link ${isRelevant ? "is-focus" : ""} ${isDim ? "is-dim" : ""}`}
                />
              );
            })}
          </g>
          <g>
            {graphNodes.map((node) => {
              const isRole = roleNodeIds.includes(node.id as RoleId);
              const isDim = !focusedIds.has(node.id) && node.type !== "data";
              return (
                <g
                  key={node.id}
                  className={`graph-node ${isDim ? "is-dim" : ""}`}
                  transform={`translate(${node.x} ${node.y})`}
                  onClick={() => {
                    if (isRole) onSelectRole(node.id as RoleId);
                  }}
                >
                  {node.id === activeRole.id ? <circle r={node.r + 12} className="pulse-ring" /> : null}
                  <circle r={node.r} fill={node.color} className="node-circle" />
                  <text y={-4} textAnchor="middle" className="node-label">{node.label}</text>
                  <text y={16} textAnchor="middle" className="node-sub">{node.sub}</text>
                </g>
              );
            })}
          </g>
        </svg>
        <div className="graph-insight">
          <span>当前推理焦点</span>
          <strong>{activeRole.name}</strong>
          <p>{activeRole.insight}</p>
        </div>
      </div>
      <div className="evidence-trail" aria-label="证据链示例">
        <div>
          <span>JD 语句</span>
          <strong>需要把 AIGC 能力转化为业务流程改造。</strong>
        </div>
        <div>
          <span>课程映射</span>
          <strong>产品原型、数据分析、知识工程进入同一能力簇。</strong>
        </div>
        <div>
          <span>演化判断</span>
          <strong>2024 后“场景产品化”增速超过传统工具技能。</strong>
        </div>
      </div>
      <AbilityHeatmap activeRoleId={activeRole.id} />
      <EvidenceFlowChart activeRoleId={activeRole.id} activeSources={activeSources} />
    </article>
  );
}
