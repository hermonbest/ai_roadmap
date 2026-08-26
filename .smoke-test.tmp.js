// Temporary smoke test - deleted after final review
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push("CONSOLE: " + m.text()); });

  await page.goto("http://127.0.0.1:8125/index.html", { waitUntil: "networkidle" });

  // Dismiss welcome overlay if present
  const startBtn = page.locator("#welcome-start-btn");
  if (await startBtn.isVisible().catch(() => false)) await startBtn.click();

  const results = {};
  results.title = await page.title();
  results.labBenches = await page.locator(".lab-bench").count();
  results.breadcrumbs = await page.locator(".breadcrumb-trail").count();
  results.doneBtns = await page.locator(".lesson-done-btn").count();
  results.tocLinks = await page.locator(".toc-link").count();

  // Answer first checkpoint correctly (stage-1 lesson-1 predict: answer index 1 = "5")
  const firstOption = page.locator(".lab-bench .mc-option").first();
  await firstOption.click();
  // click option B of first bench
  await page.locator(".lab-bench").first().locator('.mc-option[data-i="1"]').click();
  await page.waitForTimeout(300);
  results.firstBenchSolved = await page.locator(".lab-bench").first().evaluate((el) => el.classList.contains("solved"));
  results.xpChipVisible = await page.locator("#xp-chip").isVisible();
  results.xpChipText = await page.locator("#xp-chip-value").textContent();

  // Mark a lesson as learned
  await page.locator(".lesson-done-btn").first().click();
  results.doneToggleText = (await page.locator(".lesson-done-btn").first().textContent()).trim();

  // Sidebar count reflects it
  results.sidebarFirstStage = (await page.locator(".stage-nav-progress").first().textContent()).trim();

  // Navigate to stage 2 and check challenge inputs render
  await page.locator('[data-stage-id="stage-2"]').click();
  await page.waitForTimeout(400);
  results.stage2Blanks = await page.locator(".blank-input").count();
  results.stage2Sorts = await page.locator(".sort-tile").count();

  // TOC scrollspy exists on stage 2
  results.stage2TocActive = await page.locator(".toc-link.active").count() >= 0;

  console.log(JSON.stringify(results, null, 2));
  console.log("ERRORS:", errors.length ? errors.slice(0, 5) : "none");
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
