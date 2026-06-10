import type { AbilityDimension, EvidenceFlow, EvidenceSource, GraphEdge, GraphNode, RoleProfile, TrendSeries } from "../types/domain";

export const abilityDimensions: AbilityDimension[] = [
  { id: "business", label: "业务" },
  { id: "data", label: "数据" },
  { id: "modeling", label: "建模" },
  { id: "engineering", label: "工程" },
  { id: "communication", label: "表达" },
];

export const evidenceSources: EvidenceSource[] = [
  { id: "job", name: "招聘 JD", weight: 36, description: "市场岗位需求与任务语言" },
  { id: "course", name: "课程大纲", weight: 22, description: "高校培养目标与能力单元" },
  { id: "paper", name: "论文摘要", weight: 18, description: "研究前沿与技术趋势" },
  { id: "contest", name: "竞赛题库", weight: 12, description: "问题场景与项目任务" },
  { id: "resume", name: "学生简历", weight: 8, description: "候选人能力证据" },
  { id: "report", name: "行业报告", weight: 15, description: "产业变化与需求窗口" },
];

export const roleProfiles: RoleProfile[] = [
  {
    id: "ai-pm",
    name: "AI 产品经理",
    score: 86,
    description: "偏业务场景、原型验证、AIGC 工作流",
    focus: ["business", "prototype", "aigc", "data"],
    radar: [92, 76, 84, 70, 88],
    demand: [96, 84, 88, 78, 92],
    evidenceContribution: { job: 30, course: 16, paper: 12, contest: 14, resume: 8, report: 20 },
    insight: "岗位由“业务理解 + 数据建模 + AIGC 工具链 + 原型设计”四类能力共同支撑。",
  },
  {
    id: "data-engineer",
    name: "数据开发工程师",
    score: 81,
    description: "偏数据管道、治理、实时计算与质量监控",
    focus: ["etl", "governance", "stream", "sql"],
    radar: [70, 94, 73, 86, 68],
    demand: [76, 96, 82, 92, 72],
    evidenceContribution: { job: 34, course: 18, paper: 10, contest: 12, resume: 7, report: 19 },
    insight: "该岗位核心缺口集中在实时链路、数据治理和可观测性，适合用项目经历补证据。",
  },
  {
    id: "knowledge-analyst",
    name: "知识图谱分析师",
    score: 89,
    description: "偏实体抽取、关系建模、图数据库分析",
    focus: ["kg", "nlp", "neo4j", "reasoning"],
    radar: [82, 88, 91, 76, 80],
    demand: [86, 92, 96, 82, 84],
    evidenceContribution: { job: 24, course: 16, paper: 24, contest: 10, resume: 6, report: 20 },
    insight: "该岗位强调“抽取-融合-推理-可视化”闭环，能很好贴合本赛题方案。",
  },
];

export const graphNodes: GraphNode[] = [
  { id: "ai-pm", label: "AI 产品经理", sub: "岗位", type: "role", x: 210, y: 180, r: 42, color: "#c4452d" },
  { id: "data-engineer", label: "数据开发工程师", sub: "岗位", type: "role", x: 520, y: 118, r: 40, color: "#c4452d" },
  { id: "knowledge-analyst", label: "知识图谱分析师", sub: "岗位", type: "role", x: 660, y: 330, r: 42, color: "#c4452d" },
  { id: "business", label: "业务理解", sub: "能力", type: "skill", x: 105, y: 345, r: 30, color: "#008f9b" },
  { id: "prototype", label: "原型设计", sub: "能力", type: "skill", x: 315, y: 335, r: 29, color: "#008f9b" },
  { id: "aigc", label: "AIGC 工具链", sub: "能力", type: "skill", x: 250, y: 445, r: 34, color: "#008f9b" },
  { id: "data", label: "数据分析", sub: "能力", type: "skill", x: 420, y: 235, r: 31, color: "#008f9b" },
  { id: "etl", label: "ETL 管道", sub: "能力", type: "skill", x: 610, y: 210, r: 29, color: "#008f9b" },
  { id: "governance", label: "数据治理", sub: "能力", type: "skill", x: 760, y: 165, r: 30, color: "#008f9b" },
  { id: "stream", label: "实时计算", sub: "能力", type: "skill", x: 810, y: 275, r: 29, color: "#008f9b" },
  { id: "sql", label: "SQL/仓库", sub: "能力", type: "skill", x: 468, y: 430, r: 28, color: "#008f9b" },
  { id: "kg", label: "图谱建模", sub: "能力", type: "skill", x: 565, y: 465, r: 32, color: "#008f9b" },
  { id: "nlp", label: "实体抽取", sub: "能力", type: "skill", x: 735, y: 455, r: 30, color: "#008f9b" },
  { id: "neo4j", label: "图数据库", sub: "能力", type: "skill", x: 830, y: 405, r: 28, color: "#008f9b" },
  { id: "reasoning", label: "关系推理", sub: "能力", type: "skill", x: 690, y: 535, r: 29, color: "#008f9b" },
  { id: "job", label: "招聘 JD", sub: "证据源", type: "data", x: 95, y: 92, r: 24, color: "#c69422" },
  { id: "course", label: "课程大纲", sub: "证据源", type: "data", x: 365, y: 78, r: 24, color: "#c69422" },
  { id: "paper", label: "论文摘要", sub: "证据源", type: "data", x: 845, y: 95, r: 24, color: "#c69422" },
  { id: "report", label: "行业报告", sub: "证据源", type: "data", x: 120, y: 500, r: 24, color: "#c69422" },
];

export const graphEdges: GraphEdge[] = [
  ["job", "ai-pm"], ["job", "data-engineer"], ["job", "knowledge-analyst"],
  ["course", "data"], ["course", "sql"], ["paper", "nlp"], ["paper", "reasoning"], ["report", "business"], ["report", "aigc"],
  ["ai-pm", "business"], ["ai-pm", "prototype"], ["ai-pm", "aigc"], ["ai-pm", "data"],
  ["data-engineer", "etl"], ["data-engineer", "governance"], ["data-engineer", "stream"], ["data-engineer", "sql"],
  ["knowledge-analyst", "kg"], ["knowledge-analyst", "nlp"], ["knowledge-analyst", "neo4j"], ["knowledge-analyst", "reasoning"], ["knowledge-analyst", "data"],
  ["kg", "neo4j"], ["nlp", "kg"], ["sql", "etl"], ["governance", "stream"], ["data", "sql"],
];

export const trendYears = [2022, 2023, 2024, 2025, 2026] as const;

export const trendSeries: TrendSeries[] = [
  { id: "aigc", label: "AIGC 工具链", color: "#c4452d", values: [18, 29, 48, 72, 91] },
  { id: "data", label: "数据治理", color: "#008f9b", values: [46, 54, 66, 75, 83] },
  { id: "graph", label: "知识图谱", color: "#6954a1", values: [34, 42, 55, 69, 78] },
  { id: "product", label: "场景产品化", color: "#4f7b4a", values: [52, 57, 63, 71, 86] },
];

export const roleAbilityHeatmap: Record<RoleProfile["id"], number[]> = {
  "ai-pm": [96, 84, 88, 78, 92],
  "data-engineer": [76, 96, 82, 92, 72],
  "knowledge-analyst": [86, 92, 96, 82, 84],
};

export const evidenceFlows: EvidenceFlow[] = [
  { sourceId: "job", capability: "场景任务", roleId: "ai-pm", value: 32 },
  { sourceId: "report", capability: "场景任务", roleId: "ai-pm", value: 20 },
  { sourceId: "course", capability: "数据能力", roleId: "data-engineer", value: 24 },
  { sourceId: "job", capability: "数据能力", roleId: "data-engineer", value: 30 },
  { sourceId: "paper", capability: "知识建模", roleId: "knowledge-analyst", value: 28 },
  { sourceId: "course", capability: "知识建模", roleId: "knowledge-analyst", value: 18 },
  { sourceId: "contest", capability: "项目验证", roleId: "ai-pm", value: 14 },
  { sourceId: "contest", capability: "项目验证", roleId: "knowledge-analyst", value: 12 },
];

export const methodSteps = [
  ["证据层", "统一招聘、课程、论文、竞赛、简历和行业报告的字段口径。"],
  ["抽取层", "抽取岗位、技能、工具、任务、场景，并用语义聚类消歧。"],
  ["图谱层", "构建岗位、能力、证据和时间四类关系，保留可追溯来源。"],
  ["分析层", "按时间切片输出岗位匹配、能力缺口、热度变化和培养建议。"],
] as const;
