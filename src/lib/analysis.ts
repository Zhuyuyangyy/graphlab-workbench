import { evidenceSources, roleProfiles, trendSeries, trendYears } from "../data/workbench";
import type { RoleId, SourceId, TrendSummaryItem } from "../types/domain";

export function getActiveRole(roleId: RoleId) {
  const role = roleProfiles.find((profile) => profile.id === roleId);
  if (!role) {
    throw new Error(`Unknown role id: ${roleId}`);
  }
  return role;
}

export function getFocusedNodeIds(roleId: RoleId, activeSources: Set<SourceId>) {
  const role = getActiveRole(roleId);
  return new Set<string>([role.id, ...role.focus, ...activeSources]);
}

export function getSkillEntityCount(activeSources: Set<SourceId>) {
  const sourceWeight = evidenceSources
    .filter((source) => activeSources.has(source.id))
    .reduce((sum, source) => sum + source.weight, 0);
  return 980 + sourceWeight * 9;
}

export function getTrendSummary(year: number): TrendSummaryItem[] {
  const yearIndex = trendYears.indexOf(year as (typeof trendYears)[number]);
  if (yearIndex < 0) {
    throw new Error(`Unsupported trend year: ${year}`);
  }

  return trendSeries
    .map((series) => ({ ...series, value: series.values[yearIndex] }))
    .sort((first, second) => second.value - first.value)
    .slice(0, 3);
}

export function toggleSource(activeSources: Set<SourceId>, sourceId: SourceId) {
  const next = new Set(activeSources);
  if (next.has(sourceId) && next.size > 1) {
    next.delete(sourceId);
  } else {
    next.add(sourceId);
  }
  return next;
}
