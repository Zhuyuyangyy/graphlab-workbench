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
import type { StorySection } from "./types/story";
import "./styles/workbench.css";

type DemoFrame = {
  body: string;
  delay: number;
  label: string;
  roleId?: RoleId;
  section: StorySection;
  sourceIds?: SourceId[];
  title: string;
  year?: number;
};

type GuideFrame = Pick<DemoFrame, "body" | "label" | "section" | "title">;

const allSourceIds = evidenceSources.map((source) => source.id);

const demoFrames: DemoFrame[] = [
  {
    body: "先打开招聘 JD，看岗位需求如何成为后续图谱的第一条证据。",
    delay: 0,
    label: "01 / 接证据",
    roleId: "ai-pm",
    section: "sources",
    sourceIds: ["job"],
    title: "接入证据",
    year: 2022,
  },
  {
    body: "招聘、课程、论文等来源叠加，证据贡献环同步变成多源覆盖。",
    delay: 900,
    label: "02 / 多源映射",
    section: "sources",
    sourceIds: ["job", "course", "paper"],
    title: "多源融合",
    year: 2023,
  },
  {
    body: "所有证据汇入岗位-能力-来源网络，图谱成为推理主画面。",
    delay: 1800,
    label: "03 / 建图谱",
    section: "graph",
    sourceIds: allSourceIds,
    title: "生成图谱",
    year: 2024,
  },
  {
    body: "聚焦 AI 产品经理，一跳能力与证据被点亮，其他关系退到背景。",
    delay: 3100,
    label: "04 / 点岗位",
    roleId: "ai-pm",
    section: "decision",
    title: "岗位推演",
    year: 2026,
  },
  {
    body: "切到数据开发工程师，图谱、雷达、缺口和趋势一起更新。",
    delay: 4700,
    label: "05 / 全局联动",
    roleId: "data-engineer",
    section: "decision",
    title: "联动切换",
    year: 2026,
  },
  {
    body: "把时间轴拉回 2022，能力需求曲线从低位重新展开。",
    delay: 6300,
    label: "06 / 演化起点",
    roleId: "data-engineer",
    section: "evolution",
    title: "回看演化",
    year: 2022,
  },
  {
    body: "2024 年出现明显拐点，AIGC 工具链和场景产品化开始加速。",
    delay: 7200,
    label: "07 / 2024 拐点",
    section: "evolution",
    title: "识别拐点",
    year: 2024,
  },
  {
    body: "到 2026 年，TOP 能力和增长斜率给出最终培养建议。",
    delay: 8200,
    label: "08 / 可追溯结论",
    roleId: "ai-pm",
    section: "evolution",
    sourceIds: allSourceIds,
    title: "输出结论",
    year: 2026,
  },
];

export function App() {
  const model = useWorkbenchModel();
  const demoStepRef = useRef(0);
  const [demoStepLabel, setDemoStepLabel] = useState("Ready");
  const [drilldownNodeId, setDrilldownNodeId] = useState<string | null>(null);
  const [guideFrame, setGuideFrame] = useState<GuideFrame | null>(null);
  const [storySection, setStorySection] = useState<StorySection>("sources");
  const [syncPulse, setSyncPulse] = useState(0);
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
      setGuideFrame(null);
      return;
    }

    demoStepRef.current = 0;
    const timers = demoFrames.map((frame, index) => window.setTimeout(() => {
      demoStepRef.current = index;
      setDemoStepLabel(frame.label);
      setGuideFrame({
        body: frame.body,
        label: frame.label,
        section: frame.section,
        title: frame.title,
      });
      setStorySection(frame.section);
      if (frame.roleId) {
        setActiveRoleId(frame.roleId);
        setSyncPulse((current) => current + 1);
      }
      if (frame.sourceIds) setActiveSources(new Set(frame.sourceIds));
      if (frame.year) setYear(frame.year);
      setDrilldownNodeId(null);
      document.getElementById(frame.section)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, frame.delay));

    timers.push(window.setTimeout(() => {
      setDemoStepLabel("Ready");
      setGuideFrame(null);
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
    setGuideFrame(null);
    setStorySection("sources");
    setDrilldownNodeId(null);
    setSyncPulse((current) => current + 1);
  }

  function selectRole(roleId: RoleId) {
    setActiveRoleId(roleId);
    setDrilldownNodeId(null);
    setSyncPulse((current) => current + 1);
  }

  function navigateStory(section: StorySection) {
    setStorySection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <div className="page-grain" aria-hidden="true" />
      <div className="app-shell">
        <CommandBar
          activeSection={storySection}
          demoStepLabel={demoStepLabel}
          isDemoRunning={isDemoRunning}
          onNavigate={navigateStory}
          onReset={resetWorkbench}
          onToggleDemo={() => setIsDemoRunning(!isDemoRunning)}
        />
        <main className="workspace">
          <MissionBoard />
          <section className="workbench-grid">
            <DossierPanel
              activeSources={activeSources}
              isStoryActive={storySection === "sources"}
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
              isStoryActive={storySection === "graph"}
              onOpenDrilldown={setDrilldownNodeId}
              onSelectRole={selectRole}
              syncPulse={syncPulse}
              year={year}
            />
            <DecisionPanel
              activeRole={activeRole}
              isStoryActive={storySection === "decision"}
              onSelectRole={selectRole}
              roles={roles}
              syncPulse={syncPulse}
            />
          </section>
          <EvolutionReview
            isStoryActive={storySection === "evolution"}
            onYearChange={setYear}
            syncPulse={syncPulse}
            trendSummary={trendSummary}
            year={year}
          />
        </main>
      </div>
      {guideFrame ? (
        <aside className={`guide-callout is-${guideFrame.section}`} aria-live="polite">
          <span>{guideFrame.label}</span>
          <strong>{guideFrame.title}</strong>
          <p>{guideFrame.body}</p>
        </aside>
      ) : null}
      <EvidenceDrawer drilldown={drilldown} onClose={() => setDrilldownNodeId(null)} onSelectRole={selectRole} />
    </>
  );
}

export default App;
