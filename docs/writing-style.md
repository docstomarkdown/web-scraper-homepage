# Writing style

**The writing rules for webscraper.pro now live in the Thinksolv writing system**
(`thinksolv-writing-system`, beside this repo): the house standards (`standards/house.md`), the format playbooks
(`standards/formats/`), this site's profile (`sites/web-scraper/profile.md`) and the product's facts. With the writing
tools installed, `get_learnings` for `web-scraper` gives them compiled for the step you're on; `editor rules web-scraper
--format how-to` prints them. They are binding, here as for every site. Change a rule there, once, not here.

The section numbers below are kept because the site's code cites them. §8 and §11 are about this site's pages and stay
here; the rest moved on 5 November 2026.

## 1. The four principles
Moved: the house standards ("The reader", "Honesty", "Voice") and the how-to playbook.

## 2. Structure
Moved: the how-to playbook and this site's profile ("Shape": DigitalOcean's tutorial shape, `Step N — Gerund` headings,
titles without the brand).

## 3. Headings
Moved: this site's profile ("Shape").

## 4. Formatting
Moved: the house standards ("Formatting").

## 5. Images
Moved: the house standards ("Images") and this site's profile (captions).

## 6. Terminology
Moved: this site's profile ("Words") — the site word list, UI names, Google Maps — and the house standards (sample data,
other products' names).

## 7. Mechanics
Moved: the house standards ("Voice") and this site's profile (American English, the Oxford comma, title case).

## 8. Marketing pages (homepage, product, use-case, per-site pages)

DigitalOcean's guide is written for tutorials. On marketing pages, keep its principles (plain words,
reader-first, no hype, explain why, honest limits) but not its tutorial scaffolding:
- **Answer first:** every section opens with the outcome in one sentence, then the detail.
- **Describe each feature with what it returns** (the fields) and what it's for. A bare label isn't
  enough.
- **Show, don't claim:** a sample row or a screenshot beats an adjective.
- **Link each marketing page to the tutorial** that walks through the task step by step.

## 9. Writing with AI
Moved: the house standards ("Honesty", and the AI tells under "Voice").

## 10. Editing pass
Moved: the how-to playbook ("Before it's done") and the house standards; the writing system's checks and its Spider run
the searches.

## 11. Readability for everyone (added 2026-10-21)

Pages are read by first-time, non-technical and older visitors on laptops and phones. These rules are
checked on every page, light and dark, before it's published.

**Type sizes (rendered, not the class name):**

| Text | Minimum | Class |
|---|---|---|
| Reading text: paragraphs, step bodies, FAQ answers, list items | 18px, line-height 1.65 | `text-lg leading-[1.65]` |
| Secondary text: captions, dates, breadcrumbs, table cells | 16px | `text-base` |
| Labels inside controls: badges, chips | 12px, never smaller | `text-xs` |
| Headings | H1 36–48px, H2 30px, H3 20px | `text-3xl` for H2, `text-xl` for H3 |

Never `text-[10px]`, `text-[11px]`, `text-[13px]` or `text-[15px]` for anything a person reads.

**Line length:** reading text sits in one column of about 85 characters at most (`max-w-[56rem]` at
18px on use-case pages, `max-w-[52rem]` for articles beside a sidebar). Narrower columns read as
cramped on wide screens; wider ones tire the eye.

**Ink (contrast):** reading text is `text-slate-700` on white and `text-slate-200` on dark; secondary
text `text-slate-600` / `text-slate-300`. `text-slate-500` and `text-slate-400` are for disabled or
decorative text only, never for something to read. Icons that carry meaning (a step number, a
"won't do" mark) sit on a filled circle so they pass 3:1. Links are `#1f5ec2` on light and `#7aa7ff`
on dark, underlined on hover, and the link text says where it goes.

**Shape of a step:** one bold line that says what to do, then two or three short sentences, then
bullets for the specifics (an example to type, a number, a thing to watch for). Never a 50-word
paragraph.

**Words:** say "the panel that opens on the right", "type a sentence", "save the file". Explain a
term the first time it appears on the page (side panel, results page, History). Avoid "export",
"configure", "CRM", "niche" and other trade words where a plain one exists.

**Checks before publishing:** read the page at 125% zoom and at 375px wide; every paragraph still
fits and nothing scrolls sideways. Read the "won't do" list as the persona: it should be the first
thing they'd ask.
