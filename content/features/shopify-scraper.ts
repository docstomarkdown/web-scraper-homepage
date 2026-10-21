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
// Title and headings target what people type ("scrape shopify stores", "how to scrape shopify products",
// "shopify scraper chrome extension free"): youtube-research/AUTOSUGGEST.md and SEARCH_QUERIES.md, 2026-10-21.

export const shopifyScraper: FeaturePageContent = {
    page: getPage("shopify-scraper"),
    meta: {
        title: "How to Scrape a Shopify Store's Products: Free Chrome Extension",
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
        intro: "The catalog comes from the store's own product data, so a thousand products take about a minute.",
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
            { name: "Available", description: "Whether the product or variant is in stock." },
            { name: "SKU, barcode", description: "The stock code, and the barcode when you tick the slower option." },
            { name: "Variants", description: "One row per variant: each option's name and value, such as size and colour, weight in grams, and the variant's own image." },
            { name: "Tags, description", description: "The store's tags and the full product description." },
            { name: "Images", description: "Every image URL, and the files themselves as a ZIP." },
            { name: "URL, handle, product ID", description: "The product's page address, its handle and its ID, plus the date it was published." },
        ],
    },
    sections: [
        {
            id: "import",
            eyebrow: "Moving a catalog",
            heading: "How to import the products into another Shopify store",
            paragraphs: [
                "Click Download Shopify import CSV. The file follows Shopify's 48-column product import layout: handle, title, body, vendor, type, tags, each variant's options, SKU, price, inventory fields and image URLs.",
                "In your store's admin, go to Products → Import and choose the file. Import into a test store first and check the products before a live one, because Shopify's import has rules the source store may not follow.",
            ],
        },
        {
            id: "settings",
            eyebrow: "Settings",
            heading: "Three switches that change how a store is read",
            paragraphs: ["Two sit on the store card, one in Settings → Shopify stores."],
            points: [
                "Use store product data: on. Turn it off to collect what the page shows instead of the store's product feed.",
                "Include barcodes and image descriptions (slower): off. Reads each product in more detail for imports that need barcodes.",
                "Name images by product handle: off. Names downloaded image files after the product instead of the store's file names.",
            ],
        },
        {
            id: "pushback",
            eyebrow: "When a store can't be read",
            heading: "Why a store gives only a few products, or none",
            paragraphs: ["Most public Shopify stores read cleanly. Two kinds don't."],
            points: [
                "A password-protected store can't be read at all.",
                "A store that has turned off its public product data falls back to the page's own list, which is only what's on screen.",
                "Use store product data is off in Settings → Shopify stores. Turn it on and collect again.",
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
            a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create.",
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
    ],
    related: ["product-scraper", "list-scraper", "image-downloader", "export-to-google-sheets", "ai-chat"],
};
