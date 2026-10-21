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

export const shopifyScraper: FeaturePageContent = {
    page: getPage("shopify-scraper"),
    meta: {
        title: "Shopify Scraper: Export Any Store's Full Catalog",
        description:
            "Collect every product and variant from a public Shopify store, with prices, SKUs, tags, descriptions and images, as a spreadsheet or a Shopify import CSV.",
    },
    eyebrow: "Shopify store export",
    h1: "Export a Shopify store's whole catalog",
    intro:
        "Open any public Shopify store and collect every product, or one collection, in a couple of clicks: one row per product or per variant, with the images and a ready-to-import CSV.",
    lastUpdated: "2026-10-20",
    sample: {
        caption: "One row per variant, as it looks after export. The store and its products are made up.",
        columns: ["Title", "Variant", "SKU", "Price", "Compare At Price", "Available", "Vendor", "Tags"],
        rows: [
            ["Trail Runner 2", "Black / 9", "TR2-BLK-9", "89.00", "110.00", "TRUE", "Trail Gear Co.", "shoes, running"],
            ["Trail Runner 2", "Black / 10", "TR2-BLK-10", "89.00", "110.00", "TRUE", "Trail Gear Co.", "shoes, running"],
            ["Summit Rain Jacket", "Blue / M", "SRJ-BLU-M", "74.50", "", "FALSE", "Trail Gear Co.", "jackets, rain"],
            ["Basecamp Socks", "3 pack / L", "BCS-3-L", "18.00", "", "TRUE", "Trail Gear Co.", "socks"],
        ],
    },
    fields: {
        heading: "Every field the store publishes",
        intro: "The columns come from the store's own product data, so they're the same on every Shopify store.",
        items: [
            { name: "Product", description: "Title, vendor, type, tags, description, handle, URL, product ID and the date it was published." },
            { name: "Prices and stock", description: "Price and compare-at price, whether it's available, and the number of variants." },
            { name: "Variants", description: "With one row per variant: each option's name and value (size, colour, material), SKU, barcode, weight in grams, whether it ships and is taxable, and the variant's own image." },
            { name: "Images", description: "Every image URL per product, and the files themselves as a ZIP, with the option to name them by product handle." },
            { name: "Shopify import CSV", description: "A separate download in Shopify's 48-column product import layout, ready for a test store." },
        ],
    },
    steps: {
        heading: "From storefront to spreadsheet",
        items: [
            {
                title: "Open the store",
                points: ["No card? The store isn't on Shopify or hides its product data. The List tab still collects the page's own list."],
                body: "Go to any page of a public Shopify store. In the side panel's List tab, a Shopify store card appears with the store's product count.",
            },
            {
                title: "Choose what to collect",
                points: ["All products or one collection. One row per product or One row per variant.", "Include barcodes and image descriptions (slower) when an import needs them. Name images by product handle for files named after the product."],
                body: "Pick All products or one collection, then One row per product or One row per variant. Click Collect products. Stop at any time and keep what it has.",
            },
            {
                title: "Download",
                points: ["Download Shopify import CSV gives Shopify's 48-column import file. Download images saves the photos as ZIP files of up to 5,000 each.", "Export as gives Excel, CSV, JSON or Google Sheets for analysis."],
                body: "Export the table to Excel, CSV, JSON or Google Sheets. Click Download Shopify import CSV for the import file, and Download images for a ZIP of every product image.",
            },
        ],
    },
    sections: [
        {
            id: "settings",
            eyebrow: "Settings that change the result",
            heading: "Three switches decide how a store is read",
            paragraphs: ["Two sit on the store card, one in Settings → Shopify stores."],
            points: ["Use store product data: on. The catalog comes from the store's own product feed, which is why a thousand products take a minute. Turn it off to collect what the page shows instead.", "Include barcodes and image descriptions (slower): off. Reads each product in more detail for imports that need barcodes.", "Name images by product handle: off. Names downloaded image files after the product instead of the store's file names."],
        },
        {
            id: "pushback",
            eyebrow: "When a store pushes back",
            heading: "Stores that can't be read, and imports that need a second look",
            paragraphs: ["Most public Shopify stores read cleanly. Two kinds don't, and one step needs care."],
            points: ["A password-protected store can't be read at all.", "A store that has turned off its public product data falls back to the page's own list, which is only what's on screen.", "Shopify's import has rules the source store may not follow. Import into a test store first and check the products before a live one."],
        },
        {
            id: "import",
            eyebrow: "Moving a catalog",
            heading: "A CSV Shopify can import",
            paragraphs: [
                "The import CSV follows Shopify's product import layout: handle, title, body, vendor, type, tags, each variant's options, SKU, price, inventory fields and image URLs. Import it into a test store first and review the products before importing into a live one.",
            ],
        },
        {
            id: "ask",
            eyebrow: "Or ask instead",
            heading: "\"Collect all products from this store\"",
            paragraphs: [
                "In the Chat tab, ask for the whole store, one collection, or every variant, and it runs the same collection. After collecting a list on a Shopify store, chat offers Collect the whole store.",
            ],
        },
    ],
    limits: {
        heading: "Good to know",
        items: [
            "Password-protected stores aren't supported. A store that doesn't share its product data falls back to collecting what's on the page.",
            "One collection at a time, or the whole store. Several stores run one after another, not in a bulk run.",
            "Turning on Include barcodes and image descriptions reads each product in more detail and takes longer.",
            "Image ZIPs hold up to 5,000 images each; a bigger catalog is split into several files.",
            "The products, images and text belong to the store. Check the store's terms and the law where you are before reusing them.",
        ],
    },
    useCases: {
        heading: "What people use it for",
        items: [
            { title: "Agencies moving stores", body: "Export a client's catalog and import it into a new or test store without retyping a product." },
            { title: "Competitor research", body: "Every product, variant and price from a competing store in one sheet, re-run whenever prices move." },
            { title: "Supplier catalogs", body: "Pull a supplier's catalog with SKUs and images, then pick what to list." },
            { title: "Backups", body: "A dated copy of your own store's products and images, outside Shopify." },
        ],
    },
    faqs: [
        {
            q: "Does it work on every Shopify store?",
            a: "On most public ones. It reads the store's public product data, so you get the full catalog with variants and images. Password-protected stores can't be read, and a few stores block the product data; those fall back to the page's own list.",
        },
        {
            q: "How do I know a store runs on Shopify?",
            a: "You don't need to. When you open a Shopify store, the Shopify store card appears in the List tab by itself.",
        },
        {
            q: "Can I import the export into my own store?",
            a: "Yes. Download the Shopify import CSV, then use Products → Import in your store's admin. Try a test store first.",
        },
        {
            q: "Are the images included?",
            a: "The image URLs are in the table, and Download images saves the files as a ZIP, with names based on the product handle if you choose.",
        },
        {
            q: "Is Shopify export included in the plan?",
            a: "Yes. It's part of the one plan, Pro, like every other feature.",
        },
        {
            q: "A store gave me only a few products. Why?",
            a: "Either the store hides its product data, so the extension fell back to the page's own list, or Use store product data is off in Settings → Shopify stores. Turn it on and collect again.",
        },
        {
            q: "Does it collect prices in the store's currency?",
            a: "Yes, as the store publishes them. Compare At Price is the struck-through price when the store sets one.",
        },
    ],
    related: ["product-scraper", "list-scraper", "image-downloader", "export-to-google-sheets", "ai-chat"],
};
