import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Persona: Kai, Shopify agency or dropshipper (docs/personas.md), written so a first-time reader can follow. Facts checked
// against release 1.3.0 on 2026-10-21: Shopify store export (lib/shopifyMode/, components/scraper/shopify/: All products
// or one collection, one row per product or per variant, Download Shopify import CSV in the 48-column layout, image ZIPs
// of up to 5,000 files, named by handle on request; password-protected stores unsupported; Use store product data in
// Settings → Shopify stores; several stores run one after another, SHOPIFY_MODE_PLAN.md phase 5 still open). Never imply
// an import file that needs no review, or that password-protected stores work. Draft until the screenshots exist.
// Title targets what a reader would type into Google (2026-10-21); /shopify-scraper and the Shopify guide own the
// "scrape a Shopify store's products" phrases, so this page is about moving a catalog into another store.
// Deepened 2026-10-21 (variations, worked example, recipes, mistakes). Verify before publishing: the Shopify import's
// behaviour on duplicate handles and on image URLs it can't fetch (described from the guide, not from a run).

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
    sections: [
        {
            id: "variations",
            eyebrow: "Variations",
            heading: "Four Shopify jobs, and what to pick on the store card",
            paragraphs: [
                "Moving a catalog is the headline job, but the same card does the research and the backup jobs too. The row shape and the download are what change.",
            ],
            table: {
                columns: ["The job", "Pick on the card", "What you download"],
                rows: [
                    ["Moving a client's catalog", "All products, One row per variant, barcodes on if the import needs them", "Download Shopify import CSV and Download images, named by product handle"],
                    ["Researching a competitor's store", "All products or the collection you compete in, One row per product", "Export as → Excel or Google Sheets; run it again later and compare by Handle"],
                    ["Several stores", "Each store in turn: open it, collect, export; the whole store or one collection per run", "One export per store, put side by side in one sheet"],
                    ["Images only", "All products; Name images by product handle on", "Download images: ZIP files of up to 5,000 images each, named after the products"],
                ],
                caption: "Several stores run one after another, not in a bulk run.",
            },
        },
        {
            id: "worked-example",
            eyebrow: "A worked example",
            heading: "Moving a 1,200-product store into a test store, start to finish",
            paragraphs: [
                "This is the agency job with the counts and times the extension gives. The store is made up; the clicks are the same for any public store.",
            ],
            steps: [
                { title: "Open the store and read the card.", body: "The Shopify stores card shows All products (1,234). Keep All products, choose One row per variant, and turn on Include barcodes and image descriptions, because the client's import needs barcodes." },
                { title: "Turn on Name images by product handle.", body: "The image files will then match the Handle column in the CSV, which makes checking the import simpler." },
                { title: "Click Collect products.", body: "The rows come from the store's product feed, so the run takes a minute or two even with barcodes on. With one row per variant the table is several times longer than the product count." },
                { title: "Remove what the client won't carry.", body: "On the results page, use Filter rows to find discontinued lines by tag or vendor, and remove their rows with the trash icon. Hide the columns the import doesn't need." },
                { title: "Download the import CSV and the images.", body: "Download Shopify import CSV gives the 48-column file. Download images gives ZIP files of up to 5,000 images; a big catalog comes as part-1, part-2 and so on." },
                { title: "Import into a test store first.", body: "Products → Import, choose the file, read the error rows, fix them in the CSV and import again. Only then the live store. Inventory counts and cost prices come from the client; stores don't publish them." },
            ],
        },
        {
            id: "next",
            eyebrow: "After the export",
            heading: "What to do with the catalog next",
            paragraphs: ["Four recipes, one per persona job. Each starts from the results page or the downloaded files."],
            points: [
                "A price comparison sheet: export as Excel with one row per product. Compare At Price minus Price is the discount; Available = FALSE lists what's out of stock. Run the same store next month and look up each row by Handle.",
                "A supplier shortlist: export one supplier catalog per run, keep Title, Vendor, Price, Available and URL, and put the exports in one sheet with a column for the supplier.",
                "A clean import: in the CSV, fill the inventory and cost columns from the client's own data before importing, since a public store never publishes them.",
                "A dated backup of your own store: collect it, export as CSV, and keep the file with its date from History. The images come as ZIPs named by handle.",
            ],
        },
        {
            id: "mistakes",
            eyebrow: "Mistakes",
            heading: "Six mistakes that turn a two-minute export into a long day",
            paragraphs: ["Most of them happen after the export, in the import."],
            points: [
                "Importing into the live store first. Shopify's import has rules the source store may not follow; a test store shows the error rows without touching real products.",
                "Choosing One row per product when the import needs variants. Sizes and colours then arrive as one line. Choose One row per variant for imports and stock checks.",
                "Expecting inventory counts or cost prices in the file. Stores don't publish them, so those columns are empty until the client fills them.",
                "Trying a password-protected store. It can't be read at all. A store that has turned off its public product data gives only what's on the page.",
                "Leaving Use store product data off in Settings → Shopify stores. The run then collects the page's own list, which is a handful of products, not the catalog.",
                "Copying a store that isn't the client's. Moving a client's own catalog is their call; copying someone else's products, images and text is not.",
            ],
        },
    ],
    sites: [{ name: "Any public Shopify store" }, { name: "Shopify stores" }],
    cantDo: {
        heading: "What it won't do",
        items: [
            "Read a password-protected store, or a store that has turned off its public product data. Those fall back to collecting the page's own list.",
            "Produce an import file that needs no review. Shopify's import has rules the source store may not follow; import into a test store first and check the products.",
            "Fill in inventory counts or cost prices. Stores don't publish them, so those columns come from the client.",
            "Collect several stores in one run. Each store is its own run, one after another.",
            "Give you the right to resell the images, text or designs. Moving a client's own catalog is their call; copying someone else's is not.",
        ],
    },
    guides: ["export-a-shopify-store-catalog", "download-all-images-on-a-page"],
    faqs: [
        { q: "Is the Shopify export free?", a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create. There's no per-row limit; image ZIPs split above 5,000 files." },
        { q: "Do I need the client's Shopify admin access?", a: "No. The public product data every Shopify store publishes is enough for the catalog, the variants and the images. Inventory counts and cost prices aren't public, so those come from the client." },
        { q: "How do I import products from one Shopify store to another?", a: "Export the source store with Download Shopify import CSV, then in the destination store go to Products → Import and choose the file. Import into a test store first and check the products before a live store." },
        { q: "How does the import CSV compare with Shopify's own export?", a: "It uses the same product import layout, so Products → Import accepts it. Fields Shopify doesn't publish, such as inventory quantity and cost, are empty and need filling in before or after the import." },
        { q: "Does the export include inventory counts?", a: "No. Public stores don't publish stock counts or cost prices. Available says whether a variant is in stock; the counts come from the client." },
        { q: "Can I collect one collection instead of the whole store?", a: "Yes. Choose the collection on the store card. One collection per run; the whole store is one run too." },
        { q: "Can I scrape several Shopify stores at once?", a: "One store at a time, each in a few clicks. Several stores run one after another; export each and put the files in one sheet." },
        { q: "Does it get every variant's image?", a: "Yes. With One row per variant, each row carries its Variant Image, and Download images saves the files. Turn on Name images by product handle so the files match the CSV." },
        { q: "Can I use the export for competitor price research?", a: "Yes. Export as Excel with one row per product, then run the same store again later and look up each row by Handle. Compare At Price and Price show the discounts." },
        { q: "How long does a big store take?", a: "A thousand products take a minute or two, because the rows come from the store's product feed rather than from page after page. Turning on barcodes and image descriptions makes it slower." },
    ],
};
