import { expect, test } from "@playwright/test";

test("renders the engineering workbench and responds to role/source/year changes", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("/");
  await expect(page.getByRole("heading", { name: "岗位能力图谱的证据化推理工作台" })).toBeVisible();
  await expect(page.locator("#knowledge-graph .graph-node")).toHaveCount(19);
  await expect(page.locator("#knowledge-graph .graph-link")).toHaveCount(27);

  await page.getByRole("button", { name: /数据开发工程师/ }).click();
  await expect(page.getByRole("button", { name: /数据开发工程师/ })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText("该岗位核心缺口集中在实时链路")).toBeVisible();

  await page.getByRole("button", { name: "招聘 JD" }).click();
  await expect(page.getByRole("button", { name: "招聘 JD" })).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator(".metric-stack div").first().locator("strong")).toHaveText("5");

  await page.locator("#year-slider").fill("2024");
  await expect(page.getByText("TOP 1 / 2024")).toBeVisible();
  expect(errors).toEqual([]);
});

test("mobile layout has no horizontal overflow", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector("#knowledge-graph .graph-node");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
