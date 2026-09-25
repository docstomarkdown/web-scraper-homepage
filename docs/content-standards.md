# Content standards

These are the quality rules for every page on webscraper.pro, whether it's the homepage, a product
page, a use-case page, a per-site scraper page, a comparison page, a blog post or a free tool. They
come from Google's published guidance, applied to this site. Anyone writing here, human or AI, has to
follow them.

For how to write sentences, see `docs/writing-style.md`. To check copy against real readers, see
`docs/personas.md`. For design and code rules, see `AGENTS.md`.

Sources (re-read them if this file is more than six months old):
- Creating helpful, reliable, people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Spam policies: https://developers.google.com/search/docs/essentials/spam-policies
- Link best practices: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Canonicalization: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Guidance on AI-generated content: https://developers.google.com/search/blog/2023/02/google-search-and-ai-content

---

## 1. The one test

Before publishing, ask: **would we still publish this page if search engines didn't exist?**

It has to pass for a real visitor, like someone arriving from the Chrome Web Store, a YouTube video
or a link a colleague sent. If a page exists only because a keyword has search volume, don't publish
it. Either give it a reason to exist or drop it.

## 2. Helpful content (people-first)

Google's helpful-content signals are now part of its core ranking. Poor pages can pull down how Google
judges the whole site, not only themselves. Every page must meet all of these:

- **Original value.** It shows something the reader can't get by skimming the top five results. That
  could be a real run of the extension, real output columns, a real limitation, or a real time
  measurement.
- **First-hand experience.** If a page says how to collect X from site Y, someone actually did it with
  the extension and the page shows what happened, using screenshots or sample output. No hypothetical
  walkthroughs.
- **Complete for its job.** The reader finishes knowing whether it works for them and what to do
  next. They shouldn't need to go back to search.
- **Accurate and current.** Every product claim matches the product facts in `docs/personas.md`,
  checked against the released extension, not a feature branch. Pages that describe the product carry
  a "Last updated" date and are re-checked when the product changes.
- **Clear who, how and why:**
  - **Who:** blog posts and guides have a named author with a short bio. Product pages are authored by
    the company.
  - **How:** if AI helped write a page, a person who knows the topic reviews and fact-checks every
    claim before it ships. If a page has test results, say how the test was run: the date, the site,
    the steps and the volume.
  - **Why:** to help someone get data they need. Ranking is a side effect.

**Warning signs.** If any of these is true, stop and rethink the page:
- It was written to hit a word count. Google has no preferred length.
- It targets a topic we have no product or first-hand experience with, just because it's trending.
- It restates what other sites say without adding anything.
- The title promises something the page doesn't deliver.
- The page would still make sense with a different product name swapped in.

## 3. Spam policies that apply to this site

These are the ones we could plausibly trip over. Breaking one can get pages or the whole site demoted
or removed.

### Scaled content abuse
Google's definition is "many pages generated for the primary purpose of manipulating search rankings
and not helping users." It applies whether the pages are made by AI, templates or people.

**Where the risk is here:** per-site scraper pages (`/scrapers/<site>`), use-case pages, "scrape X in
<city>" pages and free-tool pages.

**Rules:**
- A templated page only ships if it carries substantial **site-specific content**:
  - The real fields that site returns.
  - A real sample of output (fake values, real columns).
  - What's specific about collecting from that site (paging, sign-in, limits, known gaps).
  - At least one screenshot from an actual run.
- Only create a per-site page for a site with a tuned, verified setup. That's the same list as the
  homepage Sites section. Never generate pages for every domain in the site packs.
- **No location or keyword permutations.** "Scrape plumbers in Austin" and "scrape plumbers in
  Dallas" are one page, not two. The same goes for "Amazon scraper" and "Amazon data extractor".
- Publish in batches small enough to review each page by hand. If a batch can't all be reviewed, it's
  too big.

### Doorway pages
These are pages that exist only to funnel searchers somewhere else, with little use of their own.
Every page must be useful on its own. A page that's just an H1, a paragraph and a big "Add to Chrome"
button is a doorway page.

### Thin content
This includes a page with a template and a few swapped nouns, a tag or category archive with one post,
a glossary entry with one sentence, and a tool page with a calculator but no explanation.

**Fix:** merge it into a stronger page, expand it with real substance, or leave it out of the sitemap
and noindex it. The empty blog archives (`/author/*`, `/category/*`) count as thin until they have
real posts.

### Scraped or copied content
The site sells a scraper, so this matters twice as much. Never publish text copied from another site,
from a competitor's docs, or from our own scrape output of someone else's content. Rewriting with
synonyms or translating doesn't make it original. Quotes are fine when they're short, credited and
linked.

### Link spam
- Never buy, sell or trade links. That includes "guest post with a dofollow link" deals, link
  exchanges and paid directory listings.
- Paid or affiliate links get `rel="sponsored"`.
- Links in user-generated areas (comments or forums, if we ever add them) get `rel="ugc"`.
- Don't put keyword-rich links in widget code, embeds or footers of other sites.
- If we sponsor something, the link on their side should be `sponsored` or `nofollow`.

### Keyword stuffing and hidden text
Write for the reader. Don't repeat a phrase unnaturally, don't use lists of cities or keywords, and
don't hide text (off-screen CSS, text coloured like the background, tiny fonts). Collapsed FAQ answers
and tabs are fine because users can open them.

### Misleading functionality
A free tool must actually do what its title says. A "Shopify store exporter" page must export, not
just ask for an install first without saying so. Say plainly when a feature needs the extension or
the Pro plan.

### Site reputation abuse
Don't host third-party content we don't control editorially, such as guest posts on unrelated topics
or "partner" sections, to take advantage of the domain's ranking.

## 4. Duplicate content and canonicals

Duplicate content isn't a penalty, but it splits ranking signals and wastes crawl budget.

- **One URL per piece of content.** Pick the final URL before publishing and don't change it. If a
  URL has to move, 301 redirect it.
- Every page sets a **self-referencing canonical** with an absolute URL
  (`https://www.webscraper.pro/...`), in `<head>`, through Next.js `metadata.alternates.canonical`.
- URL variants (UTM parameters, trailing slashes, `webscraper.pro` versus `www.`) must resolve to the
  one canonical URL.
- Don't publish the same article on another site before or at the same time as ours. If we syndicate
  (Medium, dev.to, LinkedIn), publish on our site first and have the copy point its canonical back to
  us.
- Near-duplicates:
  - Two pages that answer the same search intent get merged into one, with a redirect from the other.
  - Blog posts don't restate product pages; they link to them.
- Don't use `noindex` or robots.txt as a way to set canonicals. That's what `rel="canonical"` is for.
- The sitemap lists canonical URLs only. No redirects, no noindex pages, no 404s.

## 5. Internal links

Internal links are how visitors and Google understand what the site is about and which pages matter.

- **Every page gets at least one link from another page.** Orphan pages are invisible.
- **Hub and spoke:**
  - The homepage links to product and use-case hubs.
  - Hubs link to their per-site and how-to pages.
  - Those pages link back to their hub and to 2–4 sibling pages.
- **Blog posts link to the product page or scraper page** that does what the post describes, plus 1–3
  related posts. Put the links in the body, where the context is, not only in a "Related" box.
- **Anchor text says what's on the other side:** "collect Zillow listings", "export a Shopify catalog".
  - Never "click here", "learn more" or "this page".
  - Vary it naturally. Don't use one exact keyword anchor on every link to a page.
- Use real `<a href>` links (Next.js `<Link>`). No links that exist only in `onClick` handlers.
- When a page is removed or merged, update every internal link to it. Don't rely on redirects for
  your own links.
- Aim for about one contextual internal link per 150–300 words in long posts. That's a guide, not a
  quota.

## 6. External links

Linking out to good sources builds trust. It doesn't leak rank.

- **Cite sources** for any claim we didn't produce ourselves: laws, statistics, platform policies,
  third-party documentation. Link the primary source, not a blog summarising it.
- Link to official docs when telling users to do something on another platform, such as Google Sheets
  import or Shopify product CSV import.
- Plain links by default. `rel="sponsored"` for paid or affiliate links. `rel="nofollow"` only for
  sources we can't vouch for but have to mention.
- External links that leave a task flow open in a new tab and include `rel="noopener"`.
- Check external links quarterly. Fix or remove any that are dead.
- **Competitors:** name them only on comparison or alternative pages. There, keep claims factual,
  dated, linked to their own public page, and fair. Say what they do better too. Never make
  unverifiable claims about another product.

## 7. Page types: what each needs

| Page type | Must have | Must not |
|---|---|---|
| **Product / feature page** | What it does, fields it returns, a real screenshot or sample, limits, how to start | Features not in the released extension; "free" (see `personas.md`) |
| **Use-case page** (lead gen, real estate, …) | A real workflow from start to finish for that job; which sites; what the output looks like; what it can't do | Being a copy of another use-case page with nouns swapped |
| **Per-site scraper page** | Verified fields and sample for that site; site-specific notes; a screenshot from a real run; last-verified date | Sites without a tuned, verified setup; generated from the site-pack list |
| **Comparison / alternative page** | Dated, sourced, fair comparison; where the other tool is better; who should pick which | Unsourced claims; invented weaknesses; their trademarks in our logo space |
| **Blog / how-to** | Named author; first-hand steps; screenshots; links to the product page that does it | Filler intros; content unrelated to collecting or using web data |
| **Free tool** | A working tool plus an explanation of the method and inputs; states any limits | Asking for an install without saying so first |
| **Legal / scraping-ethics content** | Neutral, sourced, "not legal advice" | Telling users something is legal to scrape |

## 8. Trust and honesty (site-wide)

These repeat the `AGENTS.md` rules because they're content rules too:
- No invented proof: no user counts, ratings, testimonials or logos unless they're real and sourced.
- Sample data is clearly fake and labelled "Sample data".
- Write "Maps", never "Google Maps".
- Never market collecting candidate or personal profiles (see `personas.md`).
- If something is planned, say "coming soon". Never describe it as available.

## 9. Pre-publish checklist

Copy this into the PR description for any new page or post:

- [ ] Passes "would we publish this without search engines?"
- [ ] Adds something original (a real run, real output, a real limitation or a measurement)
- [ ] Every product claim is checked against the released extension or cloud, per `personas.md`
- [ ] Not a near-duplicate of an existing page; the search intent is unique on the site
- [ ] Self-referencing absolute canonical; final URL chosen
- [ ] One H1; H2/H3 in order; the title and meta description are unique and describe the page
- [ ] Linked from at least one existing page; links out to its hub and 2+ related pages
- [ ] Descriptive anchor text; no "click here"
- [ ] External claims cited to primary sources; sponsored links marked
- [ ] Images have useful `alt` text; screenshots are current
- [ ] Author and "Last updated" date (for guides and posts)
- [ ] Reviewed against `docs/writing-style.md` and at least two personas
- [ ] Added to the sitemap (if indexable); light and dark mode checked at 375px
