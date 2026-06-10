export type SourceId = "job" | "course" | "paper" | "contest" | "resume" | "report";

export type RoleId = "ai-pm" | "data-engineer" | "knowledge-analyst";

export type NodeType = "role" | "skill" | "data";

export interface EvidenceSource {
  id: SourceId;
  name: string;
  weight: number;
  description: string;
}

export interface RoleProfile {
  id: RoleId;
  name: string;
  score: number;
  description: string;
  focus: string[];
  radar: number[];
  demand: number[];
  evidenceContribution: Record<SourceId, number>;
  insight: string;
}

export interface GraphNode {
  id: string;
  label: string;
  sub: string;
  type: NodeType;
  x: number;
  y: number;
  r: number;
  color: string;
  yearlyDemand?: number[];
}

export type GraphEdge = readonly [string, string];

export interface TrendSeries {
  id: string;
  label: string;
  color: string;
  values: number[];
}

export interface TrendSummaryItem extends TrendSeries {
  value: number;
}

export interface AbilityDimension {
  id: string;
  label: string;
}

export interface EvidenceFlow {
  sourceId: SourceId;
  capability: string;
  roleId: RoleId;
  value: number;
}
