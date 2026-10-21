import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Persona: Kai, Shopify agency or dropshipper (docs/personas.md), written so a first-time reader can follow. Facts checked
// against release 1.3.0 on 2026-10-21: Shopify store export (lib/shopifyMode/, components/scraper/shopify/: All products
// or one collection, one row per product or per variant, Download Shopify import CSV in the 48-column layout, image ZIPs
// of up to 5,000 files, named by handle on request; password-protected stores unsupported). Never imply an import file
// that needs no review, or that password-protected stores work. Draft until the screenshots exist.
// Title targets what a reader would type into Google (2026-10-21); /shopify-scraper and the Shopify guide own the
// "scrape a Shopify store's products" phrases, so this page is about moving a catalog into another store.

export const shopify: UseCasePageContent = {
    page: getPage("shopify", "use-case"),
    meta: {
        title: "How to Copy a Shopify Store's Catalog into Another Store",
        description: "Export any public Shopify store's full catalog, every variant, SKU, price and image, as a Shopify import CSV and image files, then import it into a client's store. No admin access needed, no code.",
    },
    h1: "How to copy a Shopify store's catalog into another store",
    intro: "Open any public Shopify store, get every product and variant as a Shopify import CSV plus all the product images, and import them into your own store. Web Scraper Pro does it in your Chrome browser, one store at a time, with no admin access and no code.",
    status: "draft",
    lastUpdated: "2026-10-21",
    job: {
        heading: "The whole catalog, not the visible page",
        paragraphs: [
            "An agency rebuilding or moving a client's store often has no admin export to work from. A dropshipper researching a category wants a supplier's full range with prices and variants, not screenshots of a category page.",
            "Web Scraper Pro reads the store's own product data, the same data the storefront is built from. You get every product and every variant with the same columns on every Shopify store, a Shopify import CSV, and the image files.",
            "A thousand products take a minute or two. There is nothing to set up.",
        ],
    },
    workflow: {
        heading: "How to move a Shopify catalog in five steps",
        intro: "Collecting itself takes under two minutes for most stores.",
        steps: [
            {
                title: "Open the store and find the store card",
                body: "Go to any page of the store in Chrome and click the Web Scraper Pro icon; a panel opens on the right. In the List tab, a card called Shopify stores appears at the top with the store's product count, such as All products (1,234).",
                points: ["No card? The store either isn't on Shopify or has turned off its public product data. The List tab still collects the page's own list."],
                feature: "shopify-scraper",
                screenshot: "ext/shopify-store-card",
            },
            {
                title: "Choose what to collect and how the rows look",
                body: "On the card, pick All products or one collection, and One row per product or One row per variant. For an import or a stock check, choose per variant: each size and colour gets its own row with its SKU, price and barcode.",
                points: ["Turn on Include barcodes and image descriptions (slower) when the import needs them.", "Turn on Name images by product handle so the downloaded image files are named after the product."],
                feature: "shopify-scraper",
            },
            {
                title: "Click Collect products",
                body: "The rows come from the store's product feed, not from the pages, so there's no paging through the site. Click Stop at any time and keep what it has.",
                feature: "shopify-scraper",
            },
            {
                title: "Check the table",
                body: "The results open in a new tab with one row per product or variant. The columns match Shopify's own fields, so nothing needs renaming for an import.",
                points: ["Product columns: Title, Vendor, Type, Tags, Description, Handle, URL, Product ID, Published At, Price, Compare At Price, Available.", "Variant columns: each option's name and value, SKU, Barcode, Grams, Requires Shipping, Taxable, Variant Image, Variant ID.", "Remove products the client won't carry with the trash icon on their rows."],
                feature: "export-to-google-sheets",
                screenshot: "ext/results-shopify-variants",
            },
            {
                title: "Download the import file and the images, then import",
                body: "Click Download Shopify import CSV for a file in Shopify's product import layout, and Download images for the product images as ZIP files. In your own store, go to Products → Import. Try a test store first and look at the products before touching a live store.",
                points: ["The import CSV has Shopify's 48 columns: handle, title, body, vendor, type, tags, each variant's options, SKU, price, inventory fields and image URLs.", "Image ZIPs hold up to 5,000 files each; a bigger catalog is split into parts.", "Export as also gives Excel, CSV, JSON and Google Sheets for analysis."],
                feature: "shopify-scraper",
            },
        ],
    },
    sample: {
        caption: "Three rows with one row per variant. Products and SKUs are made up.",
        columns: ["Title", "Variant", "SKU", "Price"],
        rows: [
            ["Trail Runner 2", "Black / 9", "TR2-BLK-9", "89.00"],
            ["Trail Runner 2", "Black / 10", "TR2-BLK-10", "89.00"],
            ["Summit Rain Jacket", "Blue / M", "SRJ-BLU-M", "74.50"],
        ],
    },
    sites: [{ name: "Any public Shopify store" }, { name: "Shopify stores" }],
    cantDo: {
        heading: "What it won't do",
        items: [
            "Read a password-protected store, or a store that has turned off its public product data. Those fall back to collecting the page's own list.",
            "Produce an import file that needs no review. Shopify's import has rules the source store may not follow; import into a test store first and check the products.",
            "Fill in inventory counts or cost prices. Stores don't publish them, so those columns come from the client.",
            "Give you the right to resell the images, text or designs. Moving a client's own catalog is their call; copying someone else's is not.",
        ],
    },
    guides: ["export-a-shopify-store-catalog", "download-all-images-on-a-page"],
    faqs: [
        { q: "Is the Shopify export free?", a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create. There's no per-row limit; image ZIPs split above 5,000 files." },
        { q: "Do I need the client's Shopify admin access?", a: "No. The public product data every Shopify store publishes is enough for the catalog, the variants and the images. Inventory counts and cost prices aren't public, so those come from the client." },
        { q: "How do I import products from one Shopify store to another?", a: "Export the source store with Download Shopify import CSV, then in the destination store go to Products → Import and choose the file. Import into a test store first and check the products before a live store." },
        { q: "How does the import CSV compare with Shopify's own export?", a: "It uses the same product import layout, so Products → Import accepts it. Fields Shopify doesn't publish, such as inventory quantity and cost, are empty and need filling in before or after the import." },
        { q: "Can I collect one collection instead of the whole store?", a: "Yes. Choose the collection on the store card. One collection per run; the whole store is one run too." },
        { q: "How long does a big store take?", a: "A thousand products take a minute or two, because the rows come from the store's product feed rather than from page after page. Turning on barcodes and image descriptions makes it slower." },
    ],
};
