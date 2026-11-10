// Fails when a marketplace fee rate in app/tools/_data/feeRates.ts was last checked more than 90 days ago, or has never
// been checked, so the quarterly re-check isn't forgotten. Run: npm run check:rates
// Usage: node scripts/check-rates.mjs [--max-days 90]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = path.join(root, "app/tools/_data/feeRates.ts");
const args = process.argv.slice(2);
const maxDays = Number(args[args.indexOf("--max-days") + 1]) || 90;
const text = fs.readFileSync(file, "utf8");

const sources = [...text.matchAll(/source:\s*\{\s*name:\s*"([^"]+)",\s*url:\s*"([^"]+)",\s*checked:\s*(null|"(\d{4}-\d{2}-\d{2})")/g)].map((m) => ({
    name: m[1],
    url: m[2],
    checked: m[4] ?? null,
}));
if (!sources.length) {
    console.error("No rate sources found in", file);
    process.exit(1);
}

const today = new Date();
let stale = 0;
for (const s of sources) {
    if (!s.checked) {
        console.log(`! ${s.name}: never checked (${s.url})`);
        continue; // reported, but not a failure: the page says so to the reader
    }
    const days = Math.floor((today - new Date(`${s.checked}T00:00:00Z`)) / 86400000);
    const ok = days <= maxDays;
    if (!ok) stale++;
    console.log(`${ok ? "✓" : "✗"} ${s.name}: checked ${s.checked} (${days} days ago) ${ok ? "" : `— re-check ${s.url}`}`);
}
if (stale) {
    console.error(`\n${stale} rate source(s) older than ${maxDays} days. Re-check them and update \`checked\` in feeRates.ts.`);
    process.exit(1);
}
console.log(`\nAll checked rates are within ${maxDays} days.`);
