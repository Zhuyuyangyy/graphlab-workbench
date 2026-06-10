interface CommandBarProps {
  demoStepLabel: string;
  isDemoRunning: boolean;
  onReset: () => void;
  onToggleDemo: () => void;
}

export function CommandBar({ demoStepLabel, isDemoRunning, onReset, onToggleDemo }: CommandBarProps) {
  return (
    <header className={`command-bar ${isDemoRunning ? "is-running" : ""}`}>
      <a className="brand-block" href="#overview" aria-label="GraphLab 总览">
        <span className="brand-mark">G</span>
        <span>
          <strong>GraphLab</strong>
          <small>Evidence Intelligence</small>
        </span>
      </a>
      <nav className="command-nav" aria-label="页面导航">
        <a href="#sources">证据接入</a>
        <a href="#graph">图谱推理</a>
        <a href="#evolution">演化审阅</a>
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
