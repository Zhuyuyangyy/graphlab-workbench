import { useEffect } from "react";
import type { RoleId } from "../types/domain";

interface EvidenceDrawerProps {
  drilldown: ReturnType<typeof import("../lib/analysis").getDrilldownForNode>;
  onClose: () => void;
  onSelectRole: (roleId: RoleId) => void;
}

const sourceTone: Record<string, string> = {
  job: "source-job",
  course: "source-course",
  paper: "source-paper",
  contest: "source-contest",
  resume: "source-resume",
  report: "source-report",
};

export function EvidenceDrawer({ drilldown, onClose, onSelectRole }: EvidenceDrawerProps) {
  const isOpen = Boolean(drilldown);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!drilldown) return null;

  const nodeTypeLabel = drilldown.node.type === "skill" ? "能力" : "证据";
  const relatedRoleCount = drilldown.relatedRoles.length;

  return (
    <div className="drawer-layer" data-state="open">
      <button className="drawer-scrim" type="button" aria-label="关闭证据抽屉遮罩" onClick={onClose} />
      <aside className="evidence-drawer" aria-label={`${drilldown.node.label} 证据下钻`} aria-modal="true" role="dialog">
        <header className="drawer-head">
          <div>
            <span className={`node-badge ${drilldown.node.type === "skill" ? "is-skill" : "is-data"}`}>{nodeTypeLabel}</span>
            <h2>{drilldown.node.label}</h2>
          </div>
          <button className="drawer-close" type="button" aria-label="关闭证据抽屉" onClick={onClose}>
            ×
          </button>
        </header>

        <p className="drawer-definition">{drilldown.definition}</p>

        <div className="drawer-stats" aria-label="证据统计">
          <div>
            <span>证据条数</span>
            <strong>{drilldown.evidenceCount}</strong>
          </div>
          <div>
            <span>覆盖来源</span>
            <strong>{drilldown.sourceCount}</strong>
          </div>
          <div>
            <span>关联岗位</span>
            <strong>{relatedRoleCount}</strong>
          </div>
        </div>

        <section className="drawer-section">
          <div className="drawer-section-head">
            <span>Evidence Sources</span>
            <strong>证据来源</strong>
          </div>
          <div className="drawer-evidence-list">
            {drilldown.groupedEvidence.map((group) => (
              <article className="drawer-source-group" key={group.sourceId}>
                <h3>
                  <i className={sourceTone[group.sourceId]} />
                  {group.sourceName}
                </h3>
                {group.items.map((item, index) => (
                  <div className="evidence-item" key={`${group.sourceId}-${index}`}>
                    <p>{item.excerpt}</p>
                    <div className="evidence-roles">
                      {item.roleIds.map((roleId) => {
                        const role = drilldown.relatedRoles.find((entry) => entry.id === roleId);
                        if (!role) return null;
                        return (
                          <button
                            key={roleId}
                            type="button"
                            onClick={() => {
                              onClose();
                              onSelectRole(roleId);
                            }}
                          >
                            {role.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </section>

        <section className="drawer-section">
          <div className="drawer-section-head">
            <span>Linked Roles</span>
            <strong>关联岗位</strong>
          </div>
          <div className="drawer-role-grid">
            {drilldown.relatedRoles.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => {
                  onClose();
                  onSelectRole(role.id);
                }}
              >
                <span>{role.name}</span>
                <strong>{role.score}</strong>
              </button>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}
