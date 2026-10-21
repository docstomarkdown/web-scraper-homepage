import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Persona: Kai, Shopify agency or dropshipper (docs/personas.md). Facts checked against release 1.3.0 on 2026-10-21:
// Shopify store export (lib/shopifyMode/, components/scraper/shopify/: All products or one collection, one row per
// product or per variant, Download Shopify import CSV in the 48-column layout, image ZIPs of up to 5,000 files, named by
// handle on request; password-protected stores unsupported). Never imply an import file that needs no review, or that
// password-protected stores work. Draft until the screenshots exist.

export const shopify: UseCasePageContent = {
    page: getPage("shopify", "use-case"),
    meta: {
        title: "Shopify Agencies and Dropshipping: Move or Research a Whole Catalog",
        description: "Export any public Shopify store's full catalog, every variant, SKU, price and image, as a spreadsheet or a Shopify import CSV, to rebuild a client's store or research what sells.",
    },
    h1: "Move a whole Shopify catalog, or research one, without admin access",
    intro: "Open any public Shopify store and collect every product and variant from its own product data, with the images and a CSV your store can import. One run per store, a few clicks each.",
    status: "draft",
    lastUpdated: "2026-10-21",
    job: {
        heading: "The whole catalog, not the visible page",
        paragraphs: [
            "An agency rebuilding or migrating a client's store often has no admin export to work from. A dropshipper researching a niche wants a supplier's or competitor's full range with prices and variants, not screenshots of a category page.",
            "Web Scraper Pro reads the store's own product data, so the result is every product and every variant with the same columns on every Shopify store, plus a Shopify import CSV and the image files. It runs in your browser, store by store.",
        ],
    },
    workflow: {
        heading: "From storefront to import file",
        steps: [
            { title: "Open the store and the store card", body: "Go to any page of the store and open the side panel's List tab. On a Shopify store a Shopify stores card appears with the product count, such as All products (1,234).", feature: "shopify-scraper", screenshot: "ext/shopify-store-card" },
            { title: "Choose the scope and the row shape", body: "All products or one collection; one row per product or one row per variant. For an import or a stock check, pick per variant so each size and colour has its own SKU, price and barcode. Turn on Include barcodes and image descriptions when the import needs them.", feature: "shopify-scraper" },
            { title: "Collect", body: "Click Collect products. The rows come from the store's product feed, so a thousand products take a minute or two. Stop keeps what it has.", feature: "shopify-scraper" },
            { title: "Review the table", body: "On the results page, check titles, variants and prices, remove products the client won't carry, and fix anything odd. The columns match Shopify's own fields: Title, Vendor, Type, Tags, Description, Handle, Price, Compare At Price, SKU, Barcode, Grams and the rest.", feature: "export-to-google-sheets", screenshot: "ext/results-shopify-variants" },
            { title: "Download the import CSV and the images", body: "Download Shopify import CSV gives the 48-column import layout; Download images saves the product images as ZIP files, named by product handle if you chose that. Import into a test store first, review, then the live store.", feature: "shopify-scraper" },
        ],
    },
    sample: {
        caption: "Three rows of a catalog collected one row per variant. The store and products are made up.",
        columns: ["Title", "Option 1 Value", "SKU", "Price", "Compare At Price", "Available", "Vendor"],
        rows: [
            ["Trail Runner 2", "Black / 9", "TR2-BLK-9", "89.00", "110.00", "TRUE", "Trail Gear Co."],
            ["Trail Runner 2", "Black / 10", "TR2-BLK-10", "89.00", "110.00", "TRUE", "Trail Gear Co."],
            ["Summit Rain Jacket", "Blue / M", "SRJ-BLU-M", "74.50", "", "FALSE", "Trail Gear Co."],
        ],
    },
    sites: [{ name: "Any public Shopify store" }, { name: "Shopify stores" }],
    cantDo: {
        heading: "What it won't do",
        items: [
            "Read a password-protected store, or a store that has turned off its public product data. Those fall back to collecting the page's own list.",
            "Produce an import file that needs no review. Shopify's import has rules the source store may not follow; import into a test store first and check the products.",
            "Collect several stores in one bulk run. Each store is its own run, a few clicks each.",
            "Give you the right to resell the images, text or designs. They belong to the store; moving a client's own catalog is their call, copying someone else's is not.",
        ],
    },
    guides: ["export-a-shopify-store-catalog", "download-all-images-on-a-page"],
    faqs: [
        { q: "Do I need the client's Shopify admin access?", a: "No. The public product data every Shopify store publishes is enough for the catalog, the variants and the images. Inventory counts and cost prices aren't public, so those come from the client." },
        { q: "How does the import CSV compare with Shopify's own export?", a: "It uses the same product import layout, so Products → Import accepts it. Fields Shopify doesn't publish, such as inventory quantity and cost, are empty and need filling in before or after the import." },
        { q: "Can I collect one collection instead of the whole store?", a: "Yes. Choose the collection on the store card. One collection per run; the whole store is one run too." },
        { q: "How many stores can I export?", a: "As many as you open, one run each. There's no per-row limit; image ZIPs split above 5,000 files." },
    ],
};
