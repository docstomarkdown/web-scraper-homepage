---
title: "How To Download All Images on a Page with Web Scraper Pro"
description: "Save every image on a web page as one ZIP file in three clicks. Images are grouped by their size, so you take the photos and leave the icons behind."
status: draft
date: 2026-10-21
updated: 2026-10-21
version: "1.3.0"
author: vikram
feature: image-downloader
sites: []
video: ""
campaign: guide-download-all-images-on-a-page
faq:
  - q: "Does it get the full-size images?"
    a: "It saves each image at the size the page serves it. A listing page often serves a smaller version and the product page the full one, so collect on the product page when size matters."
  - q: "Why are some images missing?"
    a: "Icons, logos, sprites and tracking pixels are left out on purpose, and an image that appears many times is kept once. Images that only load further down the page appear after you scroll there and click Rescan."
  - q: "How big can the download be?"
    a: "There's no limit on the page. A ZIP holds up to 5,000 files; a bigger collection is split into part-1, part-2 and so on."
  - q: "Can I download the images from many pages at once?"
    a: "One page at a time from the Images tab. For every product image in a Shopify store, use the Shopify store export, which downloads the whole catalog's images."
---

Save every image on a web page as one ZIP file in three clicks. The Images tab finds the images, groups them by size with a count for each group, and downloads a group or all of them at once. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Prerequisites

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- A page with the images you want: a product gallery, a portfolio, a listing page.
- The right to reuse them. Images belong to whoever published them; check the site's terms first.

## Step 1 — Opening the Images tab

Open the page, scroll once to the bottom so images that load on scroll are on the page, and scroll back up. Click the Web Scraper Pro icon in the toolbar and open the **Images** tab. It shows one button, **Collect images from this page**, and the note **We'll sort them by size for download**.

![](visual:ext/images-tab)

## Step 2 — Collecting the images

Click **Collect images from this page**. The panel reads **Looking for images…** for a moment, then lists the images in groups.

Each group is one image size, such as **800 × 800**, with its count, **12 images**, and a preview of the first eight; **Show 4 more** opens the rest. Groups are sorted largest first, so the product photos sit at the top and the thumbnails and badges at the bottom.

![](visual:ext/images-tab-groups)

Icons, logos, sprites and tracking pixels are left out, and an image that appears several times on the page is kept once. The collection is also saved in **History**, so you can come back to it.

## Step 3 — Downloading

Click **Download** on a group for only that size, or **Download all** at the top for every image. The ZIP file saves to your Downloads folder, named after the site, such as `store.example-images.zip`. A download of more than 5,000 files is split into `…-part-1.zip`, `…-part-2.zip` and so on.

If the page changed, or you scrolled further and more images loaded, click **Rescan** to collect again.

## Conclusion

You saved every image on a page as one ZIP, choosing the sizes you wanted. For the images of a whole product catalog, open the store in the side panel and use the Shopify store export, which downloads every product's images with the product data. For the product details that go with a gallery, see the product details feature page.
