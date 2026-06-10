import { useEffect, useRef } from "react";
import { CommandBar } from "./components/CommandBar";
import { DecisionPanel } from "./components/DecisionPanel";
import { DossierPanel } from "./components/DossierPanel";
import { EvolutionReview } from "./components/EvolutionReview";
import { KnowledgeGraph } from "./components/KnowledgeGraph";
import { MissionBoard } from "./components/MissionBoard";
import { evidenceSources } from "./data/workbench";
import { useWorkbenchModel } from "./hooks/useWorkbenchModel";
import "./styles/workbench.css";

export function App() {
  const model = useWorkbenchModel();
  const demoStepRef = useRef(0);
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

  useEffect(() => {
    if (!isDemoRunning) return;

    const timer = window.setInterval(() => {
      const role = roles[demoStepRef.current % roles.length];
      setActiveRoleId(role.id);
      setYear(2022 + (demoStepRef.current % 5));
      setActiveSources(
        demoStepRef.current % 2 === 0
          ? new Set(["job", "course", "paper", "report"])
          : new Set(evidenceSources.map((source) => source.id)),
      );
      demoStepRef.current += 1;
    }, 1600);

    return () => window.clearInterval(timer);
  }, [isDemoRunning, roles, setActiveRoleId, setActiveSources, setYear]);

  function resetWorkbench() {
    demoStepRef.current = 0;
    setActiveRoleId("ai-pm");
    setActiveSources(new Set(evidenceSources.map((source) => source.id)));
    setYear(2026);
    setIsDemoRunning(false);
  }

  return (
    <>
      <div className="page-grain" aria-hidden="true" />
      <div className="app-shell">
        <CommandBar
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
              onSelectRole={setActiveRoleId}
            />
            <DecisionPanel activeRole={activeRole} onSelectRole={setActiveRoleId} roles={roles} />
          </section>
          <EvolutionReview onYearChange={setYear} trendSummary={trendSummary} year={year} />
        </main>
      </div>
    </>
  );
}

export default App;
