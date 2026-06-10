import { abilityDimensions, roleAbilityHeatmap, roleProfiles } from "../data/workbench";
import type { RoleId } from "../types/domain";
import type { CSSProperties } from "react";

interface AbilityHeatmapProps {
  activeRoleId: RoleId;
}

export function AbilityHeatmap({ activeRoleId }: AbilityHeatmapProps) {
  return (
    <div className="heatmap-panel" aria-label="岗位能力热力矩阵">
      <div className="viz-heading">
        <span>Role x Ability Matrix</span>
        <strong>岗位能力热力矩阵</strong>
      </div>
      <div className="heatmap-grid">
        <span className="heatmap-corner" />
        {abilityDimensions.map((ability) => (
          <span className="heatmap-axis" key={ability.id}>{ability.label}</span>
        ))}
        {roleProfiles.map((role) => {
          const isActive = role.id === activeRoleId;
          return (
          <div className={`heatmap-row ${isActive ? "is-active" : ""}`} data-role-id={role.id} key={role.id}>
            <strong className={isActive ? "is-active" : ""}>{role.name}</strong>
            {roleAbilityHeatmap[role.id].map((value, index) => (
              <span
                key={`${role.id}-${abilityDimensions[index].id}`}
                className={`heatmap-cell ${isActive ? "is-active" : ""}`}
                style={{ "--heat": value } as CSSProperties}
                aria-label={`${role.name} ${abilityDimensions[index].label} ${value}`}
              >
                {value}
              </span>
            ))}
          </div>
          );
        })}
      </div>
    </div>
  );
}
