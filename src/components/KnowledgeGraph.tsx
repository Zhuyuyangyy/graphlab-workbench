import { useMemo, useRef, useState, type PointerEvent } from "react";
import { forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation } from "d3-force";
import { graphEdges, graphNodes } from "../data/workbench";
import type { GraphNode, RoleId, RoleProfile, SourceId } from "../types/domain";
import { AbilityHeatmap } from "./AbilityHeatmap";
import { EvidenceFlowChart } from "./EvidenceFlowChart";

interface KnowledgeGraphProps {
  activeRole: RoleProfile;
  activeSources: Set<SourceId>;
  drilldownNodeId: string | null;
  onOpenDrilldown: (nodeId: string) => void;
  onSelectRole: (roleId: RoleId) => void;
  year: number;
}

const roleNodeIds: RoleId[] = ["ai-pm", "data-engineer", "knowledge-analyst"];

type LayoutNode = GraphNode & { x: number; y: number };

const yearIndexByValue: Record<number, number> = {
  2022: 0,
  2023: 1,
  2024: 2,
  2025: 3,
  2026: 4,
};

function buildForceLayout() {
  const nodes: LayoutNode[] = graphNodes.map((node) => ({ ...node }));
  const links = graphEdges.map(([source, target]) => ({ source, target }));

  forceSimulation(nodes)
    .force("link", forceLink<LayoutNode, { source: string; target: string }>(links).id((node) => node.id).distance(92).strength(0.48))
    .force("charge", forceManyBody().strength(-380))
    .force("collide", forceCollide<LayoutNode>().radius((node) => node.r + 18).strength(0.92))
    .force("center", forceCenter(460, 280))
    .stop()
    .tick(220);

  return nodes.map((node) => ({
    ...node,
    x: Math.max(54, Math.min(866, node.x)),
    y: Math.max(54, Math.min(506, node.y)),
  }));
}

function getNodeRadius(node: GraphNode, year: number) {
  if (!node.yearlyDemand) return node.r;
  const demand = node.yearlyDemand[yearIndexByValue[year] ?? 4];
  return Math.round(18 + demand * 0.24);
}

function getSvgPoint(svg: SVGSVGElement, clientX: number, clientY: number) {
  const point = svg.createSVGPoint();
  point.x = clientX;
  point.y = clientY;
  const matrix = svg.getScreenCTM();
  if (!matrix) return point;
  return point.matrixTransform(matrix.inverse());
}

function getOneHopNodeIds(nodeId: string, activeSources: Set<SourceId>) {
  const related = new Set<string>([nodeId, ...activeSources]);
  graphEdges.forEach(([source, target]) => {
    if (source === nodeId) related.add(target);
    if (target === nodeId) related.add(source);
  });
  return related;
}

export function KnowledgeGraph({
  activeRole,
  activeSources,
  drilldownNodeId,
  onOpenDrilldown,
  onSelectRole,
  year,
}: KnowledgeGraphProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [positionOverrides, setPositionOverrides] = useState<Record<string, { x: number; y: number }>>({});
  const focusedIds = useMemo(
    () => getOneHopNodeIds(drilldownNodeId ?? activeRole.id, activeSources),
    [activeRole.id, activeSources, drilldownNodeId],
  );
  const layoutNodes = useMemo(buildForceLayout, []);
  const positionById = useMemo(() => {
    return new Map(layoutNodes.map((node) => {
      const override = positionOverrides[node.id];
      return [node.id, { ...node, x: override?.x ?? node.x, y: override?.y ?? node.y }] as const;
    }));
  }, [layoutNodes, positionOverrides]);
  const neighborIds = useMemo(() => {
    if (!hoveredId) return new Set<string>();
    const related = new Set<string>([hoveredId]);
    graphEdges.forEach(([source, target]) => {
      if (source === hoveredId) related.add(target);
      if (target === hoveredId) related.add(source);
    });
    return related;
  }, [hoveredId]);

  function updateDragPosition(event: PointerEvent<SVGSVGElement>) {
    if (!draggingId || !svgRef.current) return;
    const point = getSvgPoint(svgRef.current, event.clientX, event.clientY);
    setPositionOverrides((current) => ({
      ...current,
      [draggingId]: {
        x: Math.max(44, Math.min(876, point.x)),
        y: Math.max(44, Math.min(516, point.y)),
      },
    }));
  }

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
        <svg
          id="knowledge-graph"
          ref={svgRef}
          viewBox="0 0 920 560"
          role="img"
          aria-label="可拖拽力导向岗位能力知识图谱"
          onPointerMove={updateDragPosition}
          onPointerUp={() => setDraggingId(null)}
          onPointerLeave={() => {
            setDraggingId(null);
            setHoveredId(null);
          }}
        >
          <g>
            {graphEdges.map(([fromId, toId]) => {
              const from = positionById.get(fromId);
              const to = positionById.get(toId);
              if (!from || !to) return null;
              const focusAnchorId = drilldownNodeId ?? activeRole.id;
              const isRoleLink = fromId === focusAnchorId || toId === focusAnchorId;
              const isHoverLink = hoveredId ? fromId === hoveredId || toId === hoveredId : false;
              const isRelevant = hoveredId ? isHoverLink : isRoleLink;
              const isDim = hoveredId
                ? !neighborIds.has(fromId) || !neighborIds.has(toId)
                : !focusedIds.has(fromId) || !focusedIds.has(toId);
              return (
                <line
                  key={`${fromId}-${toId}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  className={`graph-link ${isRelevant ? "is-focus" : ""} ${isDim ? "is-dim" : ""}`}
                  data-focus-link={isRelevant ? "true" : "false"}
                />
              );
            })}
          </g>
          <g>
            {layoutNodes.map((node) => {
              const position = positionById.get(node.id) ?? node;
              const isRole = roleNodeIds.includes(node.id as RoleId);
              const isDim = hoveredId
                ? !neighborIds.has(node.id)
                : !focusedIds.has(node.id);
              const isHoverFocus = hoveredId ? neighborIds.has(node.id) : false;
              const isDrilldownFocus = drilldownNodeId === node.id;
              const shouldShowLabel = isRole || isHoverFocus || isDrilldownFocus || (node.type === "skill" && focusedIds.has(node.id));
              const radius = getNodeRadius(node, year);
              return (
                <g
                  key={node.id}
                  data-node-id={node.id}
                  data-node-type={node.type}
                  className={`graph-node ${isDim ? "is-dim" : ""} ${shouldShowLabel ? "has-label" : ""} ${node.id === activeRole.id ? "is-active-role" : ""} ${isDrilldownFocus ? "is-drilldown-focus" : ""}`}
                  transform={`translate(${position.x} ${position.y})`}
                  onClick={() => {
                    if (isRole) {
                      onSelectRole(node.id as RoleId);
                    } else {
                      onOpenDrilldown(node.id);
                    }
                  }}
                  onPointerDown={(event) => {
                    event.currentTarget.setPointerCapture(event.pointerId);
                    setDraggingId(node.id);
                  }}
                  onPointerEnter={() => setHoveredId(node.id)}
                  onPointerLeave={() => setHoveredId(null)}
                >
                  {node.id === activeRole.id ? <circle r={radius + 12} className="pulse-ring" /> : null}
                  <circle r={radius} fill={node.color} className="node-circle" />
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
