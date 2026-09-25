# Writing style

This is how we write on webscraper.pro. It's based on **DigitalOcean's technical writing guidelines**
(https://www.digitalocean.com/community/tutorials/digitalocean-s-technical-writing-guidelines), adapted
for a Chrome extension instead of servers and command lines. When this file doesn't cover something,
follow the DigitalOcean guide.

Quality and SEO rules are in `docs/content-standards.md`. The readers are described in
`docs/personas.md`.

## 1. The four principles

Every tutorial, guide and product page must be:

1. **Comprehensive and written for all experience levels.**
   - Assume nothing about the reader. Start from "the extension isn't installed yet", or link a
     prerequisite that covers it.
   - Explain *why* as well as *what*, so readers understand the idea and don't just copy clicks.
   - Don't use *simple, simply, straightforward, easy, easily, obviously, just* or *of course*. They
     make anyone who gets stuck feel stupid. Encourage the reader with clear explanations instead.

2. **Technically detailed and correct.**
   - Every step says what to do, what it does and why.
   - Every setting or option the reader touches is explained.
   - **Test every tutorial by following it exactly as written, from a fresh install, before
     publishing.** An editor repeats the test in review. Record the date and extension version you
     tested (see `content-standards.md` §2).

3. **Practical, useful and self-contained.**
   - At the end, the reader has a real result: a spreadsheet, an export, a working setup.
   - Link to our own pages for prerequisites and background. Only send readers to another site when we
     have nothing on it and a short summary won't do. When you do, link the official docs.

4. **Friendly but formal.**
   - No jargon, memes, slang, emoji or jokes. The audience is global and many readers use English as a
     second language.
   - Never write "I". Write "you" for the reader and, occasionally, "we" for the company.
   - Describe the outcome, not the lesson: write "In this tutorial, you'll collect every listing from a
     Zillow search", not "You'll learn how to use the extension on Zillow".
   - Use inclusive language. Don't reference anyone's age, disability, ethnicity, gender, experience
     level, nationality, appearance, religion, politics, orientation or technology choices.

## 2. Structure

### Procedural tutorial (the default for how-tos)

```
# How To <Accomplish a Goal> with Web Scraper Pro        ← H1 title
Introduction (1–3 paragraphs, no heading on our site)
## Prerequisites
## Step 1 — Opening the Search Results
## Step 2 — Collecting Every Page of Listings
## Step n — Exporting to Google Sheets
## Conclusion
```

### Conceptual article (explainers, "what is…", comparisons)

Title, introduction, optional prerequisites, one H2 per subtopic, then a conclusion.

### Short task article (a single small answer)

Title, a short introduction, optional prerequisites, the body, then a concluding paragraph.

Our site allows only one H1 per page, so the introduction has no heading (DigitalOcean gives it an H3).

### Title
- **Name the goal, not only the tool:** "How To Build a Lead List of Local Plumbers with Web Scraper
  Pro", not "How To Use Web Scraper Pro on Maps".
- Keep it under 60 characters where possible.
- Use title case.

### Introduction
Answer these four questions:
1. What is this about, and what's involved?
2. Why should the reader do it? What's the practical benefit?
3. What exactly will they do?
4. What will they have, or be able to do, when they're finished?

Focus on the reader's problem, like a lead list or a price sheet, not on the technology.

### Prerequisites
- Write it as a checklist starting "To follow this tutorial, you need:".
- Each item links to one of our pages, or to official docs if we don't have one.
- Be specific. "Familiarity with spreadsheets" is too vague. Name the exact thing and link a resource.
- Typical items: Chrome (or another Chromium browser), the extension installed, a Google account for
  Sheets export, or signing in to the site if the data is behind a login.

### Steps
- Headings follow the pattern `Step N — <Gerund Phrase>`, with an em dash and title case. For example:
  "Step 2 — Collecting Every Page of Results".
- Open each step with a sentence saying what the reader will do and how it serves the goal.
- One action per instruction. Say where the action happens before the action itself: "In the side
  panel, click **Collect**."
- Put what the reader should see next in its own sentence, or in a screenshot.
- **Close each step with a transition:** what they just did, what's next, and why the two connect.
  Vary the wording so it doesn't repeat the step title.

### Conclusion
- Summarise what the reader did ("you collected…", "you exported…"). Don't write "we learned".
- Say what they can do next: related use cases, our related tutorials, the relevant product page.

## 3. Headings

- The title is H1. Prerequisites, steps and the conclusion are H2s.
- Use H3 sparingly, and only when there are at least two under the same H2. Otherwise, split into
  more steps.
- Avoid H4.
- Use title case in articles and tutorials (DigitalOcean style).
- Marketing pages keep their own component headings and use sentence case, as the homepage does now.

## 4. Formatting

**Bold** is for:
- Text visible in the UI: click **Collect contacts**, open **Settings**. Match the product's
  capitalisation exactly.
- Term lists (a bold term followed by its definition).
- A change of context: "Now switch to **the Data Viewer** tab."

*Italics* are only for introducing a new term, once: "The extension groups repeated items into a
*list*."

Use `inline code` for:
- File names and formats: `leads.csv`, `.xlsx`.
- Example URLs: `https://your_store.myshopify.com`.
- Field and column names: `price`, `compare_at_price`.
- Key presses, in capitals: `ENTER`, `CTRL+C` (write `CMD+C` for Mac too when it matters).

Use **code blocks** for:
- Anything the reader copies: a chat prompt, a URL list for bulk runs, an MCP config, an API call.
- Output, labelled "Output" or "Sample data", kept separate from the input with a sentence explaining
  it.
- Label a block with its file name when it's a file's contents.
- Show only the part that matters and mark omissions with `. . .`.

Every code block, config snippet or prompt is introduced by a sentence saying what it does. A
sentence after it explains the important parts.

**Placeholders:** use `your_domain`, `your_store`, `your_api_key`, and say that readers should
replace them. Highlight them where the component supports it. Never write "highlighted in yellow" or
"on the right". Refer to "the highlighted value" or "the preceding screenshot" instead.

**Notes and warnings:**
- **Note:** is for useful side information.
- **Warning:** is for data loss, account risk or cost.
- Use them sparingly.

## 5. Images

- Use screenshots for the UI (side panel, Data Viewer, results) and diagrams for flows.
- **Never use screenshots of text the reader might copy**, like prompts, URL lists, code or output.
  Put those in code blocks.
- Every image needs:
  - Descriptive alt text for screen readers ("Side panel showing 48 collected listings with price,
    address and beds columns").
  - A short caption tying it to the step.
- Use PNG. Crop tight and keep images as short in height as possible.
- Take screenshots from the current **released** extension, in the default theme, with no personal
  data. Retake them when the UI changes.

## 6. Terminology

- **Product and UI names:** spell them exactly as the product does: Web Scraper Pro, **Collect**,
  **Collect contacts**, Data Viewer, Browser Relay.
- **Third-party software:** use the official capitalisation (Google Sheets, Shopify, Microsoft
  Excel). Link its official home page the first time you mention it.
- **Example values:**
  - Business names: generic, like "Sample Plumbing Co."
  - Phones: 555 numbers.
  - Emails: `name@example.com`.
  - Domains: `your_domain` when the reader must change it, `example.com` otherwise.
  - IPs: 203.0.113.0/24.
  - Label all sample output "Sample data".

**Site word list.** These add to DigitalOcean's list and win if the two conflict.

| Use | Avoid | Why |
|---|---|---|
| collect, get, export | scrape, harvest, extract (in running text) | Plainer. "Scrape" is fine in titles and metadata, where people search for it. |
| every page of results | pagination, paginate | Jargon |
| named columns, a spreadsheet | structured data, JSON-first | Say what the reader gets |
| Maps, Maps leads | Google Maps | Trademark |
| Web Scraper Pro, the extension | the tool, our solution, the platform | Be specific |
| sign in | log in, login (as a verb) | Consistency |
| coming soon | in beta, launching (unless true) | Matches the product facts |
| — | revolutionary, seamless, powerful, cutting-edge, unleash, supercharge, effortless, game-changing, robust, leverage | Hype. Show a number or a screenshot instead. |

## 7. Mechanics

- American English on the site (US audience), with the Oxford comma. These repo docs are the
  exception.
- Active voice and present tense for UI behaviour: "The table fills in as each page loads."
- Keep sentences under about 25 words, with one idea per paragraph.
- Use numerals for counts and measurements ("3 pages", "200 URLs").
- In prose, write dates as "25 September 2026". Use ISO in metadata.
- No exclamation marks, all caps or bold for emphasis in running text.

## 8. Marketing pages (homepage, product, use-case, per-site pages)

DigitalOcean's guide is written for tutorials. On marketing pages, keep its principles (plain words,
reader-first, no hype, explain why, honest limits) but not its tutorial scaffolding:
- **Answer first:** every section opens with the outcome in one sentence, then the detail.
- **Describe each feature with what it returns** (the fields) and what it's for. A bare label isn't
  enough.
- **Show, don't claim:** a sample row or a screenshot beats an adjective.
- **Link each marketing page to the tutorial** that walks through the task step by step.

## 9. Writing with AI

AI drafts are fine. Unreviewed AI drafts are not.
- A person who has run the task in the extension tests the tutorial as written (principle 2) and
  fact-checks every claim against `personas.md`.
- Strip AI tells:
  - "Whether you're X or Y…" openers.
  - "It's important to note that".
  - Padded groups of three ("fast, reliable, and scalable").
  - Conclusions that just repeat the introduction.
  - Chains of em dashes in prose. The em dash in step headings is fine.

## 10. Editing pass

1. Walk through the tutorial from a fresh install, exactly as written. Fix every gap.
2. Check the introduction answers its four questions, and that the conclusion delivers what the
   introduction promised.
3. Check every step has an opening sentence, the what and the why, and a closing transition.
4. Search for the banned words: simple, simply, easy, easily, just, obviously, straightforward, of
   course, and the hype list.
5. Check every UI label against the released product.
6. Cut 10–20% of the words.
