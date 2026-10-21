// Accessibility and readability audit of every page on the dev server (port 3010), light and dark mode.
// Usage: node scripts/audit-pages.mjs <out.json>
// Routes come from the app tree and the content folders. Needs axe-core (this repo) and Playwright from the
// sibling extension repo (../chrome-extension-source/node_modules). Findings and the phase plan: docs/SITE_REVIEW_2026-10-21.md.
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire("/Users/vikram/GitHub/Web_scraper/chrome-extension-source/node_modules/");
const requireSite = createRequire("/Users/vikram/GitHub/Web_scraper/webscraper-homepage/node_modules/");
const { chromium } = require("playwright");
const axePath = requireSite.resolve("axe-core/axe.min.js");
const base = "http://localhost:3010";
const out = process.argv[2] ?? "/tmp/audit.json";
import { execSync } from "node:child_process";
const routes = JSON.parse(execSync("node scripts/audit-routes.mjs", { cwd: new URL("..", import.meta.url).pathname }).toString());
const browser = await chromium.launch();
const results = [];
for (const route of routes) {
  const row = { route, schemes: {} };
  for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    try {
      await page.goto(base + route, { waitUntil: "networkidle", timeout: 60000 });
      await page.waitForTimeout(1500);
      // force Reveal animations to their final state so axe sees real colours
      await page.addStyleTag({ content: "*{opacity:1!important;transform:none!important;transition:none!important;animation:none!important}" });
      await page.addScriptTag({ path: axePath });
      const axe = await page.evaluate(async () => await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] } }));
      const custom = await page.evaluate(() => {
        const vis = (e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none"; };
        const textEls = [...document.querySelectorAll("main p, main li, main td, main th, main dd, main dt, main span, main a, main label, main figcaption, main summary")].filter((e) => vis(e) && e.innerText && e.innerText.trim().length > 1 && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()));
        const sizes = textEls.map((e) => parseFloat(getComputedStyle(e).fontSize));
        const hs = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].filter(vis).map((h) => parseInt(h.tagName[1]));
        let skips = 0; for (let i = 1; i < hs.length; i++) if (hs[i] > hs[i - 1] + 1) skips++;
        const generic = [...document.querySelectorAll("a")].filter((a) => /^(read more|learn more|click here|here|more|link)$/i.test((a.innerText || "").trim())).length;
        const imgsNoAlt = [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length;
        const unnamed = [...document.querySelectorAll("button, a[href]")].filter((e) => vis(e) && !(e.innerText || "").trim() && !e.getAttribute("aria-label") && !e.getAttribute("aria-labelledby") && !e.querySelector("img[alt]:not([alt=''])")).length;
        const skipLink = !!document.querySelector('a[href="#main"], a[href="#content"], a.skip-link, [data-skip-link]');
        return { h1: document.querySelectorAll("h1").length, headingSkips: skips, textCount: sizes.length, under14: sizes.filter((s) => s < 14).length, under16: sizes.filter((s) => s < 16).length, genericLinks: generic, imgsNoAlt, unnamedControls: unnamed, skipLink, lang: document.documentElement.lang || "", landmarks: { main: document.querySelectorAll("main").length, nav: document.querySelectorAll("nav").length }, title: document.title, scrollW: document.documentElement.scrollWidth };
      });
      const viol = axe.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, sample: v.nodes[0]?.target?.[0]?.slice(0, 80), help: v.help }));
      row.schemes[scheme] = { violations: viol, ...custom };
    } catch (e) { row.schemes[scheme] = { error: String(e).slice(0, 200) }; }
    await ctx.close();
  }
  results.push(row); console.log(route, Object.entries(row.schemes).map(([k, v]) => `${k}:${v.violations ? v.violations.length + "v" : "ERR"}`).join(" "));
  fs.writeFileSync(out, JSON.stringify(results, null, 1));
}
await browser.close();
console.log("done", results.length);
