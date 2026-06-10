import { RadarChart } from "./RadarChart";
import { SkillGapBars } from "./SkillGapBars";
import type { RoleId, RoleProfile } from "../types/domain";

interface DecisionPanelProps {
  activeRole: RoleProfile;
  onSelectRole: (roleId: RoleId) => void;
  roles: RoleProfile[];
}

const radarLabels = ["业务", "数据", "建模", "工程", "表达"];

export function DecisionPanel({ activeRole, onSelectRole, roles }: DecisionPanelProps) {
  return (
    <aside className="decision-panel">
      <div className="panel-heading">
        <span>Decision Docket</span>
        <h2>目标岗位推演</h2>
      </div>
      <div className="role-list">
        {roles.map((role) => (
          <button
            key={role.id}
            className={`role-card ${role.id === activeRole.id ? "is-active" : ""}`}
            type="button"
            onClick={() => onSelectRole(role.id)}
            aria-pressed={role.id === activeRole.id}
          >
            <div>
              <strong>{role.name}</strong>
              <small>{role.description}</small>
            </div>
            <span>{role.score}</span>
          </button>
        ))}
      </div>
      <div className="ability-card">
        <div className="ability-head">
          <span>能力结构</span>
          <strong>{activeRole.name}</strong>
        </div>
        <RadarChart labels={radarLabels} values={activeRole.radar} />
      </div>
      <SkillGapBars role={activeRole} />
      <div className="decision-note">
        <span>录屏讲法</span>
        <p>切换岗位时，右侧结论、中间图谱和下方趋势会联动，证明方案不是静态页面。</p>
      </div>
    </aside>
  );
}
