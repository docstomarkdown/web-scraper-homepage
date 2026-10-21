# Site review, 2026-10-21: what to change before the site is indexed

**In one line:** 137 pages were read as the nine personas in `personas.md` and audited for WCAG 2.1 AA in light and dark mode; the content is in place, and what stands between it and a top-quality launch is one legal page, one colour token, one markup bug, the calculator section, and a formatting pass per template.

| | |
|---|---|
| Pages | 137 (see §1) |
| Method | Persona walk by page type (§2) and an automated audit of every page with axe-core, light and dark, plus font-size, heading and link checks (`scripts/audit-pages.mjs`) |
| Findings | 9 structure, 9 content, 16 UX and accessibility (§3) |
| Phases | 0 (owner inputs), 1 (blockers), 2 (formatting and quality by template), 3 (structure), 4 (launch) (§4) |

---

## 1. Inventory

| Page type | Count | Status today |
|---|---|---|
| Home | 1 | Live |
| Feature pages | 12 | 10 live, MCP and Cloud "coming soon" |
| Use cases | 7 + hub | Drafts (local preview only) |
| Site pages | 13 + hub | Drafts |
| Guides | 21 + hub | Drafts |
| Blog | 9 posts + hub, author, category | 1 published, 8 drafts |
| Resources | What's new, Comparisons (1 page), Is web scraping legal? | Live |
| Support, Privacy, Terms | 3 | Live |
| Free calculators | 61 (listing + 60 tools) | Live |

Drafts render only on localhost and never reach the sitemap, so "indexed" today means home, features, resources, legal, support and the calculators.

---

## 2. How the review was done

**Persona walk.** Each page type was read as the personas it serves, against the review questions already in `personas.md`: Maria (real estate), Arjun (lead generation), Priya (store owner), Dana (first-time, non-technical), Sam (recruiter), Wei (researcher), Leo (developer), Kai (Shopify), Rina (freelancer). The question each time: what do they understand in five seconds, what don't they, and what would stop them installing.

**Automated audit.** `node scripts/audit-pages.mjs` loads every route on the dev server in Chromium at 1280px, light and dark, runs axe-core with the WCAG 2.1 A and AA rule sets plus best practices, and measures rendered font sizes, heading order, link text, image alt, unnamed controls, skip links and horizontal overflow. Animations are forced to their final state first so colours are measured as a reader sees them.

**What the audit found, in totals (light and dark together):**

| Rule | Nodes | Where |
|---|---|---|
| Content outside a landmark (`region`) | 4,754 | Calculator pages, which have no `<main>` |
| Colour contrast below 4.5:1 | 2,375 | Every page: brand blue as text and as button background |
| Buttons without a name | 690 | Calculator pages (icon buttons) |
| List items outside a list | 238 + 66 | Feature, use-case and site templates, homepage sections |
| Heading levels skipped, no `<main>`, empty headings | 122 + 122 + 30 | Calculator pages |
| Links told apart by colour only | 48 | Feature and site templates |
| Scrollable tables not reachable by keyboard | 20 | Sample tables |
| Skip link | 0 of 137 pages have one | Site-wide |

Content pages (use cases, guides, posts, site pages) are clean on headings, alt text, control names and language. The faults cluster in three places: one colour token, one animation wrapper, and the calculator section.

---

## 3. Findings

Each finding: where, who feels it, what, the fix, and the phase it belongs to.

### 3.1 Structure

| # | Where | Who | What | Fix | Phase |
|---|---|---|---|---|---|
| S1 | Everywhere | Dana, Rina, Wei, every "pays when" | No price anywhere. The FAQ says "one plan, Pro" and "cancel any time", so a reader expects a number and finds none. | A pricing section on the homepage and a `/pricing` page, once billing timing is decided. Until then, say plainly that the extension is free to install and the plan is on its way. | 0 (decision), then 3 |
| S2 | Everywhere | Buyers | No page says who makes this. Thinksolv appears in the footer only. | A short `/about`: who, where, since when, how support works, the "built thoughtfully" line. | 3 |
| S3 | Use cases | Sam | Recruiters have no page. The careers-page guide exists and the product handles it. | Restore `/use-cases/job-postings` built on the careers-page guide: roles, never people. | 3 |
| S4 | Nav, footer, `/tools` | 8 of 9 personas | 61 calculator pages for online sellers sit beside a scraping product, with their own voice, and they are the worst pages in the audit. They dilute the site for everyone but Priya. | Keep them, but as a clearly framed "free calculators for sellers" corner: footer link only, honest listing copy, linked from the e-commerce use case. Decide whether the weakest 20 go. | 2 (quality), 3 (placement) |
| S5 | `/scrapers` hub | Maria, Priya | 15 of 28 sites are plain chips with no page (Target, Costco, Redfin, Zoopla, Monster, Capterra and more). A reader can't learn their columns. | A page per site as its pack is verified, or a one-line "columns" note on the chip. | 3 |
| S6 | Home | Maria, Sam | The Property listings and Job posts cards link nowhere until their use cases publish. | Publish the use cases (phase 1); the links appear on their own. | 1 |
| S7 | Feature pages | All | Breadcrumbs exist on guides, site pages and use cases, not on feature pages. | Add the breadcrumb to the feature template. | 2 |
| S8 | Resources menu | All | Guides shows as a draft until the first guide publishes; Blog has one post. | Publish wave 1 after captures. | 1 |
| S9 | Site-wide | Search engines | The site is noindex by design. Canonicals, sitemap and structured data are in place. | Owner removes noindex after phase 1; Search Console from that day. | 4 |

### 3.2 Content

| # | Where | Who | What | Fix | Phase |
|---|---|---|---|---|---|
| C1 | `/terms-of-service` | Everyone, and the law | The terms describe a different product: accounts and licences, "point-and-click data selection", "saved selectors and scheduling features based on your plan", "cloud storage integrations". None of it is true of 1.3.0. | Rewrite to the real product: no account, no billing yet, what the extension does, what the user may not do with it, the cloud as a future service. | 1, blocker |
| C2 | `/tools` and 60 tool pages | Priya, and anyone who lands there from search | Listing copy is hype ("Everything you need to grow faster", "30+ powerful calculators" when there are 60). Several tools carry the placeholder "Powerful tool to streamline your workflow." The how-to steps on tool pages read as word salad ("Enter absolute final storefront ticket pricing actively charged completely to final checkout buyers") and render twice. | Rewrite the listing in the site's voice; one honest sentence per tool; rewrite or delete each tool's how-to; render steps once. Or cut the tools that can't be fixed in a day. | 2 |
| C3 | Home hero | Dana, style guide | "Just ask for the data you want" uses a banned word in approved copy; "any list" chip is lowercase. | Owner decides on "Just"; fix the chip. | 0, then 1 |
| C4 | Home FAQ | Dana, Rina | "What's included in the plan? Everything. There's one plan, Pro" reads as a sales pitch with the price missing. | Rewrite with S1: free to install, what you can do today, the plan when it exists. | 1 |
| C5 | Home, feature pages | Dana | "Side panel", "named columns", "JSON" appear before they are explained. Feature pages explain; the homepage doesn't. | One plain clause on first use on the homepage: "a panel that opens on the right of your browser". | 2 |
| C6 | 49 drafts | All | 21 guides, 7 use cases, 13 site pages and 8 posts are written but hidden until their screenshots exist and each is read once as its persona. | Captures (phase 0), then review on `/review`, then `status: published`. | 0, then 1 |
| C7 | `/privacy-policy` | Dana, Wei | Accurate. It doesn't link to the chat page's "what chat sends" section, which is the plainer version of the same facts. | Add the link; add a one-line summary at the top. | 2 |
| C8 | `/mcp`, `/cloud` | Leo | "Coming soon" with no date, by design. A developer wants a docs path; there is none until cloud. | Fine as is; add "notify me" only if a mailing list exists. | 3 |
| C9 | Comparisons, roundup post | Owner | One compare page and one roundup name competitors with their prices. Fair and dated, but tone is the owner's call. | Owner reads both; then two or three more compare pages. | 0 |

### 3.3 UX and accessibility

| # | Where | Who | What | Fix | Phase |
|---|---|---|---|---|---|
| A1 | Every page | Low vision, older readers | Brand blue `#2772ED` is used as text (eyebrows, links, chips) at about 4.0:1 on white, and as a button background under white text at the same ratio. Both fail AA (4.5:1). Dark mode fails the same way. 2,375 nodes. | One token change: text and link blue becomes `#1f5ec2` (5.9:1), buttons use `#1f5ec2` or darker, the tile logo keeps `#2772ED`. Record in `brand.md`. | 1 |
| A2 | Feature, use-case and site templates, homepage sections | Screen reader users | The `Reveal` animation wrapper puts a `div` between `ul`/`ol` and `li`, so lists are announced as loose text and item counts are lost. 304 nodes. | Give `Reveal` an `as` prop and render `motion.li`, or move the wrapper inside the `li`. | 1 |
| A3 | Calculator pages | Screen reader and keyboard users | No `<main>` landmark, 690 icon buttons without names, 122 skipped heading levels, 30 empty headings, 8 inputs without labels, 8 invalid ARIA values. | Give the tools layout a `main`, name every icon button, fix the heading order in the template, label inputs. | 2 |
| A4 | Every page | Keyboard users | No skip link, so every page starts with the full header. | A "Skip to content" link as the first focusable element, target `#main`. | 1 |
| A5 | Feature and site templates | Colour-blind readers | Links inside paragraphs are told apart by colour only. 48 nodes. | Underline links in running text, as guides already do. | 1 |
| A6 | Sample tables | Keyboard users | Tables that scroll sideways can't be reached by keyboard. 20 nodes. | `tabindex="0"` and an `aria-label` on the scrolling wrapper. | 1 |
| A7 | Guides, posts | Screen reader users | The author box is an `<aside>` inside the article, which some readers announce as a page-level region. | A `section` with a heading instead. | 2 |
| A8 | Markdown tables | Screen reader users | Comparison tables with an empty first header cell. | A header word in that cell. | 2 |
| A9 | Home, feature and site pages, hubs | Older readers | Text below 14px: 56 on the homepage (demo mock-ups, chips), 42 on `/ai-chat` (chat mock-up), 42 on the guides hub (badges, read times). Text below 16px: 406 nodes on feature pages, 449 on site pages, 196 on the homepage, from 14 and 15px secondary text. | Apply the readability rules (`writing-style.md` §11) to the feature, site and hub templates and the homepage sections, as done for use cases. Mock-ups keep small text but get a visible caption. | 2 |
| A10 | Use-case hero | Narrow desktops | The sample sheet beside the title scrolls sideways under about 1,200px. | Stack the sheet under the title below `xl`, or show three columns there. | 2 |
| A11 | All templates | Keyboard users | Focus rings on custom buttons and `details` summaries not yet checked by hand. | A keyboard-only walk per template; add `focus-visible` rings where missing. | 2 |
| A12 | All animated sections | Motion-sensitive readers | `Reveal` must honour `prefers-reduced-motion`; verify, and that the hero demo does too. | Test with the OS setting; fix where it still animates. | 2 |
| A13 | Five templates | Screen reader users | No VoiceOver pass yet. Landmarks, headings and names are right on content pages, so this is confirmation, not repair. | VoiceOver walk of home, a feature page, a use case, a guide, a site page; fix what's announced oddly. | 2 |
| A14 | One guide | Phone readers | One guide page scrolls sideways at 1280px (a wide table or code block). | Find it from the audit JSON and wrap. | 2 |
| A15 | Status colours | Colour-blind readers | Badges and chips use colour plus text, as the rule requires; the Sponsored label and draft banners are fine. | Keep the rule; check new components against it. | ongoing |
| A16 | Site-wide | Everyone | `lang` is set on every page; images all carry alt; no unnamed controls outside the tools. | Nothing. Noted so it stays true. | ongoing |

---

## 4. Phases

**Phase 0, owner inputs.** Captures (sittings A to C), the pricing and billing timing (S1), "Just" in the hero (C3), the comparison tone (C9), and the "Google Maps" naming. Nothing in later phases depends on the naming decision; everything in phase 1 depends on the captures.

**Phase 1, blockers before anything new is indexed.** C1 terms rewrite; A1 colour token; A2 list markup; A4 skip link; A5 link underline; A6 table focus; C4 plan FAQ; the wave-1 reviews on `/review` and `status: published` on the pages that pass (S6, S8, C6). One or two days of work after the captures land.

**Phase 2, formatting and quality by template.** The pass you asked to keep separate: feature and site-page heroes and cards to the use-case shape; type sizes and ink per `writing-style.md` §11 (A9); breadcrumbs (S7); the calculator section rewritten or cut and given landmarks and names (C2, A3); A7, A8, A10; the keyboard, reduced-motion and VoiceOver walks (A11 to A14); C5, C7. Judge each template on one page first, as with lead generation.

**Phase 3, structure.** Pricing page and section (S1), About (S2), the job-postings use case (S3), pages for chip-only sites as packs are verified (S5), the calculators' placement (S4), the remaining compare pages (C9).

**Phase 4, launch.** Owner removes noindex; Search Console; confirm the sitemap and canonicals from the live domain; the `/go` links in video descriptions; a first analytics check two weeks on.

---

## 5. Phase 1 log

**2026-10-21, done.** Owner decision the same day: the extension is free and nothing is priced (S1, C4 resolved by
copy, not by a pricing page). Shipped: C1 Terms rewritten to the real product; A1 `#1f5ec2` for text, icons and
button backgrounds with `#2772ED` kept for the tile, gradients and tints; A2 `Reveal as="li"` in the three
templates; A4 skip link plus `<main id="main">` on every page, including the calculators and legal pages; A5
underlined in-text links; A6 focusable scrolling tables; all plan FAQs now answer "Is this free?"; the legal
template got dark-mode ink, labelled navs and one landmark; the author box is a section (A7). A root cause the
audit had counted as hundreds of dark-mode contrast failures turned out to be three CSS tokens (`--text-body`,
`--text-strong`, `--text-muted`) defined for light only; they now have dark values.

Re-audit of support, terms, maps-leads, lead-generation and the Amazon page: 0 violations, light and dark.
Still open from phase 1: wave-1 publishing (C6, S6, S8) waits on the captures; C3 "Just" in the hero waits on the
owner. The homepage and `/ai-chat` keep small-text contrast failures inside the demo mock-ups (A9, phase 2).

**Phase 2 started the same day, on the owner's review of `/maps-leads`** ("the title is not search focused ... the
information is not readable at all"). Two fixes: titles now start with "How to" and say what a user types into
Google, which for this page is "Google Maps" (decision in the strategy log); and the feature template moved to the
reading-column shape of the use-case pages (one column, 18px body, steps as a flowing list, columns as a table,
sample table of five columns under the hero). Re-audit of `/maps-leads` and `/list-scraper`: 0 violations and no
text under 16px, light and dark. The other eleven feature pages render on the new template with their old copy;
each needs the same search-first title and shorter copy before it counts as done.

**Later the same day:** the other eleven feature pages, the thirteen site pages and the twenty-one guides got
search-first titles from the autosuggest and search-volume data, "Google Maps" became the wording site-wide (owner
decision), guide titles dropped "with Web Scraper Pro", the site-page template moved to the reading-column shape, and
the copy on all of them was cut to short paragraphs. Audits of every feature and site page and a sample of guides:
0 violations light and dark. The seven use cases then got search-first titles and the homepage a copy pass (title tag targets "web scraper
chrome extension", hero says "free" and "in plain words", demo mock-ups at 14px with readable ink): 0 violations on
the homepage, light and dark. Left for the owner's read: posts, and the guide and hub templates' small secondary text.

## 6. Rerunning the audit

```bash
node scripts/audit-pages.mjs /tmp/audit.json
```

It needs the dev server on port 3010, `axe-core` from this repo and Playwright from the sibling extension repo (`../chrome-extension-source/node_modules`). The JSON holds every violation with a CSS target, per page and per colour scheme, which is the list to work from in phases 1 and 2.
