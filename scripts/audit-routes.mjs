// Prints every auditable route as JSON: static pages, feature pages, and one route per content file and calculator.
import fs from "node:fs";
import path from "node:path";
const root = new URL("..", import.meta.url).pathname;
const slugs = (dir, ext) => fs.existsSync(path.join(root, dir)) ? fs.readdirSync(path.join(root, dir)).filter((f) => f.endsWith(ext) && !f.startsWith("index")).map((f) => f.slice(0, -ext.length)) : [];
const r = ["/", "/support", "/privacy-policy", "/terms-of-service", "/changelog", "/compare", "/web-scraping-legal", "/use-cases", "/scrapers", "/guides", "/blog", "/blog/author/vikram", "/tools"];
for (const f of ["ai-chat", "mcp", "maps-leads", "list-scraper", "shopify-scraper", "product-scraper", "email-extractor", "page-text", "image-downloader", "bulk-scraper", "export-to-google-sheets", "cloud"]) r.push("/" + f);
for (const s of slugs("content/use-cases", ".ts")) r.push("/use-cases/" + s);
for (const s of slugs("content/scrapers", ".ts")) r.push("/scrapers/" + s);
for (const s of slugs("content/compare", ".ts")) r.push("/compare/" + s);
for (const s of slugs("content/guides", ".md")) r.push("/guides/" + s);
for (const s of slugs("content/blog", ".md")) r.push("/blog/" + s);
for (const c of new Set([...fs.readdirSync(path.join(root, "content/blog")).map((f) => (fs.readFileSync(path.join(root, "content/blog", f), "utf8").match(/^category:\s*"?([\w-]+)"?/m) || [])[1])].filter(Boolean))) r.push("/blog/category/" + c.toLowerCase());
for (const group of fs.readdirSync(path.join(root, "app/tools"))) {
  const dir = path.join(root, "app/tools", group);
  if (!fs.statSync(dir).isDirectory() || !group.startsWith("(")) continue;
  for (const tool of fs.readdirSync(dir)) if (fs.existsSync(path.join(dir, tool, "page.tsx")) && !tool.startsWith("(")) r.push("/tools/" + tool);
}
console.log(JSON.stringify([...new Set(r)]));
