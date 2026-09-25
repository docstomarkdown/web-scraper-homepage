# Visitor personas: copy review checklist

Use these to review any page on this site. Read the page top to bottom *as* one persona, write down
every moment they'd hesitate ("what does this mean?", "does it do X?", "is this for me?"), fix the
copy, then move to the next persona. Do one persona at a time and commit each round separately.

Last full review: 2026-09-25 (homepage, personas 1–7). Persona 8 added with the Shopify section; not yet run as a full review.

## How to run a review

1. Open the page in the browser pane at desktop width, then at 375px. Check light and dark mode (see
   `AGENTS.md`).
2. Read the visible text as the persona. `get_page_text` is a quick way to see everything in reading
   order. Closed FAQ answers don't show there, so open them or read `components/landing/FAQ.tsx`.
3. For every gap, **check the product before writing copy** (extension, cloud worker, dashboard). Only
   claim what is shipped and verified. If a feature is planned, say so plainly ("coming with Pro").
4. Fix the smallest thing that removes the hesitation: a clearer word, one more sentence, a FAQ entry.
   Don't add sections for one persona's edge case.

## The personas

### 1. Real estate agent: "Maria"
- **Wants:** new listings and rentals in her area, homes to compare, a list to work from in a spreadsheet.
- **Looks for:** property listings in the demo and data types; which listing sites work; photos.
- **Will ask:** "Does it work on my MLS or other sites I log in to?" "Can I get photos?" "Will it get
  every page of results?"
- **Watch for:** jargon like "pagination"; cards that say *what* data you get but not *what it's for*.

### 2. Lead-generation agency owner: "Arjun"
- **Wants:** lists of local businesses (by niche and city) with phones, websites and emails, for clients.
- **Looks for:** Maps leads, emails, bulk runs, export to CSV for a CRM.
- **Will ask:** "Can I get emails for businesses I find on Maps?" "Will websites block me?"
- **Watch for:** overpromising the email step (see product facts below).

### 3. Online store owner: "Priya"
- **Wants:** competitor prices, bestsellers and customer reviews from big marketplaces *and* small
  independent stores.
- **Looks for:** product/price/review data; whether independent stores work.
- **Will ask:** "Can it check prices every day on its own and tell me when they drop?"
- **Watch for:** implying scheduling or alerts are live when they aren't.

### 4. First-time, non-technical visitor: "Dana"
- **Wants:** to understand what this is in five seconds, and whether it's safe.
- **Looks for:** what it is (a Chrome extension), how to start, whether an account is needed.
- **Will ask:** "Do I need an account?" "Where does my data go?" "Is it free?"
- **Watch for:** any jargon (scrape, pagination, JSON-first wording); steps that skip installing.

### 5. Recruiter: "Sam"
- **Wants:** who is hiring, open roles on job boards and company careers pages, salary ranges.
- **Looks for:** job posts in the demo; careers pages.
- **Will ask:** "Does it work on company careers pages?" "Which job boards?"
- **Watch for:** candidate or personal-profile collection. Don't market it.

### 6. Analyst or researcher: "Wei"
- **Wants:** research papers, page text for AI analysis, clean structured data for spreadsheets.
- **Looks for:** what each smaller data type returns, export formats, text for AI tools.
- **Will ask:** "What exactly do I get from research papers?" "Can I use page text with AI tools?"
- **Watch for:** data types listed as bare labels with no description.

### 7. Developer building AI agents: "Leo"
- **Wants:** to call the scraper from code or from an AI agent.
- **Looks for:** API, MCP, JSON output, docs.
- **Will ask:** "Is there an API?" "Can Claude use it?" "Can an agent use my logged-in browser?"
- **Watch for:** claims about limits, pricing per request or data privacy that aren't verified.

### 8. Shopify agency or dropshipper: "Kai"
- **Wants:** a competitor's or client's full Shopify catalog (every variant, SKU, price and image), a
  file to migrate products into another store, and product research across many stores.
- **Looks for:** the Shopify section, the import CSV, collection filtering, image download, bulk stores.
- **Will ask:** "Does it get every product or just what's on the page?" "Can I import the file into my
  store?" "Does it work on any Shopify store?"
- **Watch for:** promising password-protected stores; implying the import CSV needs no review.

## Product facts checked (keep copy consistent with these)

Verified against the code on 2026-09-25. Re-check before relying on them if much time has passed.

- **Maps emails are two steps.** The chat collects contacts only from the page that is open, and
  collecting from Maps is a separate step. Emails for a Maps list come from running *Collect contacts*
  on the websites from that list. Never show one prompt returning Maps results *with* emails.
  (`chrome-extension-source/lib/tools/capabilityTools.ts`, `lib/tools/maps.ts`)
- **Property listing fields on ready-made sites:** price, address, beds, baths, square footage, listing
  link, photos. Not days on market, price history or listing agent.
  (`chrome-extension-source/public/site-sitemaps/site-column-mappings/zillow.com.json`)
- **Research papers (Scholar):** title, link, authors/source line, snippet, full-text links.
  (`chrome-extension-source/public/site-sitemaps/scholar/google-scholar.json`)
- **No account needed for the extension.** The cloud dashboard uses Google sign-in.
- **Scheduled runs are not live.** Describe them as coming with Pro.
- **Cloud:** up to 200 URLs per batch, results as CSV, JSON or Excel. Don't claim cloud screenshots,
  PDFs or cloud Google Sheets export until they're verified in production.
- **Developer access:** MCP server (`scrape_url`, `scrape_urls`, `get_scrape_result`, plus browser-relay
  tools that use the page open in the user's extension) and a REST API with an API key.
  (`webscraper-pro-cloud-worker/src/mcp/server.ts`)
- **Ready-made sites list** (`components/landing/Sites.tsx`) only includes sites with tuned setups.
  Generic fallback packs and sites with known extraction bugs stay off it.
- **Shopify store mode is shown as live on the site by the owner's decision (2026-09-25), ahead of
  release.** Only phase 1 (the core fetch module) is built; the extension card, Shopify import CSV,
  chat tool, MCP tools and multi-store bulk runs are phases 2–5 in
  `chrome-extension-source/change_documentation/SHOPIFY_MODE_PLAN.md`. Before the site goes public,
  confirm each Shopify claim on the homepage (hero demo, `ShopifyStores.tsx`, Sites, FAQ, Developers)
  has shipped. Row columns come from `lib/platform/shopify/rows.ts`: title, vendor, type, price,
  compare-at price, available, variant options, SKU, barcode, grams, tags, description, images, URL.
  Password-protected stores are not supported.
- **Not claimed:** LinkedIn support; "the AI never sees your data"; user counts or ratings.
