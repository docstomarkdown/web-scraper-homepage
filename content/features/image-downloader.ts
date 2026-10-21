import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Facts checked against release 1.3.0 (branch test-branch-1) on 2026-10-20:
// - Images tab "Collect images from this page", images grouped by size, "Download all" or "Download" per group as a
//   ZIP, real sizes and clean ZIPs since 1.3.0: components/scraper/ (Images tab), git log 2026-10-05..20
// - Product image galleries in product details; Shopify image ZIPs of up to 5,000 named by handle: lib/pdp/,
//   lib/shopifyMode/

export const imageDownloader: FeaturePageContent = {
    page: getPage("image-downloader"),
    meta: {
        title: "Image Downloader: Save Every Image on a Page as a ZIP",
        description:
            "Collect all the images on a web page, grouped by size, and download them in one ZIP file, or the images of a whole Shopify catalog.",
    },
    eyebrow: "Image downloader",
    h1: "Download every image on a page in one go",
    intro:
        "Open a page, collect its images, and save them all as one ZIP file. Images are grouped by size, so you can take the large product photos and leave the icons behind.",
    lastUpdated: "2026-10-20",
    hero: "ext/images-tab-groups",
    fields: {
        eyebrow: "What you get",
        heading: "The images, at their real size",
        items: [
            { name: "Every image on the page", description: "Photos, product shots and graphics the page shows, including ones that load as you scroll." },
            { name: "Grouped by size", description: "Images with the same dimensions sit in one group, such as 800 × 800, with a count, largest first, so you download the photos and leave the icons behind." },
            { name: "One ZIP file", description: "Download all, or one group, as a single ZIP with the files at their original size." },
            { name: "Product and catalog images", description: "A product page's gallery comes with its product details; a Shopify store's images come with the catalog export, named by product if you choose." },
        ],
    },
    steps: {
        heading: "Three clicks",
        items: [
            {
                title: "Open the page",
                points: ["Scroll to the bottom once so images that load as you scroll are on the page, then scroll back up."],
                screenshot: "ext/images-tab",
                body: "Go to the page with the images and open the side panel's Images tab.",
            },
            {
                title: "Click Collect images from this page",
                points: ["Groups are by exact size, such as 800 × 800, largest first, each with a count. Show N more opens the rest of a group.", "Icons, logos, sprites and tracking pixels are left out. An image that appears several times is kept once."],
                screenshot: "ext/images-tab-groups",
                body: "The images appear grouped by size, with a count for each group.",
            },
            {
                title: "Download",
                points: ["The ZIP is named after the site, such as store.example-images.zip. More than 5,000 files split into parts.", "Scrolled further and more images loaded? Click Rescan."],
                body: "Click Download all for everything, or Download on one group. The ZIP file saves to your Downloads folder.",
            },
        ],
    },
    sections: [
        {
            id: "pushback",
            eyebrow: "When the images aren't there",
            heading: "Why a page gives small images, or fewer than you expected",
            paragraphs: ["The extension saves each image at the size the page serves it, and only the images the page has loaded."],
            points: ["A listing page often serves a small version and the product page the full one. Collect on the product page when size matters.", "Images that load as you scroll aren't on the page until you've scrolled there. Scroll, then Rescan.", "Images drawn as backgrounds by CSS, or inside embedded players, aren't part of the page's image list."],
        },
    ],
    limits: {
        heading: "Good to know",
        items: [
            "It collects the images the page serves to your browser, at the size the page serves them. Some sites serve a smaller version on the listing page and the full size on the product page.",
            "One page at a time. For every product image in a Shopify store, use Shopify store export.",
            "The ZIP is named after the site, such as store.example-images.zip, and splits into parts above 5,000 files.",
            "Images belong to whoever published them. Check the site's terms and copyright before reusing them.",
        ],
    },
    useCases: {
        heading: "What people use it for",
        items: [
            { title: "Product photos", body: "A supplier's or your own listing's photos, saved in one go for a catalog or a listing." },
            { title: "Design references", body: "Every image from a mood board or portfolio page, sorted by size." },
            { title: "Archiving", body: "A dated copy of a page's images before it changes." },
        ],
    },
    faqs: [
        {
            q: "Does it get the full-size images?",
            a: "It saves images at the size the page serves them. Where a page links to a larger version, open that page and collect there; product pages usually serve the full gallery.",
        },
        {
            q: "Can I download images from many pages?",
            a: "One page at a time from the Images tab. For a Shopify store, the catalog export downloads every product's images as ZIP files of up to 5,000 images.",
        },
        {
            q: "Is this free?",
            a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create.",
        },
        {
            q: "Where do the files go?",
            a: "To your browser's Downloads folder, as one ZIP named after the site. Chrome may ask once for permission to save several files.",
        },
        {
            q: "Why are some images small?",
            a: "They're saved at the size the page serves them. Open the page that shows the full-size version, usually the product page, and collect there.",
        },
    ],
    related: ["product-scraper", "shopify-scraper", "list-scraper"],
};
