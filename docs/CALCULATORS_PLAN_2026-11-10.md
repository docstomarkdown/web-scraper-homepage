# Seller calculators: review and plan (2026-11-10)

All 60 tools under `app/tools/` (42 in `(sai)`, 18 in `(madhu)`, shared kit in `_shared/`), reviewed three ways: every
formula read and checked against its definition, every hard-coded marketplace rate checked against the official fee
page where it's public, and the pages used in the browser at 1280 px and 375 px in both themes. Nothing has been
changed yet. Whether the calculators stay on this site at all is the owner's decision (`docs/SPAM_REVIEW_2026-11-10.md`, item 1);
this plan is what keeping them takes.

## Where they stand

| | Count | What it means for a reader |
|---|---|---|
| Wrong answer | 11 | A confident number that's wrong: outdated fees, ignored inputs, invalid barcodes |
| The page promises something the tool doesn't do | 14 | Reader looks for a figure that isn't there |
| Worked example doesn't match the tool | 8 | Reader tries the example and gets a different number |
| Edge cases | most | Negative, zero, over-100% values go into the maths; some show "0.00%" or a verdict on a blank form |
| Formula right, page fine | about 20 | Needs only the shared UI fixes |

**Wrong answers (fix first):**

| Tool | Problem | Source |
|---|---|---|
| gtin-converter | Drops leading digits to "convert" EAN-13 and GTIN-14, producing GTIN-12 and GTIN-8 codes that fail their check digit | `Converter.tsx:135-137` |
| mercari-fee | Charges the 2.9% + $0.50 processing fee Mercari dropped on 6 Jan 2025; doesn't apply the 10% to buyer-paid shipping | mercari.com help 169 |
| paypal-fee | 2.9% + $0.30 and older tiers; current US rates are 3.49% + $0.49 (checkout), 2.99% + $0.49 (cards) and so on | paypal.com business fees |
| ebay-fee | 13.25% and $0.30; eBay now lists 13.6% and $0.40 on orders over $10 | ebay.com help 4822 |
| amazon-fba-fee | Badged "2026 Rates" but not: flat small-standard fee, invented price bands, no dimensional weight, Beauty and Baby at 8% not 15%, no 3.5% fuel surcharge, other currencies fall back to US rates | sell.amazon.com; rate card is behind Seller Central |
| amazon-storage-fee | $0.87/ft³ (current $0.78) and a flat $1.50 aged surcharge instead of the tiers; the FBA tool uses $0.89 for the same thing | as above |
| time-zone-meeting-planner | Ignores the date picked, so meetings across a daylight-saving change are an hour out; one zone per country | `TimeZonePlanner.tsx:136-174` |
| free-shipping | The threshold input never reaches the maths; "Feasible +0%" on a blank form | `FreeShippingCalculator.tsx:31,46` |
| pallet-configuration | In cm mode the 72 stack-height default becomes 72 cm, and inch heights are labelled cm | `_C:53,103,551` |
| fba-removal-order | Says "HOLD, both lose" when removal is the smaller loss, against its own guide | `:76-79` |
| container-load | 40HC payload 28,600 kg (published about 26,700); custom container always shows 0% used | `_C:50,224` |

**Promised but missing** (build it or take the words out): ROAS and break-even ACoS on the ACoS tool; LTV:CAC on CLV; net
"what's left" on FBA; lift value on conversion rate; customer-worth comparison on CAC; the metric divisors on
dimensional weight (unreachable code); feet, metres and volume on the dimension converter; GTIN-14 and CSV download on
the UPC/EAN validator; "headroom before the next price step" on the weight converter; MOQ cost on EOQ; cities and
daylight saving on the time-zone planner; quantity effect on wholesale price; "unique codes" on the promo generator (it
uses `Math.random` with no de-duplication); camera scanning (only photo upload exists).

**Examples that don't match:** container 385 vs 392 cartons; email ROI 100% vs 50%; UPC weighted sum 48 vs 58 and a
sample "invalid" code that's valid; Mercari $23.05 vs $25.00; PayPal $103.40 vs $103.30; CLV $288 vs $228 on screen;
discount "15 points" vs 20%; dropshipping "returns pay shipping twice" vs once in the code.

## What's different from the rest of the site

| Area | Calculators today | The new site |
|---|---|---|
| Text before scripts | `FadeIn` starts every block at opacity 0 (121 files); the page sat washed out until it scrolled into view | `Reveal` slides without fading: text is in the server HTML |
| Motion | framer-motion and `motion/react` both, in 22 files; 3 respect reduced motion | One library, reduced motion always respected |
| Focus | The first input takes focus on load, so a phone opens its keyboard before the reader sees the page | Nothing takes focus on its own |
| Colour | Brand blue plus emerald, amber, violet, rose and red on facts and categories | Brand blue, mint accents; colour only for good and bad states |
| Copy | Title-case h1 repeated as the card title; verdicts with exclamation marks ("Excellent Return!"); "Free" in all 60 titles | Search-phrase h1 in sentence case, said once; no exclamation marks; "Free" only where it's the search |
| Validation | `min`/`max` passed to the input only; nothing clamps or explains; verdicts show on a blank form | Every state opens with what the reader can do |
| Proof | No fee page says when its rates were checked | Every fact names its source and date |
| Link to the product | None of the 60 links to the extension feature it relates to | Each page links the page that does the next step |

## Plan

**Phase 0: stop the wrong answers (first, small).** Fix the 11 tools in the table above, or take each off the
listing until it's fixed. Put the fee rates for Mercari, PayPal, eBay, Etsy, Poshmark and Amazon in one data file,
each with its source URL and the date it was checked, and show "Rates checked on 10 November 2026" with the link on
every fee page.

**Phase 1: the shared kit (once, fixes all 60).**
- `CalculatorInput`: clamp to `min`/`max`, refuse negatives where they make no sense, show a one-line message under the
  field ("Enter an amount above 0"), and no verdict until the required fields are filled.
- Remove the auto-focus. `FadeIn` becomes the site's `Reveal` (no opacity) and respects reduced motion; drop the
  second animation library.
- `Counter`: keep decimals for units and rates; money to 2 places. Badge thresholds in the chosen currency or as ratios.
- Colours to the brand tokens; green, amber and red only for good, warning and bad.
- Page shell: one h1 (the search phrase, sentence case), no repeated card title, the answer line first, then the
  calculator, how it's worked out, the FAQ, and one link to the related product page.

**Phase 2: make every page true.** For each item under "Promised but missing", build it when it's small (ROAS and
break-even ACoS, LTV:CAC, net profit on FBA) and cut the words otherwise. Fix the 8 examples. Verdict copy without
exclamation marks. "Free" out of the titles.

**Phase 3: fewer, better tools.** Merge the overlaps into one page each, keeping the better search phrase and a 301 from
the other:

| Merge | Into |
|---|---|
| reorder-point + inventory-reorder (+ safety-stock as a section) | Reorder point |
| inventory-turnover + days-of-inventory | Inventory turnover |
| acos + return-on-ad-spend + tacos | ACoS and ROAS |
| cpa + customer-acquisition-cost | Customer acquisition cost |
| gross-margin + profit-margin (+ net-profit as a mode) | Profit margin |
| cubic-feet + dimension-converter | Box dimensions and volume |

Retire what isn't a seller's numbers job: time-zone-meeting-planner, and the promo-code and SKU generators unless they
become trustworthy (unique, crypto random, de-duplicated). That takes 60 pages to about 45.

**Phase 4: keep them right.**
- A unit test per formula that runs the page's own worked example, so an example can't drift from the tool again.
- The rates file gets a re-check every quarter, and the refresh queue flags a fee page whose check date is over 90 days old.

## Also noted
- The barcode "scanner" is photo upload only; the camera code is unused and has bugs. Say "upload a photo of the label".
- Landed cost charges duty on goods value only; the EU, UK and India charge it on goods plus freight and insurance.
- Several "status" bands contradict their own FAQ (return rate: "High Risk" above 15%, FAQ: 20% is normal for clothing).
