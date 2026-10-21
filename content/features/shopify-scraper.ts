import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Facts checked against release 1.3.0 (branch test-branch-1) on 2026-10-20:
// - "Shopify store" card on the List tab with product count, All products or one collection, one row per
//   product or per variant, Stop keeps rows: components/scraper/shopify/, lib/shopifyMode/
// - Product columns Title, Vendor, Type, Price, Compare At Price, Available, Variants, SKU, Tags, Images,
//   Description, URL, Handle, Published At, Product ID; variant columns add Option 1–3 name and value, Barcode,
//   Grams, Requires Shipping, Taxable, Variant Image, Variant ID: lib/platform/shopify/rows.ts
// - "Download Shopify import CSV" (48 columns) as its own download; image ZIPs of up to 5,000 images, named by
//   handle on request: lib/shopifyMode/collectShopifyCatalog.ts, components/scraper/shopify/
// - Settings "Use store product data" and "Include barcodes and image descriptions (slower)"
// - Not supported: password-protected stores, stores that hide their product data (falls back to the page),
//   several collections at once, bulk runs: change_documentation/SHOPIFY_MODE_PLAN.md, REFACTORING_TODO.md
// - Chat "collect all products from this store": lib/tools/shopify.ts
// - Timing: SHOPIFY_MODE_PLAN.md records live runs of 1,019 and 6,512 products, each matching the store's own
//   count, in about 3–8 seconds without the slower barcode option. Verify on a current store before quoting.
// - Available is yes/no from the store's data, never a stock count (rows.ts). Cost, sales and customer data are
//   not public and never collected.
// Title and headings target what people type ("scrape shopify stores", "how to scrape shopify products",
// "shopify scraper chrome extension free"): youtube-research/AUTOSUGGEST.md and SEARCH_QUERIES.md, 2026-10-21.
// Deepened 2026-10-21 (owner: pages too thin): worked example, what to do with the table, methods compared,
// what it doesn't do, when it goes wrong, FAQs to ten. Facts from the sources above only.

export const shopifyScraper: FeaturePageContent = {
    page: getPage("shopify-scraper"),
    meta: {
        title: "How to Scrape a Shopify Store's Products, Free, No Code",
        description:
            "Open any public Shopify store and get every product and variant as a spreadsheet, with prices, SKUs, tags, descriptions and images, plus a CSV Shopify can import. Free, no code.",
    },
    eyebrow: "Shopify scraper",
    h1: "How to scrape a Shopify store's products into a spreadsheet",
    intro:
        "Open any public Shopify store. Click Collect products. Every product or every variant becomes a row with its price, SKU, tags, description and images. You also get a CSV that Shopify can import, and a ZIP of the photos.",
    lastUpdated: "2026-10-20",
    sample: {
        caption: "One row per variant, after export. The store and its products are made up.",
        columns: ["Title", "Variant", "SKU", "Price", "Available"],
        rows: [
            ["Trail Runner 2", "Black / 9", "TR2-BLK-9", "89.00", "TRUE"],
            ["Trail Runner 2", "Black / 10", "TR2-BLK-10", "89.00", "TRUE"],
            ["Summit Rain Jacket", "Blue / M", "SRJ-BLU-M", "74.50", "FALSE"],
            ["Basecamp Socks", "3 pack / L", "BCS-3-L", "18.00", "TRUE"],
        ],
    },
    steps: {
        heading: "How to scrape a Shopify store in three steps",
        intro: "The catalog comes from the store's own product data, not from scrolling the pages, so a store with a thousand products takes seconds.",
        items: [
            {
                title: "Open the store",
                body: "Go to any page of a public Shopify store in Chrome. Click the Web Scraper Pro icon and open the List tab. A Shopify store card appears with the store's product count.",
                points: ["No card? The store isn't on Shopify, or it hides its product data. The List tab still collects the page's own list."],
            },
            {
                title: "Choose what to collect and click Collect products",
                body: "Pick All products or one collection. Then pick One row per product or One row per variant. Stop at any time and keep what it has.",
                points: [
                    "Tick Include barcodes and image descriptions when an import needs them. It's slower.",
                    "Tick Name images by product handle for files named after the product.",
                    "Or type in the Chat tab: Collect all products from this store.",
                ],
            },
            {
                title: "Download",
                body: "Click Export as for Excel, CSV, JSON or Google Sheets. Click Download Shopify import CSV for the file Shopify's own import accepts. Click Download images for a ZIP of every product photo.",
                points: ["Image ZIPs hold up to 5,000 images each. A bigger catalog is split into several files."],
            },
        ],
    },
    fields: {
        heading: "What you get for every product",
        intro: "The columns come from the store's own product data, so they're the same on every Shopify store.",
        items: [
            { name: "Title, vendor, type", description: "The product's name, brand and product type." },
            { name: "Price, Compare At Price", description: "The selling price and the struck-through price, when the store sets one." },
            { name: "Available", description: "Whether the product or variant is in stock, as yes or no. Stores don't publish the count." },
            { name: "SKU, barcode", description: "The stock code, and the barcode when you tick the slower option." },
            { name: "Variants", description: "One row per variant: each option's name and value, such as size and colour, weight in grams, and the variant's own image." },
            { name: "Tags, description", description: "The store's tags and the full product description." },
            { name: "Images", description: "Every image URL, and the files themselves as a ZIP." },
            { name: "URL, handle, product ID", description: "The product's page address, its handle and its ID, plus the date it was published." },
        ],
    },
    sections: [
        {
            id: "worked-example",
            eyebrow: "A worked example",
            heading: "A 1,200-product outdoor store, start to finish",
            paragraphs: [
                "Say a client sells outdoor gear on Shopify and wants a copy of the catalog in a spreadsheet, with one row per size and colour. The store has 1,248 products in 12 collections. Here is the whole job, with the numbers you'd see.",
            ],
            steps: [
                { title: "Open the store and the List tab.", body: "The Shopify store card reads 1,248 products and lists the 12 collections. Leave All products selected." },
                { title: "Pick One row per variant and click Collect products.", body: "The count climbs on the card. In testing, stores of 1,019 and 6,512 products each finished in under ten seconds and matched the store's own count." },
                { title: "Open the results page.", body: "You get about 4,900 rows, one per variant, with Option1 Name set to Size, Option1 Value set to the size, and Option2 for colour. Each row has its own SKU, price and Available." },
                { title: "Click Download Shopify import CSV, then Download images.", body: "The CSV has the 48 columns Shopify's import wants. The images arrive as one ZIP, or two if the store has more than 5,000 photos." },
                { title: "Check the file before anyone imports it.", body: "Open it in Excel, filter Available to FALSE to see what's out of stock, and look at ten products against the live store. Then hand it over." },
            ],
        },
        {
            id: "use-the-table",
            eyebrow: "What you can do with the table",
            heading: "Five things people do with a Shopify catalog export",
            paragraphs: ["The export is a spreadsheet, so the useful work happens in Excel, Google Sheets or your store's admin."],
            table: {
                columns: ["Job", "How", "Columns that matter"],
                rows: [
                    ["Move the catalog to another store", "Products → Import in the new store's admin, with the Shopify import CSV", "Handle, Title, Variant SKU, Variant Price, Image Src"],
                    ["See what's out of stock", "Filter rows where Available is FALSE", "Available, Title, Option values"],
                    ["Build a price list with discounts", "Compare At Price minus Price, as a new column", "Price, Compare At Price, Variant"],
                    ["Compare two exports a month apart", "Match on Variant ID or Handle, then look at Price and Available", "Variant ID, Handle, Price, Available"],
                    ["Reuse the product photos", "Download images with Name images by product handle ticked", "Images, Variant Image"],
                ],
                caption: "Column names as they appear on the results page and in the import CSV.",
            },
        },
        {
            id: "import",
            eyebrow: "Moving a catalog",
            heading: "How to import the products into another Shopify store",
            paragraphs: [
                "Click Download Shopify import CSV. The file follows Shopify's 48-column product import layout: handle, title, body, vendor, type, tags, each variant's options, SKU, price, inventory fields and image URLs.",
                "In your store's admin, go to Products → Import and choose the file. Import into a test store first and check the products before a live one, because Shopify's import has rules the source store may not follow.",
                "Fields the store doesn't publish, such as cost per item, stay blank in the file. Fill them in Excel before the import, or in the new store afterwards.",
            ],
        },
        {
            id: "settings",
            eyebrow: "Settings",
            heading: "Three switches that change how a store is read",
            paragraphs: ["Two sit on the store card, one in Settings → Shopify stores. Each one is a trade: more detail for a slower run, or a plainer read for a store that misbehaves."],
            table: {
                columns: ["Switch", "Default", "Turn it the other way when"],
                rows: [
                    ["Use store product data", "On", "A store's product data looks incomplete. Off, the store is collected from the page like any other site, so you get what's on screen."],
                    ["Include barcodes and image descriptions (slower)", "Off", "An import or a marketplace needs barcodes or image alt text. It reads each product again, so the run takes about twice as long."],
                    ["Name images by product handle", "Off", "You want the downloaded files named after the product, not the store's file names."],
                ],
            },
        },
        {
            id: "compared",
            eyebrow: "Other ways to do it",
            heading: "Compared with copying by hand, writing code, or an app",
            paragraphs: [
                "For a one-off copy of a public store, the extension is the quickest route: nothing to install on the store, nothing to write, and the file Shopify's import accepts. The other routes earn their place when you need the store's private data or a job that runs every night.",
            ],
            table: {
                columns: ["Route", "Good for", "Where it falls short"],
                rows: [
                    ["Web Scraper Pro", "Any public store, in seconds, with variants, images and the import CSV", "Password-protected stores; no scheduled re-runs until cloud runs ship"],
                    ["Copying by hand", "A handful of products", "A 1,000-product store takes days, and variants get missed"],
                    ["A script against the store's product data", "Developers who need it inside their own system", "Someone has to write it, keep it working and handle the store's limits"],
                    ["The store's own export", "Your own store, with cost and inventory counts", "Only works for a store you own; a client's store needs their admin"],
                ],
            },
        },
        {
            id: "cant-do",
            eyebrow: "Honest limits",
            heading: "What it doesn't do",
            paragraphs: ["Knowing these before you start saves a wasted run."],
            points: [
                "Password-protected stores can't be read. Nothing is collected, and the extension won't sign in for you.",
                "A store that has turned off its public product data falls back to the page's own list, which is only what's on screen.",
                "One collection at a time, or the whole store. Several collections in one run, or several stores in one bulk run, aren't offered yet.",
                "Stock comes as in or out, never as a count. Cost per item, sales and customer data are not public and are never collected.",
                "Prices come in the store's own currency, as the store publishes them, with no conversion.",
                "No scheduled re-runs until cloud runs ship. For a monthly check, run it again and compare the two exports.",
            ],
        },
        {
            id: "pushback",
            eyebrow: "When it goes wrong",
            heading: "Why a store gives only a few products, or none",
            paragraphs: ["Most public Shopify stores read cleanly. When one doesn't, it's one of these."],
            points: [
                "No Shopify store card appears. The store isn't on Shopify, or it hides its product data. The List tab still collects the page's own list.",
                "The card shows far fewer products than the store seems to have. Use store product data is off in Settings → Shopify stores. Turn it on and collect again.",
                "The run stops part way. Click Collect products again; what was collected is kept in History.",
                "The import fails in the new store. Shopify's import rejects rows with a missing handle or a duplicate SKU. Fix those rows in Excel and import again, into a test store first.",
                "Images are missing from the ZIP. A catalog with more than 5,000 images is split into several ZIPs; download each one.",
                "A product has no price. The store lists it without one, or every variant is unavailable. Check the live product page.",
            ],
        },
    ],
    limits: {
        heading: "Good to know",
        items: [
            "One collection at a time, or the whole store. Several stores run one after another, not in a bulk run.",
            "Prices are collected in the store's own currency, as the store publishes them.",
            "The products, images and text belong to the store. Check the store's terms and the law where you are before reusing them.",
        ],
    },
    useCases: {
        heading: "What people use it for",
        items: [
            { title: "Agencies moving stores", body: "Export a client's catalog and import it into a new or test store without retyping a product." },
            { title: "Competitor research", body: "Every product, variant and price from a competing store in one sheet, re-run whenever prices move." },
            { title: "Supplier catalogs", body: "A supplier's catalog with SKUs and images, so you can pick what to list." },
            { title: "Backups", body: "A dated copy of your own store's products and images, outside Shopify." },
        ],
    },
    faqs: [
        {
            q: "Is this Shopify scraper free?",
            a: "Yes. Web Scraper Pro is free. There's no paid plan, every feature is included, and there's no account to create.",
        },
        {
            q: "Does it work on every Shopify store?",
            a: "On most public ones. Password-protected stores can't be read, and a few stores hide their product data; those fall back to the page's own list.",
        },
        {
            q: "How do I know a store runs on Shopify?",
            a: "You don't need to check. When you open a Shopify store, the Shopify store card appears in the List tab by itself.",
        },
        {
            q: "How long does a big store take?",
            a: "Seconds, because the products come from the store's own data rather than from scrolling pages. In testing, a 6,512-product store finished in under ten seconds. The slower barcode option roughly doubles that.",
        },
        {
            q: "Can I import the products into my own Shopify store?",
            a: "Yes. Download the Shopify import CSV, then use Products → Import in your store's admin. Try a test store first.",
        },
        {
            q: "Does it download the product images?",
            a: "Yes. The image URLs are in the table, and Download images saves the files as a ZIP, named after the product handle if you choose.",
        },
        {
            q: "Can I scrape one collection instead of the whole store?",
            a: "Yes. Pick the collection on the store card before you click Collect products. One collection at a time.",
        },
        {
            q: "Does it get every variant's price?",
            a: "Yes. Choose One row per variant and each size or colour gets its own row with its own price, SKU and stock.",
        },
        {
            q: "Does it show how many units are in stock?",
            a: "No. Stores publish whether a variant is available, not the count, so the Available column reads yes or no.",
        },
        {
            q: "Can I get a store's cost prices or sales?",
            a: "No. Those aren't public. The export holds what the store publishes: products, variants, prices, stock status, tags, descriptions and images.",
        },
    ],
    related: ["product-scraper", "list-scraper", "image-downloader", "export-to-google-sheets", "ai-chat"],
};
