import type { StorySection } from "../types/story";

interface CommandBarProps {
  activeSection: StorySection;
  demoStepLabel: string;
  isDemoRunning: boolean;
  onNavigate: (section: StorySection) => void;
  onReset: () => void;
  onToggleDemo: () => void;
}

const storyNav: Array<{ id: StorySection; label: string; step: string }> = [
  { id: "sources", label: "接证据", step: "①" },
  { id: "graph", label: "建图谱", step: "②" },
  { id: "decision", label: "推岗位", step: "③" },
  { id: "evolution", label: "看演化", step: "④" },
];

export function CommandBar({
  activeSection,
  demoStepLabel,
  isDemoRunning,
  onNavigate,
  onReset,
  onToggleDemo,
}: CommandBarProps) {
  return (
    <header className={`command-bar ${isDemoRunning ? "is-running" : ""}`}>
      <a className="brand-block" href="#overview" aria-label="GraphLab 总览">
        <span className="brand-mark">G</span>
        <span>
          <strong>GraphLab</strong>
          <small>Evidence Intelligence</small>
        </span>
      </a>
      <nav className="command-nav" aria-label="录屏故事导航">
        {storyNav.map((item) => (
          <a
            key={item.id}
            aria-current={activeSection === item.id ? "step" : undefined}
            className={activeSection === item.id ? "is-active" : ""}
            href={`#${item.id}`}
            onClick={(event) => {
              event.preventDefault();
              onNavigate(item.id);
            }}
          >
            <span>{item.step}</span>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="command-actions">
        <span className="system-state">{isDemoRunning ? demoStepLabel : "方案可录屏"}</span>
        <button className="icon-btn" type="button" onClick={onToggleDemo} aria-pressed={isDemoRunning}>
          <span>{isDemoRunning ? "Pause" : "Run"}</span>
        </button>
        <button className="text-btn" type="button" onClick={onReset}>
          重置
        </button>
      </div>
    </header>
  );
}
