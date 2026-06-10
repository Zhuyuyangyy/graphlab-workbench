import { useEffect, useMemo, useRef, useState } from "react";
import { CommandBar } from "./components/CommandBar";
import { DecisionPanel } from "./components/DecisionPanel";
import { DossierPanel } from "./components/DossierPanel";
import { EvidenceDrawer } from "./components/EvidenceDrawer";
import { EvolutionReview } from "./components/EvolutionReview";
import { KnowledgeGraph } from "./components/KnowledgeGraph";
import { MissionBoard } from "./components/MissionBoard";
import { evidenceSources } from "./data/workbench";
import { useWorkbenchModel } from "./hooks/useWorkbenchModel";
import { getDrilldownForNode } from "./lib/analysis";
import type { RoleId, SourceId } from "./types/domain";
import "./styles/workbench.css";

type DemoFrame = {
  delay: number;
  label: string;
  roleId?: RoleId;
  sourceIds?: SourceId[];
  year?: number;
  scrollTarget?: string;
};

const allSourceIds = evidenceSources.map((source) => source.id);

const demoFrames: DemoFrame[] = [
  { delay: 0, label: "01 / 证据扫入", roleId: "ai-pm", sourceIds: ["job"], year: 2022, scrollTarget: "sources" },
  { delay: 900, label: "02 / 多源融合", sourceIds: ["job", "course", "paper"], year: 2023 },
  { delay: 1800, label: "03 / 图谱生成", sourceIds: allSourceIds, year: 2024, scrollTarget: "graph" },
  { delay: 3100, label: "04 / 聚焦 AI 产品", roleId: "ai-pm", year: 2026 },
  { delay: 4700, label: "05 / 联动切岗", roleId: "data-engineer", year: 2026 },
  { delay: 6300, label: "06 / 演化起点", roleId: "data-engineer", year: 2022, scrollTarget: "evolution" },
  { delay: 7200, label: "07 / 2024 拐点", year: 2024 },
  { delay: 8200, label: "08 / 2026 峰值", year: 2026 },
  { delay: 9600, label: "09 / 分析师对照", roleId: "knowledge-analyst", year: 2026, scrollTarget: "graph" },
  { delay: 11200, label: "10 / 可追溯结论", roleId: "ai-pm", sourceIds: allSourceIds, year: 2026 },
];

export function App() {
  const model = useWorkbenchModel();
  const demoStepRef = useRef(0);
  const [demoStepLabel, setDemoStepLabel] = useState("Ready");
  const [drilldownNodeId, setDrilldownNodeId] = useState<string | null>(null);
  const {
    activeRole,
    activeSources,
    isDemoRunning,
    roles,
    setActiveRoleId,
    setActiveSources,
    setIsDemoRunning,
    setYear,
    skillEntityCount,
    toggleSource,
    trendSummary,
    year,
  } = model;
  const drilldown = useMemo(
    () => (drilldownNodeId ? getDrilldownForNode(drilldownNodeId) : null),
    [drilldownNodeId],
  );

  useEffect(() => {
    if (!isDemoRunning) {
      setDemoStepLabel("Ready");
      return;
    }

    demoStepRef.current = 0;
    const timers = demoFrames.map((frame, index) => window.setTimeout(() => {
      demoStepRef.current = index;
      setDemoStepLabel(frame.label);
      if (frame.roleId) setActiveRoleId(frame.roleId);
      if (frame.sourceIds) setActiveSources(new Set(frame.sourceIds));
      if (frame.year) setYear(frame.year);
      setDrilldownNodeId(null);
      if (frame.scrollTarget) {
        document.getElementById(frame.scrollTarget)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, frame.delay));

    timers.push(window.setTimeout(() => {
      setDemoStepLabel("Ready");
      setIsDemoRunning(false);
    }, demoFrames[demoFrames.length - 1].delay + 1800));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [isDemoRunning, setActiveRoleId, setActiveSources, setIsDemoRunning, setYear]);

  function resetWorkbench() {
    demoStepRef.current = 0;
    setActiveRoleId("ai-pm");
    setActiveSources(new Set(allSourceIds));
    setYear(2026);
    setIsDemoRunning(false);
    setDemoStepLabel("Ready");
    setDrilldownNodeId(null);
  }

  function selectRole(roleId: RoleId) {
    setActiveRoleId(roleId);
    setDrilldownNodeId(null);
  }

  return (
    <>
      <div className="page-grain" aria-hidden="true" />
      <div className="app-shell">
        <CommandBar
          demoStepLabel={demoStepLabel}
          isDemoRunning={isDemoRunning}
          onReset={resetWorkbench}
          onToggleDemo={() => setIsDemoRunning(!isDemoRunning)}
        />
        <main className="workspace">
          <MissionBoard />
          <section className="workbench-grid">
            <DossierPanel
              activeSources={activeSources}
              matchScore={activeRole.score}
              onToggleSource={toggleSource}
              role={activeRole}
              skillEntityCount={skillEntityCount}
              year={year}
            />
            <KnowledgeGraph
              activeRole={activeRole}
              activeSources={activeSources}
              drilldownNodeId={drilldownNodeId}
              onOpenDrilldown={setDrilldownNodeId}
              onSelectRole={selectRole}
              year={year}
            />
            <DecisionPanel activeRole={activeRole} onSelectRole={selectRole} roles={roles} />
          </section>
          <EvolutionReview onYearChange={setYear} trendSummary={trendSummary} year={year} />
        </main>
      </div>
      <EvidenceDrawer drilldown={drilldown} onClose={() => setDrilldownNodeId(null)} onSelectRole={selectRole} />
    </>
  );
}

export default App;
