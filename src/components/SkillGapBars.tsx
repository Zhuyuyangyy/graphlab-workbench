import { abilityDimensions } from "../data/workbench";
import type { RoleProfile } from "../types/domain";

interface SkillGapBarsProps {
  role: RoleProfile;
}

export function SkillGapBars({ role }: SkillGapBarsProps) {
  return (
    <div className="gap-bars" aria-label={`${role.name} 能力缺口分析`}>
      <div className="viz-heading">
        <span>Gap Analysis</span>
        <strong>能力缺口</strong>
      </div>
      {abilityDimensions.map((ability, index) => {
        const current = role.radar[index];
        const demand = role.demand[index];
        const gap = Math.max(demand - current, 0);
        return (
          <div className="gap-row" key={ability.id}>
            <div className="gap-row-head">
              <span>{ability.label}</span>
              <strong>{gap === 0 ? "已覆盖" : `缺口 ${gap}`}</strong>
            </div>
            <div className="gap-track">
              <i className="gap-demand" style={{ width: `${demand}%` }} />
              <i className="gap-current" style={{ width: `${current}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
