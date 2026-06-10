import { expect, test } from "@playwright/test";

test("renders the workbench and keeps graph, role, source, and year views linked", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("#knowledge-graph .graph-node")).toHaveCount(30);
  await expect(page.locator("#knowledge-graph .graph-link")).toHaveCount(60);
  await expect(page.locator(".decision-panel")).toHaveAttribute("data-active-role", "ai-pm");
  await expect(page.locator('[data-node-id="etl"]')).toHaveClass(/is-dim/);
  await expect(page.locator('[data-node-id="resume"] .node-label')).toHaveCSS("opacity", "0");

  const aigcCircle = page.locator('[data-node-id="aigc"] .node-circle');
  const radius2026 = Number(await aigcCircle.getAttribute("r"));
  await page.locator("#year-slider").fill("2022");
  const radius2022 = Number(await aigcCircle.getAttribute("r"));
  expect(radius2026).toBeGreaterThan(radius2022);

  await page.locator('[data-node-id="data-engineer"]').click();
  await expect(page.locator(".decision-panel")).toHaveAttribute("data-active-role", "data-engineer");
  await expect(page.locator(".decision-panel")).toHaveAttribute("data-sync-pulse", "1");
  await expect(page.locator(".graph-panel")).toHaveAttribute("data-sync-pulse", "1");
  await expect(page.locator(".evolution-panel")).toHaveAttribute("data-sync-pulse", "1");
  await expect(page.locator('.role-card[data-role-id="data-engineer"]')).toHaveClass(/is-active/);
  await expect(page.locator('.heatmap-row[data-role-id="data-engineer"] .heatmap-cell').first()).toHaveClass(/is-active/);
  await expect(page.locator('[data-node-id="ai-pm"]')).toHaveClass(/is-dim/);
  await expect(page.locator('[data-node-id="etl"]')).not.toHaveClass(/is-dim/);

  await page.locator(".source-chip").first().click();
  await expect(page.locator(".metric-stack div").first().locator("strong")).toHaveText("5");

  await page.locator("#year-slider").fill("2024");
  await expect(page.locator(".summary-item").first().locator("span")).toContainText("2024");
  expect(errors).toEqual([]);
});

test("auto demo runs a traceable one-shot analysis flow", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Run" }).click();

  await expect(page.locator(".command-bar")).toHaveClass(/is-running/);
  await expect(page.locator(".system-state")).toContainText("01 /");
  await expect(page.locator(".source-chip[aria-pressed='true']")).toHaveCount(1);
  await expect(page.locator(".system-state")).toContainText("05 /", { timeout: 6_000 });
  await expect(page.locator(".decision-panel")).toHaveAttribute("data-active-role", "data-engineer");
  await expect(page.locator("#year-slider")).toHaveValue("2026");
});

test("opens evidence drilldown drawer from graph nodes and jumps back to linked roles", async ({ page }) => {
  await page.goto("/");

  await page.locator('[data-node-id="aigc"]').click();
  await expect(page.locator(".evidence-drawer")).toBeVisible();
  await expect(page.locator(".drawer-source-group")).toHaveCount(4);
  await expect(page.locator(".evidence-item")).toHaveCount(4);
  await page.keyboard.press("Escape");
  await expect(page.locator(".evidence-drawer")).toHaveCount(0);

  await page.locator('[data-node-id="job"]').click();
  await expect(page.locator(".evidence-drawer")).toBeVisible();
  await page.locator(".drawer-close").click();
  await expect(page.locator(".evidence-drawer")).toHaveCount(0);

  await page.locator('[data-node-id="stream"]').click();
  await expect(page.locator(".evidence-drawer")).toBeVisible();
  await expect(page.locator(".drawer-source-group")).toHaveCount(3);
  await page.locator(".drawer-role-grid button").first().click();
  await expect(page.locator(".evidence-drawer")).toHaveCount(0);
  await expect(page.locator(".decision-panel")).toHaveAttribute("data-active-role", "data-engineer");
  await expect(page.locator('[data-node-id="stream"]')).not.toHaveClass(/is-dim/);

  await page.locator('[data-node-id="report"]').click();
  await expect(page.locator(".evidence-drawer")).toBeVisible();
  if ((page.viewportSize()?.width ?? 0) > 768) {
    await page.locator(".drawer-scrim").click({ position: { x: 20, y: 20 } });
  } else {
    await page.keyboard.press("Escape");
  }
  await expect(page.locator(".evidence-drawer")).toHaveCount(0);
});

test("mobile layout has no horizontal overflow", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector("#knowledge-graph .graph-node");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
