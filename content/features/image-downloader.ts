import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Facts checked against release 1.3.0 (branch test-branch-1) on 2026-10-20:
// - Images tab "Collect images from this page", images grouped by size, "Download all" or "Download" per group as a
//   ZIP, real sizes and clean ZIPs since 1.3.0: components/scraper/ImagesTab.tsx, git log 2026-10-05..20
// - The rescan button is labelled "Find images again" (ImagesTab.tsx, 2026-10-21); ZIP files are named
//   all-images-<timestamp>.zip for Download all and images-<size>-<timestamp>.zip for one group, with files
//   image_1.jpg, image_2.jpg… inside (ImagesTab.tsx). Verify in a run: the earlier "named after the site" wording and
//   the 5,000-file split were not found in the code read on 2026-10-21.
// - Product image galleries in product details; Shopify image ZIPs of up to 5,000 named by handle: lib/pdp/,
//   lib/shopifyMode/
// Title and headings target what people type ("how to download all images from a website", "... full size",
// "... chrome extension"): youtube-research/AUTOSUGGEST.md and SEARCH_QUERIES.md, 2026-10-21. The images guide owns
// "download all images from a web page at once"; this page owns "download all images from a website at full size".
// Deepened 2026-10-21 from the sources above; nothing added that isn't in them.

export const imageDownloader: FeaturePageContent = {
    page: getPage("image-downloader"),
    meta: {
        title: "How to Download All Images from a Website at Full Size, Free",
        description:
            "Open a page, click once, and save every image on it as one ZIP file at the size the page serves. Images are grouped by size, so you take the photos and leave the icons. Free Chrome extension.",
    },
    eyebrow: "Image downloader",
    h1: "How to download all images from a website at full size",
    intro:
        "Open the page in Chrome. Click Collect images from this page. Every image appears grouped by size, largest first. Click Download all and they save as one ZIP file, at the size the page serves them.",
    lastUpdated: "2026-10-20",
    hero: "ext/images-tab-groups",
    steps: {
        heading: "How to download all the images on a page in three steps",
        intro: "Icons, logos and tracking pixels are left out. An image that appears several times is saved once.",
        items: [
            {
                title: "Open the page",
                body: "Go to the page with the images. Scroll to the bottom once, so images that load as you scroll are on the page, then scroll back up. Click the Web Scraper Pro icon and open the Images tab.",
                points: ["The tab shows one button, Collect images from this page, and the note We'll sort them by size for download."],
                screenshot: "ext/images-tab",
            },
            {
                title: "Click Collect images from this page",
                body: "The panel reads Looking for images… for a moment. Then the images appear grouped by exact size, such as 800 × 800, largest first, each with a count. Click Show N more to open the rest of a group.",
                points: ["Scrolled further and more images loaded? Click Find images again.", "The collection is saved in History, so you can come back to it."],
                screenshot: "ext/images-tab-groups",
            },
            {
                title: "Click Download all",
                body: "Or click Download on one group to take only the large photos. The ZIP saves to your Downloads folder with the images inside, named image_1, image_2 and so on.",
                points: ["Chrome may ask once for permission to save several files."],
            },
        ],
    },
    fields: {
        heading: "What you get",
        intro: "The images the page has loaded, at the size the page serves them.",
        items: [
            { name: "Every image on the page", description: "Photos, product shots and graphics, including ones that loaded as you scrolled." },
            { name: "Grouped by size", description: "Images with the same dimensions sit in one group with a count, largest first." },
            { name: "One ZIP file", description: "Download all, or one group, as a single ZIP with the files at their original size." },
            { name: "Product galleries", description: "A product page's gallery also comes with its product details, as image URLs." },
            { name: "Whole Shopify catalogs", description: "A Shopify store's product images come with the catalog export, named by product if you choose." },
        ],
    },
    sections: [
        {
            id: "full-size",
            eyebrow: "Full size",
            heading: "How to get the full-size version of an image",
            paragraphs: [
                "The extension saves each image at the size the page serves it. A listing page often serves a small version, and the product page the full one.",
                "When size matters, open the page that shows the image large, usually the product page, and collect there. The groups tell you at once: a 1600 × 1600 group is the gallery, a 200 × 200 group is thumbnails.",
            ],
        },
        {
            id: "worked-example",
            eyebrow: "A worked example",
            heading: "A supplier's product page to a folder of catalog photos",
            paragraphs: ["A supplier's product page shows a gallery of eight photos, a row of colour swatches and a dozen icons. You want the photos, at their largest, in one folder."],
            steps: [
                { title: "Open the product page and scroll once to the bottom.", body: "The gallery, the swatches and a few related-product thumbnails load. Scroll back up and open the Images tab." },
                { title: "Click Collect images from this page.", body: "Three groups appear: 1200 × 1200 with 8 images, 400 × 400 with 6, and 120 × 120 with 12. Icons and the logo aren't listed." },
                { title: "Click Download on the 1200 × 1200 group.", body: "One ZIP with eight files, image_1 to image_8, at the size the page serves. The swatches and thumbnails stay on the page." },
                { title: "Need the product details with the photos?", body: "Open the Properties tab and click Collect details on this page. The row carries an Image Gallery column with the same image addresses, next to the title, price and SKU." },
                { title: "Repeat for the next product.", body: "The Images tab works a page at a time. For a whole Shopify store, the store's catalog export downloads every product's images in one go." },
            ],
        },
        {
            id: "recipes",
            eyebrow: "What you can do with the files",
            heading: "Four things people do with the ZIP",
            paragraphs: ["The ZIP holds ordinary image files, so anything that reads a folder of images works with it."],
            points: [
                "Fill a product catalog: unzip into the product's folder and rename the files by SKU. The Image Gallery column from product details gives the order they appeared in.",
                "Compare a competitor's imagery: collect the same category page monthly, keep the ZIPs by date, and see what changed.",
                "Keep a reference board: a portfolio or mood-board page as one folder, the largest group only, without the icons.",
                "Hand images to a designer: the group sizes tell you what the site serves, so you know before asking whether a 2000-pixel version exists.",
            ],
        },
        {
            id: "settings",
            eyebrow: "Settings",
            heading: "What you choose, and what's fixed",
            paragraphs: ["The Images tab has no settings of its own. The choices are on the tab itself, and three behaviours are fixed."],
            table: {
                columns: ["Choice", "Where", "What it does"],
                rows: [
                    ["Download all", "Top of the Images tab", "Every image in every group, as one ZIP"],
                    ["Download", "On each size group", "Only that group, as its own ZIP"],
                    ["Find images again", "Images tab, after collecting", "Reads the page again, for images that loaded after the first pass"],
                    ["Grouping by size", "Fixed", "Exact width × height, largest group first, one count per group"],
                    ["One copy per image", "Fixed", "An image that appears several times on the page is saved once"],
                    ["Icons and tracking pixels", "Fixed", "Left out on purpose"],
                ],
            },
        },
        {
            id: "compared",
            eyebrow: "Compared",
            heading: "Compared with saving by hand, a browser's save-page, or a script",
            paragraphs: ["For a page with more than a handful of images, the Images tab is the quickest way to get the real files without the clutter."],
            table: {
                columns: ["Route", "Setup", "Where it breaks", "Pick it when"],
                rows: [
                    ["The Images tab", "None", "One page at a time; images drawn by CSS or inside players aren't listed", "Any page with a gallery, a grid or a portfolio"],
                    ["Right-click, save image", "None", "Forty files named download (37).jpg, and you still miss the ones below the fold", "One or two images"],
                    ["The browser's Save page as", "None", "Icons, scripts and thumbnails all land in one folder; no sizes, no grouping", "You need the whole page, not the images"],
                    ["A script", "Hours", "Sign-ins and images that load as you scroll each need their own code", "Thousands of pages on a schedule"],
                ],
            },
        },
        {
            id: "many-pages",
            eyebrow: "Many pages",
            heading: "How to download images from a whole store",
            paragraphs: [
                "The Images tab works one page at a time. For every product image in a Shopify store, use the Shopify scraper. Its catalog export downloads the photos as ZIP files of up to 5,000 images, named by product handle if you choose.",
                "For other stores, collect the product details of each page in a bulk run. The Image Gallery column holds every product's image addresses, which a download manager can fetch.",
            ],
        },
        {
            id: "doesnt",
            eyebrow: "What it doesn't do",
            heading: "What the image downloader doesn't do",
            paragraphs: ["Five limits, so you know before you start."],
            points: [
                "It doesn't upscale. An image is saved at the size the page serves it, never larger.",
                "It doesn't follow links to bigger versions. Open the page that shows the image large and collect there.",
                "It doesn't see images drawn as CSS backgrounds or inside embedded players.",
                "It doesn't run across many pages from the Images tab. That's a bulk product-details run, or the Shopify catalog export.",
                "It doesn't check copyright. Images belong to whoever published them; check the site's terms before reusing them.",
            ],
        },
        {
            id: "pushback",
            eyebrow: "When images are missing",
            heading: "Why a page gives fewer images than you expected",
            paragraphs: ["Only images the page has loaded can be collected."],
            points: [
                "Images that load as you scroll aren't on the page until you've scrolled there. Scroll, then click Find images again.",
                "Images drawn as backgrounds by CSS, or inside embedded players, aren't part of the page's image list.",
                "Icons, logos, sprites and tracking pixels are left out on purpose.",
            ],
        },
        {
            id: "goes-wrong",
            eyebrow: "When it goes wrong",
            heading: "The five things that go wrong, and the fix for each",
            paragraphs: ["Each shows up in the groups or in the ZIP, and each has a one-line fix."],
            points: [
                "Some images are missing. They hadn't loaded yet. Scroll to the bottom, wait for them to appear, and click Find images again.",
                "The images are small. They're saved at the size the page serves them. Open the page with the full-size version, usually the product page, and collect there.",
                "Chrome asked for permission to download several files. Allow it once for the site.",
                "The group I want has one image I don't. Download the group, then delete the one file; the groups are by size, not by subject.",
                "The ZIP didn't appear. Check Chrome's Downloads list; a blocked download shows there with a reason. Try Download on one group.",
            ],
        },
    ],
    limits: {
        heading: "Good to know",
        items: [
            "One page at a time from the Images tab.",
            "Images are saved at the size the page serves them, never upscaled.",
            "Images belong to whoever published them. Check the site's terms and copyright before reusing them.",
        ],
    },
    useCases: {
        heading: "What people use it for",
        items: [
            { title: "Product photos", body: "A supplier's or your own listing's photos, saved in one go for a catalog." },
            { title: "Design references", body: "Every image from a mood board or portfolio page, sorted by size." },
            { title: "Archiving", body: "A dated copy of a page's images before it changes." },
        ],
    },
    faqs: [
        {
            q: "Is this image downloader free?",
            a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create.",
        },
        {
            q: "Does it download images at full size?",
            a: "It saves images at the size the page serves them. Where a page links to a larger version, open that page and collect there; product pages usually serve the full gallery.",
        },
        {
            q: "How do I download all images from a website at once, not one page?",
            a: "One page at a time from the Images tab. For a Shopify store, the catalog export downloads every product's images as ZIP files of up to 5,000 images. For other stores, a bulk product-details run gives every product's image addresses.",
        },
        {
            q: "Where do the files go?",
            a: "To your browser's Downloads folder, as one ZIP. Inside, the files are named image_1, image_2 and so on. Chrome may ask once for permission to save several files.",
        },
        {
            q: "Why are some images small?",
            a: "They're saved at the size the page serves them. Open the page that shows the full-size version, usually the product page, and collect there.",
        },
        {
            q: "Does it pick up images that load as I scroll?",
            a: "Yes, once they've loaded. Scroll to the bottom of the page, then click Find images again in the Images tab.",
        },
        {
            q: "Can I download only the large photos and skip the icons?",
            a: "Yes. Images are grouped by size, largest first, and icons and tracking pixels aren't listed at all. Click Download on the group you want.",
        },
        {
            q: "Does it keep the file names from the site?",
            a: "No. The files inside the ZIP are named image_1, image_2 and so on, in the order they appeared. For names by product, use the Shopify catalog export, which names images by product handle.",
        },
        {
            q: "Is it legal to download images from a website?",
            a: "Saving images for your own reference is the normal use. The images belong to whoever published them, so reusing them, on a store or in an ad, needs their permission. Our web scraping and the law page explains the rules; it isn't legal advice.",
        },
    ],
    related: ["product-scraper", "shopify-scraper", "list-scraper"],
};
