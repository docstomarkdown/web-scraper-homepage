# Visitor personas: copy review checklist

Use these to review any page or menu on this site. Read it top to bottom *as* one persona, write
down every moment they'd hesitate ("what does this mean?", "does it do X?", "is this for me?"), fix
the copy, then move to the next persona. Do one persona at a time.

Each persona is built from research on real users (reviews, forum posts, freelance job listings,
video search data). The evidence and sources are kept outside this repo; ask the owner if you need
them. **Evidence** on each persona says how much to trust it: *strong* (many real voices), *some*
(a few), or *assumption* (no real voices yet; treat it as a hypothesis).

Last full review: 2026-09-25 (homepage, personas 1–7). Personas rebuilt from research on 2026-09-25;
persona 9 added. Candidates checked and not added (no real user voices): marketers/SEO, sourcing
buyers, hotel operators (revisit when scheduled cloud runs ship), small business owners and B2B
sales reps (folded into Arjun), market researchers (folded into Wei).

## How to run a review

1. Open the page in the browser pane at desktop width, then at 375px. Check light and dark mode (see
   `AGENTS.md`).
2. Read the visible text as the persona. `get_page_text` is a quick way to see everything in reading
   order. Closed FAQ answers don't show there, so open them or read the component.
3. Ask the persona's **review questions** (below) and the **fears every visitor has**. Each "no" or
   "not sure" is a finding.
4. For every gap, **check the product before writing copy** (extension, cloud worker, dashboard). Only
   claim what is shipped and verified. If a feature isn't available yet, say "coming soon".
5. Fix the smallest thing that removes the hesitation: a clearer word, one more sentence, a FAQ entry.
   Don't add sections for one persona's edge case.

## Fears every visitor has

These come up across all personas. Any page that touches them must answer them honestly.

1. **"Will it stop halfway?"** Tools that quietly miss pages or break after a site redesign are the
   most common complaint in this category. Show what "every page of results" means, and never claim
   reliability we haven't proven.
2. **"Is it really no-code?"** People have been told "no code" and then asked to write selectors.
   Show the real click path.
3. **"What will it actually cost me?"** Usage-based pricing that's hard to predict makes people
   anxious. Our answer is one plan with everything included, no credits.
4. **"Can I get out?"** Surprise renewals and hard-to-cancel plans are the angriest complaints in the
   category. Say "cancel anytime" only where it's true, and make it easy to find.
5. **"Is 'free' really free?"** A video or page that says free, followed by a paywall, destroys
   trust. We don't describe the product as free.
6. **"Will the site block me, or ban my account?"**
7. **"Is it safe and legal?"** Especially: what the extension can see, and where data goes.
8. **"Will someone help me if it doesn't work?"**
9. **"Can I trust the ratings?"** Ratings in this category are often gamed. We show no ratings or user
   counts until they're real.

## The personas

### 1. Real estate professional or investor: "Maria"
**Evidence:** strong for the need, some for the "agent" job title. The real voices are mostly
investors and analysts pulling market data.

- **Who:** agent, investor, property manager or analyst. Comfortable with spreadsheets, not with code.
- **What starts the search:** a new area or zip code to research, a weekly list of new listings or
  rentals, or finding out that property data services are priced for big companies.
- **Words she uses:** "export listings to Excel", "download Zillow results", "rental listings", "zip
  code", "every listing in the area".
- **Today:** copies listings by hand, or pays a freelancer and gets inconsistent results.
- **Success:** one row per home (price, address, beds, baths, square footage, link, photos) for every
  page of results in an area, and the same sheet again next week.
- **Installs when:** she sees her listing site named next to a sample table.
- **Pays when:** it becomes a weekly job, or she covers several areas.
- **Can't serve (never imply):** days on market, price history, listing agent details, private MLS
  data.

**Review questions:**
- Is her listing site named, and is the list of fields exact?
- Does it say what happens across many pages of results, in plain words?
- Is it clear whether it works on sites she signs in to?
- Does anything imply fields we don't extract?

### 2. Lead-generation agency owner: "Arjun"
**Evidence:** strong.

- **Who:** runs a small agency or sales team building lead lists for clients. Moves fast, compares
  prices closely, and learns tools from YouTube.
- **What starts the search:** a new client or niche, or a cheap tool or gig that broke or went stale.
- **Words he uses:** "leads", "emails", "niche + city", "Maps leads", "export to Excel/CSV",
  "unlimited".
- **Today:** a mix of cheap tools, freelancers and manual copying. Emails are the hard part.
- **Success:** a CRM-ready CSV with name, category, address, phone, website, rating and email,
  deduplicated, repeatable city by city.
- **Installs when:** he sees Maps leads and contact collection working together.
- **Pays when:** he needs volume: bulk runs, contact collection across many sites, a flat price with
  no per-row cost.
- **Can't serve (never imply):** LinkedIn leads, social media groups, guaranteed or verified emails,
  or Maps results that come back with emails in a single step.
- **Sub-type, "own pipeline":** a small business owner building one list for their own business: one
  niche, their own city, a few hundred rows, bought rarely. As new to tools as Dana and more
  price-sensitive than an agency. Searches for the task ("local business leads to Excel"), not their
  role.
- **Second list source:** sales reps and agencies selling to other businesses also build company lists
  from business directories and software review sites, not only Maps.

**Review questions:**
- Is the Maps → contacts two-step shown honestly?
- Is it clear what happens when a business has no email on its site?
- Does anything suggest per-row or per-lead costs?
- Is bulk (many cities, many sites) easy to find?
- Can someone selling to businesses see which directories are ready-made, and that LinkedIn and
  contact databases aren't supported?
- Can a marketing or SEO agency see how to build a prospect list for its own services?

### 3. Online store owner: "Priya"
**Evidence:** strong for the need. This is the most crowded use case in the category.

- **Who:** runs a store on a marketplace or her own site. Busy, practical, lives in Google Sheets.
- **What starts the search:** a competitor undercutting her, a sale season coming, researching what
  sells, or reading competitors' reviews to find complaints she can solve.
- **Words she uses:** "competitor prices", "product data", "reviews", "into Google Sheets", "track
  prices".
- **Today:** checks competitor pages by hand, or uses a tool that stopped working.
- **Success:** price, list price, rating, review count, seller and link across marketplaces and small
  independent stores, plus review exports.
- **Installs when:** she sees her marketplace named and a clean product table.
- **Pays when:** she trusts it will **still work next month**.
- **Can't serve yet:** checking prices every day on its own and alerting her. That needs cloud runs,
  which are coming soon. Say so plainly and never imply it's live.

**Review questions:**
- Is it clear that independent stores work, not just big marketplaces?
- Does any copy suggest scheduled checks or alerts are live?
- Is the reviews export described with its fields?

### 4. First-time, non-technical visitor: "Dana"
**Evidence:** strong. Her fears are the best-documented in the research.

- **Who:** arrived from a short video, a "without coding" search or the Chrome Web Store. Has never
  used a scraper.
- **Words she uses:** "copy", "download", "export", "into Excel", "table". She doesn't say "scrape".
- **Success:** install, one click, a clean table and a file that opens in Excel, all in about two
  minutes.
- **Fears:** is the extension safe, will I be charged or trapped in a trial, will my account be
  banned, is it legal, and "the video said free".
- **Installs when:** she understands in five seconds what it is and that it runs in Chrome on any
  computer (Windows-only tools get rejected).
- **Pays when:** her first result worked and the plan is clear, with easy cancelling.

**Review questions:**
- Can she tell in five seconds that this is a Chrome extension and what it produces?
- Is there any jargon (scrape, pagination, selectors, JSON, MCP) without a plain explanation?
- Does she know whether she needs an account, what it costs, and how to cancel?
- Is anything called "free" that isn't?

### 5. Recruiter: "Sam"
**Evidence:** assumption. There are no real user voices yet, only search demand for job-listing
exports. Treat this persona as a hypothesis and give it lower priority.

- **Who:** in-house recruiter or recruiting agency researcher.
- **What starts the search (assumed):** a list of companies hiring for a role, salary research, or
  watching a company's careers page.
- **Words he uses:** "job listings to CSV", "who is hiring", "careers page", "job board export".
- **Success:** title, company, location, salary if shown, date posted and link, deduplicated across
  job boards.
- **Can't serve (never imply):** candidate or personal profiles, LinkedIn. Don't market collecting
  people.

**Review questions:**
- Is it clear that it's about job posts, not people?
- Are careers pages covered honestly (they all look different)?

### 6. Analyst or researcher: "Wei"
**Evidence:** some.

- **Who:** student, academic or analyst. Usually one-off projects: a literature review, a dataset for
  a report, text for an AI tool.
- **Words they use:** "research papers", "dataset", "clean text", "for ChatGPT", "citation list".
- **Success:** a clean table (title, authors, link, snippet, full-text link) or clean page text, with
  the date it was collected.
- **Biggest objection:** paying a monthly plan for a one-off job. Easy cancelling matters.
- **Also:** market researchers and product managers doing one-off competitor research, such as a
  table of competitors' reviews from software review sites, with source links and the date.
- **Later:** analysts who need scheduled data will fit once cloud runs launch.

**Review questions:**
- Does each data type list exactly what it returns?
- Is it clear the text works with AI tools, without claiming anything about what the AI sees?
- Is one-month use (and cancelling) made easy to understand?

### 7. Developer building AI agents: "Leo"
**Evidence:** strong attention, some evidence of buying. Content about connecting AI assistants to
the web is the fastest-growing format in the category.

- **Who:** developer or technical founder wiring an AI agent to the web. Reads docs first.
- **Words he uses:** "MCP", "connect Claude", "agent", "API", "JSON", "logged-in browser".
- **Success:** clean JSON for one URL or a batch, and an agent that can use his own signed-in browser.
- **Compares us with:** scraping APIs and his own scripts, not other extensions.
- **Fears:** APIs that change without warning, docs that don't match the product, the AI connection
  turning out to be a paid add-on, unclear limits, unverified privacy claims.

**Review questions:**
- Is it clear what works today (Browser Relay through the extension) versus coming soon (cloud
  scraping, REST API)?
- Are limits and pricing stated only where verified?
- Is there a clear path to docs?

### 8. Shopify agency or dropshipper: "Kai"
**Evidence:** some. This persona covers two jobs: an **agency** migrating or rebuilding a client's
store (often without admin access) and a **dropshipper** researching or copying catalogs.

- **Words he uses:** "download all products", "export Shopify store", "import CSV", "variants",
  "images", "any Shopify store".
- **Success:** the full catalog (every variant, SKU, price and image) and a file he can import into
  another store after a review.
- **Fears:** getting only what's on the visible page, an import file that needs heavy cleanup,
  password-protected stores.
- **Pays:** usually per project, so the plan must be worth it for one job and easy to cancel.
- **Can't serve (never imply):** password-protected stores; an import file that needs no review.

**Review questions:**
- Is it clear it gets the whole catalog, not just the visible page?
- Is the import CSV described honestly (review before importing)?
- Is it clear which stores work (public ones)?

### 9. Freelancer or virtual assistant: "Rina"
**Evidence:** strong that this group is large (thousands of active data-collection gigs on freelance
marketplaces); willingness to pay is untested.

- **Who:** freelancer or VA who collects data for clients: lead lists, product lists, directory
  exports. Works to deadlines, often from outside the US.
- **What starts the search:** a new order, which usually means a **new site**, a deadline and the
  client's own format.
- **Words she uses:** "data entry", "lead list", "web research", "any website", "Excel", "delivery".
- **Success:** a clean, client-ready Excel file with good column names and no duplicates, delivered
  fast, easy to run again.
- **Installs when:** she sees it works on sites without a ready-made setup.
- **Pays when:** it lets her take more orders a day (bulk runs, contact collection, no usage math).
  She is the most price-sensitive persona.

**Review questions:**
- Is it clear it works on any site the client names, not only ready-made ones?
- Can she rename, reorder and clean columns before delivering?
- Is the price easy to understand in her own currency terms, with no usage math?

## Product facts checked (keep copy consistent with these)

Verified against the code on 2026-09-25. Re-check before relying on them if much time has passed.

- **Maps emails are two steps.** The chat collects contacts only from the page that is open, and
  collecting from Maps is a separate step. Emails for a Maps list come from running *Collect contacts*
  on the websites from that list. Never show one prompt returning Maps results *with* emails.
  (`chrome-extension-source/lib/tools/capabilityTools.ts`, `lib/tools/maps.ts`)
- **Maps returns ratings, not reviews.** Maps leads give the star rating and review count per place,
  not review text. Don't mention collecting Maps reviews.
  (`chrome-extension-source/public/site-sitemaps/map-leads/google-maps.json`)
- **Property listing fields on ready-made sites:** price, address, beds, baths, square footage, listing
  link, photos. Not days on market, price history or listing agent.
  (`chrome-extension-source/public/site-sitemaps/site-column-mappings/zillow.com.json`)
- **Research papers (Scholar):** title, link, authors/source line, snippet, full-text links.
  (`chrome-extension-source/public/site-sitemaps/scholar/google-scholar.json`)
- **No account needed for the extension.** The cloud dashboard uses Google sign-in.
- **Pricing is one paid plan, Pro, with everything included** (owner decision, 2026-09-25). Don't
  describe anything as free, and don't single out a feature as paid or "Pro only". Only cloud features
  are marked "coming soon".
- **Cloud is coming soon** (owner decision): cloud runs, scheduled runs, the cloud dashboard, and cloud
  scraping via MCP or the REST API are all described as coming soon. Browser-relay MCP tools run in the
  user's own browser and aren't part of this.
- **Cloud (when it launches):** up to 200 URLs per batch, results as CSV, JSON or Excel. Don't claim
  cloud screenshots, PDFs or cloud Google Sheets export until they're verified in production.
- **Developer access:** MCP server (`scrape_url`, `scrape_urls`, `get_scrape_result`, plus browser-relay
  tools that use the page open in the user's extension) and a REST API with an API key.
  (`webscraper-pro-cloud-worker/src/mcp/server.ts`)
- **Ready-made sites list** (`components/landing/Sites.tsx`) only includes sites with tuned setups.
  Generic fallback packs and sites with known extraction bugs stay off it.
- **Chat, Browser Relay and Shopify store mode are built and ship in the release this site launches
  with** (owner, 2026-09-25). Only cloud scraping is not built yet (see "Cloud is coming soon"). Per
  `chrome-extension-source/change_documentation/SHOPIFY_MODE_PLAN.md`, Shopify phases 1–4 are done
  (core, extension card with import CSV and image download, chat tool and relay, cloud MCP tools);
  phase 5 (multi-store bulk runs) is still open, so check any "many stores at once" claim before
  launch. Row columns come from `lib/platform/shopify/rows.ts`: title, vendor, type, price,
  compare-at price, available, variant options, SKU, barcode, grams, tags, description, images, URL.
  Password-protected stores are not supported.
- **Shopify catalog export is included in the single plan.** Don't badge it separately.
- **Not claimed:** LinkedIn support; "the AI never sees your data"; user counts or ratings.
