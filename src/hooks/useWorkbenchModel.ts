import { useMemo, useState } from "react";
import { evidenceSources, roleProfiles } from "../data/workbench";
import { getActiveRole, getSkillEntityCount, getTrendSummary, toggleSource } from "../lib/analysis";
import type { RoleId, SourceId } from "../types/domain";

export function useWorkbenchModel() {
  const [activeRoleId, setActiveRoleId] = useState<RoleId>("ai-pm");
  const [activeSources, setActiveSources] = useState<Set<SourceId>>(
    () => new Set(evidenceSources.map((source) => source.id)),
  );
  const [year, setYear] = useState(2026);
  const [isDemoRunning, setIsDemoRunning] = useState(false);

  const activeRole = useMemo(() => getActiveRole(activeRoleId), [activeRoleId]);
  const skillEntityCount = useMemo(() => getSkillEntityCount(activeSources), [activeSources]);
  const trendSummary = useMemo(() => getTrendSummary(year), [year]);

  return {
    activeRole,
    activeRoleId,
    activeSources,
    isDemoRunning,
    roles: roleProfiles,
    setActiveRoleId,
    setActiveSources,
    setIsDemoRunning,
    setYear,
    skillEntityCount,
    toggleSource(sourceId: SourceId) {
      setActiveSources((current) => toggleSource(current, sourceId));
    },
    trendSummary,
    year,
  };
}
