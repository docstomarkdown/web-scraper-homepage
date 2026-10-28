---
title: "How To Scrape Amazon Reviews into Excel, Free"
description: "Collect every review of an Amazon product into a spreadsheet with rating, title, text, author and date, from the page open in your own browser. No code."
status: draft
date: 2026-10-21
updated: 2026-10-21
version: "1.3.0"
author: vikram
feature: product-scraper
sites: [amazon]
video: ""
campaign: guide-scrape-amazon-reviews-to-excel
faq:
  - q: "How do I scrape Amazon reviews for free?"
    a: "Open the product page in Chrome, open the side panel's Properties tab, click Collect details on this page, then View all reviews. The reviews land in their own table and export to Excel, CSV or JSON. Web Scraper Pro is free, with no paid plan."
  - q: "Why does my Amazon review scraper return an empty page?"
    a: "Amazon shows review pages only to signed-in shoppers, so a script that fetches the page from outside a browser gets a page with no reviews. The extension reads the reviews in the browser you're signed in to, so it sees what you see."
  - q: "Can I get all the reviews, not only the first page?"
    a: "All that Amazon shows. The extension pages through the review list until Amazon has no more to show, or until you click Stop. Amazon limits how many review pages it shows for one product, and that limit applies to the collection too."
  - q: "Can I scrape reviews for many Amazon products at once?"
    a: "Reviews are collected one product at a time. For the products' prices and details across many pages, paste the product addresses into Bulk scrape instead."
  - q: "Which columns does the reviews table have?"
    a: "Rating, title, text, author and date for each review. The product's own details, such as price and seller, are in a separate table."
  - q: "Is scraping Amazon reviews allowed?"
    a: "The reviews are public, but Amazon's terms restrict automated collection, and the reviews belong to their writers. Collect for your own research, don't republish them, and read our plain-words explainer on web scraping and the law. It isn't legal advice."
---

<!--
Draft until these are checked in a real run on 1.3.0 and the screenshots exist:
- Amazon's cap on review pages per product (the step says "Amazon limits how many review pages it shows"; put the number in once a run confirms it).
- Whether View all reviews pages through Amazon's reviews by scrolling or by a mapped Next button, and whether the sort and filter chosen on the page (Most recent, 3 stars) carry into the collection.
- The exact column names of the reviews table (the product-scraper facts say rating, title, text, author and date).
- New capture ids used below: ext/properties-product-fields, ext/results-reviews.
-->

Amazon shows a product's reviews only to shoppers who are signed in, so a script that fetches the page from outside a browser gets a page with no reviews on it. Web Scraper Pro reads the reviews from the product page you have open, in the browser you're already signed in to, and pages through the review list into a table you can export to Excel. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Does Amazon Allow Scraping?

The reviews are public, and you collect them from the page you can see, at a person's pace, in your own browser. Amazon's terms restrict automated collection, and the review text belongs to the people who wrote it, so collect for your own research and don't republish it. Our page [Is web scraping legal?](/web-scraping-legal) explains the rules in plain words; it isn't legal advice.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- An Amazon product page, on any of Amazon's country stores. Sign in to Amazon in the same browser first, so the review pages show.

## What You Get

Each review becomes one row. The product's own details come out as a separate table, so you can keep the two apart.

| Column | Example |
|---|---|
| Rating | 3 |
| Title | Good shoe, laces too short |
| Text | Comfortable from the first run, but the laces barely reach a double knot… |
| Author | Jordan P. |
| Date | 12 September 2026 |

## Step 1 — Opening the Product Page

Go to the product on Amazon in Chrome, signed in as you normally are. Click the Web Scraper Pro icon and open the **Properties** tab. It shows **Collect details on this page**, which reads the product's standard fields, and the reviews come with them.

If you only want reviews of one kind, set that on the page first: sort the reviews by **Most recent**, or filter them to **3 star** to read the mixed ones. The extension collects the review list as the page shows it.

![](visual:ext/properties-collect-contacts)

The product page is open and the panel knows what it is. Next, you collect its fields, which is where the review list is read from.

## Step 2 — Collecting the Product and Its Reviews

In the **Properties** tab, click **Collect details on this page**. The product's fields fill in: title, brand, current price, list price, discount, rating, review count, availability, seller, selected variant, offers and images. Click **View product data** to check them.

Then click **View all reviews**. The extension pages through the review list, by scrolling or by the next button, until Amazon has no more to show or until you click **Stop**. The reviews land in their own table with rating, title, text, author and date.

![](visual:ext/properties-product-fields)

Amazon limits how many review pages it shows for one product, and that limit applies here too. For a product with thousands of reviews, collect once sorted by **Most recent** and once filtered by star rating to read more of them.

## Step 3 — Reading the Reviews Table

The results page opens with one row per review. Click the **Rating** header to sort, or click **Filter rows** and keep rows rated 3 to read what buyers liked and disliked in the same breath.

With the results tab in front, you can also type in the side panel's chat:

```
Only rating, title and text, rows rated 3 or lower, newest first
```

![](visual:ext/results-reviews)

Three-star reviews are where feature requests hide: the buyer kept the product and still wrote down what was missing. Sort them to the top before you export.

## Step 4 — Exporting to Excel

Click **Export as** and choose **Microsoft Excel**, **CSV** or **JSON**. Ratings are saved as numbers, so the sheet sorts and averages them without clean-up. The product's details export separately from the same results page, and both are saved in History.

![](visual:ext/results-export-menu)

The file after export looks like this. Sample data: the product and the reviewers are made up.

| Rating | Title | Text | Author | Date |
|---|---|---|---|---|
| 5 | Best trail shoe I've owned | Light, grippy, dry after a creek crossing… | Sam K. | 14 October 2026 |
| 3 | Good shoe, laces too short | Comfortable from the first run, but the laces… | Jordan P. | 12 September 2026 |
| 2 | Runs half a size small | Returned for the next size up; the second pair… | Priya R. | 30 August 2026 |

## When It Goes Wrong

**View all reviews collects only the first page.** Amazon shows the review pages after a **See more reviews** click. Point the extension at that button once when it asks, and it pages through on its own.

**The review table is empty.** You're not signed in to Amazon in this browser. Sign in, reload the product page, and collect again.

**Amazon showed a verification page.** Complete it in the tab and collect again. Collect fewer products in a row if it keeps happening.

**The reviews stop at about a hundred.** Amazon caps the review pages it shows for one product. Collect again with a different sort or star filter to read a different hundred.

## Conclusion

You collected a product's reviews into a spreadsheet with rating, title, text, author and date, sorted so the mixed reviews come first. For the product's price, seller and variants across many products, see How To Get Prices from a List of Product URLs in One Run. For every product in a search, see How To Scrape Amazon Product Listings into Excel.
