import { describe, expect, it } from "vitest";
import { getDrilldownForNode, getSkillEntityCount, getTrendSummary, toggleSource } from "../../src/lib/analysis";
import type { SourceId } from "../../src/types/domain";

describe("analysis model", () => {
  it("keeps at least one evidence source selected", () => {
    const active = new Set<SourceId>(["job"]);
    expect(toggleSource(active, "job")).toEqual(new Set<SourceId>(["job"]));
  });

  it("updates skill entity count from active evidence weights", () => {
    const active = new Set<SourceId>(["job", "course"]);
    expect(getSkillEntityCount(active)).toBe(1502);
  });

  it("sorts yearly trend summaries by demand value", () => {
    const summary = getTrendSummary(2026);
    expect(summary.map((item) => item.label)).toEqual(["AIGC 工具链", "场景产品化", "数据治理"]);
  });
  it("groups drilldown evidence by source for graph nodes", () => {
    const drilldown = getDrilldownForNode("aigc");

    expect(drilldown?.evidenceCount).toBeGreaterThanOrEqual(3);
    expect(drilldown?.sourceCount).toBeGreaterThanOrEqual(2);
    expect(drilldown?.groupedEvidence.map((group) => group.sourceId)).toContain("job");
    expect(drilldown?.relatedRoles.map((role) => role.id)).toContain("ai-pm");
  });

  it("does not open drilldown data for role nodes", () => {
    expect(getDrilldownForNode("ai-pm")).toBeNull();
  });
});
