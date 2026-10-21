import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Facts checked against release 1.3.0 (branch test-branch-1) on 2026-10-20:
// - Images tab "Collect images from this page", images grouped by size, "Download all" or "Download" per group as a
//   ZIP, real sizes and clean ZIPs since 1.3.0: components/scraper/ (Images tab), git log 2026-10-05..20
// - Product image galleries in product details; Shopify image ZIPs of up to 5,000 named by handle: lib/pdp/,
//   lib/shopifyMode/
// Title and headings target what people type ("how to download all images from a website", "... full size",
// "... chrome extension"): youtube-research/AUTOSUGGEST.md and SEARCH_QUERIES.md, 2026-10-21.

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
                screenshot: "ext/images-tab",
            },
            {
                title: "Click Collect images from this page",
                body: "The images appear grouped by exact size, such as 800 × 800, largest first, each with a count. Click Show N more to open the rest of a group.",
                points: ["Scrolled further and more images loaded? Click Rescan."],
                screenshot: "ext/images-tab-groups",
            },
            {
                title: "Click Download all",
                body: "Or click Download on one group to take only the large photos. The ZIP saves to your Downloads folder, named after the site, such as store.example-images.zip.",
                points: ["More than 5,000 images split into several ZIP files.", "Chrome may ask once for permission to save several files."],
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
                "When size matters, open the page that shows the image large, usually the product page, and collect there.",
            ],
        },
        {
            id: "many-pages",
            eyebrow: "Many pages",
            heading: "How to download images from a whole store",
            paragraphs: [
                "The Images tab works one page at a time. For every product image in a Shopify store, use the Shopify scraper: its catalog export downloads the photos as ZIP files of up to 5,000 images, named by product handle if you choose.",
            ],
        },
        {
            id: "pushback",
            eyebrow: "When images are missing",
            heading: "Why a page gives fewer images than you expected",
            paragraphs: ["Only images the page has loaded can be collected."],
            points: [
                "Images that load as you scroll aren't on the page until you've scrolled there. Scroll, then click Rescan.",
                "Images drawn as backgrounds by CSS, or inside embedded players, aren't part of the page's image list.",
                "Icons, logos, sprites and tracking pixels are left out on purpose.",
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
            q: "Can I download all images from a website at once, not one page?",
            a: "One page at a time from the Images tab. For a Shopify store, the catalog export downloads every product's images as ZIP files of up to 5,000 images.",
        },
        {
            q: "Where do the files go?",
            a: "To your browser's Downloads folder, as one ZIP named after the site. Chrome may ask once for permission to save several files.",
        },
        {
            q: "Why are some images small?",
            a: "They're saved at the size the page serves them. Open the page that shows the full-size version, usually the product page, and collect there.",
        },
        {
            q: "Does it pick up images that load as I scroll?",
            a: "Yes, once they've loaded. Scroll to the bottom of the page, then click Rescan in the Images tab.",
        },
    ],
    related: ["product-scraper", "shopify-scraper", "list-scraper"],
};
