---
title: "How To Clean Scraped Data in Excel: Prices and Duplicates"
description: "Six Excel fixes for a collected table: text prices, mixed phone formats, duplicate rows, hidden spaces, split columns and a date, each with the formula."
status: draft
date: 2026-10-28
updated: 2026-11-10
version: "1.3.0"
author: vikram
feature: export-to-google-sheets
sites: []
video: ""
campaign: guide-clean-scraped-data-in-excel
# Facts checked against chrome-extension-source on 2026-11-10:
# Save prices, ratings and counts as numbers (on by default) writes columns recognised as prices, ratings or review counts as numbers in files: components/scraper/ResultsSettingsCards.tsx, lib/utils/fileNumbers.ts, DECISIONS.md D-033
# Remove duplicates setting (on by default) keeps one copy of a repeated result: components/scraper/ResultsSettingsCards.tsx
# Chat on the results page filters rows ("Email filled") and removes duplicates by a column: entrypoints/dataviewer/rowFilters.ts, entrypoints/dataviewer/useChatCommands.ts
# Edit column name on header hover: entrypoints/dataviewer/main.tsx
# Contact cells holding several values are joined with " | " in files: entrypoints/dataviewer/ContactCellValues.tsx, DECISIONS.md D-021
# Bulk contact rows carry a Source URL column: lib/content/contactExtraction.ts
# Function availability from Microsoft Support "Applies to" lists and Google's Sheets function list, read 2026-11-10: TEXTJOIN Excel 2019 and later; SEQUENCE and XLOOKUP Excel 2021 and later; TEXTSPLIT Excel 2024 and Microsoft 365; Sheets has VALUE, SUBSTITUTE, TRIM, CLEAN, TEXTJOIN, SEQUENCE, SPLIT, XLOOKUP, not TEXTSPLIT
faq:
  - q: "Why are my prices stored as text in Excel?"
    a: "The value carried a currency symbol or a thousands separator the sheet didn't recognise, so Excel kept it as text and won't sum it. Strip the symbol with SUBSTITUTE and wrap it in VALUE, or keep Save prices, ratings and counts as numbers on in the extension's Settings, which writes recognised price, rating and review-count columns as numbers in the first place."
  - q: "How do I remove duplicate rows from scraped data?"
    a: "Select the table, open Data > Remove Duplicates, and tick only the column that identifies a row, such as the product link or the website. Matching on the link rather than the name catches the same item written two ways."
  - q: "How do I make phone numbers consistent?"
    a: "Strip everything but the digits, then format them. In Excel 365, TEXTJOIN with a digit filter does the stripping in one formula; in older versions, nest SUBSTITUTE calls to remove spaces, brackets and dashes. Keep the number as text so a leading zero survives."
  - q: "Can I clean the data before I export instead?"
    a: "Much of it, yes. On the extension's results page you can rename columns and use chat to filter rows or remove duplicates, and Settings saves prices, ratings and counts as numbers, so the file needs less work. This guide covers what's left once the file is in Excel."
  - q: "Do these steps work in Google Sheets?"
    a: "Most of the formulas do. Google Sheets has VALUE, SUBSTITUTE, TRIM, CLEAN, TEXTJOIN, SEQUENCE and XLOOKUP; it has no TEXTSPLIT, so use SPLIT instead. The menu paths differ from Excel's."
---

A collected table is only as useful as the sheet you can sort, sum and send. The extension's settings and results page handle part of the clean-up before you export: duplicates, column names, and numbers in price, rating and review-count columns. What's left is the clean-up a scraped file can need once it's in Excel.

A price won't add up, phone numbers come in three formats, the same business appears twice, a space you can't see breaks a filter, and a column should be two. In this guide you fix each one in Excel with the formula and the menu path, on a sheet you exported from Web Scraper Pro. By the end you have a sheet that sums, filters and imports without surprises.

## Prerequisites

To follow this tutorial, you need:

- A spreadsheet exported from the extension: **Export as** > **Microsoft Excel** on any results page. The [lists from any website page](/list-scraper) shows how a table gets there.
- Microsoft Excel. The formulas are written for Excel 365; the notes say where an older version needs a different one. Google Sheets works too, with the differences in the FAQ.

## Do the Clean-up Before You Export, When You Can

Three of the six fixes can happen before the file exists, and that's where to do them:

- **Numbers as numbers.** In the extension's Settings, **Save prices, ratings and counts as numbers** is on by default. Columns it recognises as prices, ratings or review counts reach the file as numbers, so 129.00 sums where "$129.00" wouldn't.
- **Duplicates.** The **Remove duplicates** setting, also on by default, keeps one copy when the same result shows up twice. For a table you combined, type a request such as `Remove duplicates by Website` in the side panel's chat with the results tab in front.
- **Columns and rows.** Hover a header and click **Edit column name** to rename it. To keep only rows with an email, type `Email filled` in the chat.

![](visual:ext/results-rename-column)

Everything below is for the file once it's in Excel, or for a file someone else sent you.

## Step 1 — Turning Prices Stored as Text into Numbers

A price that sits on the left of its cell, or that SUM ignores, is text. The usual causes are a currency symbol, a thousands separator Excel doesn't expect, or a space. With the prices in column B, put this in C2 and fill it down:

```
=VALUE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(B2,"$",""),",","")," ",""))
```

`SUBSTITUTE` removes the symbol, the comma and the space; `VALUE` turns what's left into a number. For a price range such as "129.00 - 159.00", take the first number only:

```
=VALUE(TRIM(LEFT(B2,FIND("-",B2&"-")-1)))
```

Copy column C, paste it over B as values (right-click, **Paste Special**, **Values**), and delete C. Format the column as Number or Currency. For prices in a European format, where the decimal is a comma, use **Data** > **Text to Columns**, click **Advanced** on the last step, and set the decimal separator to a comma.

## Step 2 — Making Phone Numbers Consistent

Phone numbers arrive as the sites wrote them: "(555) 010-2231", "555.010.2231", "+1 555 010 2231". Reduce each to its digits, then format them the same way. In Excel 365, with the phone in column D:

```
=TEXTJOIN("",TRUE,IFERROR(MID(D2,SEQUENCE(LEN(D2)),1)*1,""))
```

This walks the text one character at a time, keeps the digits, and joins them: 5550102231. `SEQUENCE` needs Excel 2021 or later, so in Excel 2019 or earlier, nest `SUBSTITUTE` calls instead to remove spaces, brackets, dots, dashes and plus signs.

To display them in one format without losing the digits, use `TEXT`:

```
=TEXT(E2,"(000) 000-0000")
```

Keep phone columns as text when you import them anywhere. A number stored as a number drops its leading zero, which matters outside the United States. A cell holding several numbers joined by a bar, which is how contact columns with several values are written, splits in Step 4.

## Step 3 — Removing Duplicate Rows

Select the whole table and open **Data** > **Remove Duplicates**. Untick every column except the one that identifies a row: the product link, the website, or the listing link. Click **OK**, and Excel reports how many rows it removed.

Matching on the link rather than the name catches the same item written two ways ("Ridge Hiking Boots" and "Ridge Hiking Boots, Brown"). For two runs of the same search a week apart, keep both and mark what changed instead. In the new sheet, look the link up in the old one with `XLOOKUP` (Excel 2021 or later); the formula below writes "new" when the link isn't in last week's sheet.

```
=XLOOKUP(F2,'Last week'!F:F,'Last week'!B:B,"new")
```

## Step 4 — Splitting and Merging Columns

**A cell with several values.** A contact column with several emails or phones joins them in one cell with a bar: "info@example.com | sales@example.com". Select the column and open **Data** > **Text to Columns**, choose **Delimited**, tick **Other** and type `|`, and finish. Each value gets its own column; trim the spaces with the next step.

**An address in one cell.** "1420 Maple St, Springfield, IL 62704" splits on the comma the same way. In Excel for Microsoft 365 or Excel 2024, `TEXTSPLIT(G2,", ")` does it in one formula.

**Two columns that should be one.** First and last name, or street and city, join with `TEXTJOIN(" ",TRUE,H2,I2)`, which skips an empty cell rather than leaving a double space.

## Step 5 — Removing Spaces You Can't See

A filter that misses rows, or a lookup that fails on a value that looks right, can mean a stray space or a line break inside the cell. `TRIM` removes leading, trailing and doubled spaces; `CLEAN` removes line breaks and other characters that don't print. Together:

```
=TRIM(CLEAN(J2))
```

Fill it down, paste as values over the original, and the filter works. Web pages also use a non-breaking space, which `TRIM` ignores; replace it first with `SUBSTITUTE(J2,CHAR(160)," ")`.

## Step 6 — Adding a Collected-on Date and a Source

A sheet that will be compared next month, or sent to a client, needs to say when and where its rows came from. Add a column named Collected on and fill it with the collection's date, which is in **History**. Rows from a bulk contacts run already carry a **Source URL** column that says which page each row came from.

For a sheet that combines several sources, add a Source column with the site's name before you paste the tables together. Sort and filter by it later, and a row's origin is never a guess.

Here is the shape of a cleaned lead list. The column names are examples, and the businesses are made up.

Sample data:

| Business Name | Phone | Email | Website | Collected on |
|---|---|---|---|---|
| Sample Plumbing Co. | (555) 010-2231 | hello@sampleplumbing.example | sampleplumbing.example | 2026-11-10 |
| Sample Pipe & Drain | (555) 010-4410 | | samplepipe.example | 2026-11-10 |
| Sample Fix-It Plumbing | (555) 010-7782 | info@samplefixit.example | samplefixit.example | 2026-11-10 |

## When It Goes Wrong

**VALUE returns #VALUE!.** Something other than digits, a point and a minus is still in the cell: a letter, a second price, a footnote mark. Look at the cell with `CODE(MID(B2,n,1))` to find the character, and add a `SUBSTITUTE` for it.

**Remove Duplicates removed too much.** It matched on a column that isn't unique, such as the price. Undo, open it again, and tick only the link or website column.

**The phone formula says #NAME?.** `TEXTJOIN` or `SEQUENCE` isn't in your version of Excel. `TEXTJOIN` needs Excel 2019 or later and `SEQUENCE` Excel 2021 or later. Use nested `SUBSTITUTE` calls, or do the clean-up in Google Sheets, which has both.

**Leading zeros vanished.** The column was formatted as Number. Format it as Text before you paste, or prefix the formula's result with an apostrophe.

## Conclusion

You turned text prices into numbers, made the phone numbers consistent, removed duplicate rows, split and merged columns, cleared the spaces you couldn't see, and dated the sheet. Part of this is done before you export, by the extension's settings and the results page. See [how to get data from a website into Google Sheets or Excel](/export-to-google-sheets) for everything it can do to a table. [How To Copy a Table from a Website into Google Sheets](/guides/copy-a-table-from-a-website) covers the case where the table itself is the problem.
