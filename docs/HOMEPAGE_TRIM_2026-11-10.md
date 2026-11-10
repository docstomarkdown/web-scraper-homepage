# Homepage trim plan (2026-11-10)

Reviewed in the browser at 1280 px and 375 px. Not built yet; each change waits for the owner's OK.

**Now:** 9 sections, 1,370 words, 9,800 px tall on a desktop and 15,900 px on a phone (about 20 phone screens).
**Target:** 6 sections, about 700 words, under 9,000 px on a phone. One job for the page: show that any page becomes a
table, show which sites are ready-made, and get the install.

## What repeats today
- The same 14 kinds of data appear three times: the hero's chips, "The data you need" (6 cards and 7 more), and "Tuned
  for the sites you already use".
- "Every page", "named columns" and "export to Excel, CSV, JSON or Sheets" each appear in 3 or 4 sections.
- "Free, no paid plan" is in the hero, step 1, two FAQ answers and the closing call to action.
- Two sections are about things that don't exist yet (Cloud) or aren't the main job (Shopify, Developers was cut already).

## Section by section

| # | Section | Now | Change | Why |
|---|---|---|---|---|
| 1 | Hero | 14 category chips; the demo cycles to the next chip before its table appears | **Keep, fix.** 5 chips (Products and prices, Property listings, Business directories, Shopify stores, Any list). The demo shows the finished table for at least 4 seconds before it moves on | The table is the payoff, and it never shows. 14 chips is a menu, not an example |
| 2 | The data you need, in named columns | 6 large cards plus a 7-card "More you can collect" grid; 3,800 px on a phone | **Cut to 4 cards:** any list (with every page), product prices and reviews, directories with emails (merge the Business directory and Emails cards), property listings. Drop the Job posts card and the whole "More you can collect" grid. Keep the one Maps line | The longest section on the page. The extra kinds are in the Product and Sites menus already. The jobs use case was dropped (no verified job board) |
| 3 | Export any Shopify store's full catalog | A full section with 6 tiles and a demo card | **Fold into section 2** as a fifth card ("Shopify stores: the whole catalog, variants and an import CSV") linking `/shopify-scraper` | One feature for one persona gets a full screen; the feature page carries the detail |
| 4 | From web page to spreadsheet in three steps | 3 steps | **Keep.** Take "It's free, with no paid plan and no account" out of step 1 | Short and clear; the free line is said elsewhere |
| 5 | Tuned for the sites you already use | 30 site chips in 8 rows; 1,100 px | **Shrink to one strip** under section 2: "Ready-made for Amazon, eBay, Walmart, Etsy, Zillow, Rightmove, Yellow Pages, Booking.com, Scholar and YouTube, and any list on any other site", linking `/scrapers` | The Sites menu and `/scrapers` hold the full list. A strip says the same thing in one line |
| 6 | What's handled for you | 6 tiles | **Cut to 3 tiles** that say something new: works on pages you're signed in to, hundreds of URLs at once, tidy up before you export. Or merge them into section 4 as one line each | "Every page", "named columns" and "export anywhere" repeat sections 2 and 4 |
| 7 | Bigger jobs? Run them in the cloud | Coming-soon section with a fake batch card | **Cut.** Keep the FAQ "What's the difference between the extension and the cloud?" and the Product menu entry | A full section for something that doesn't exist yet, on a page meant to get an install today |
| 8 | Questions, answered | 13 questions in 4 groups | **Cut to 7:** Is it free? (one sentence), Do I need an account? ("No."), Which websites does it work on?, Can I get emails for a list of businesses?, Can I use it on sites I log in to?, Will websites block me?, Is web scraping legal? Move the two Shopify questions to `/shopify-scraper`; drop "check prices every day" and "do I need to code" (the hero answers it); keep at most one cloud question | Each answer should be a question people ask before installing |
| 9 | Turn your next web page into a spreadsheet | Closing call to action | **Keep** | |

## Also seen
- The header's Use cases menu: all seven use-case pages are `planned`, so in production it has nothing to show. Publish
  them or take the menu out until they are.
- "Hundreds of URLs at once" says hundreds; the bulk page says paste or upload a list. Check the number before it stays.
