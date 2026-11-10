import React from "react";
import Link from "next/link";
import { BookUser, Home, ListChecks, Mail, ShoppingBag, Store } from "lucide-react";
import SectionHeading from "@/components/landing/SectionHeading";
import Reveal from "@/components/landing/Reveal";
import { publishedHref, type PageKind } from "@/config/pages";
import { scraperPages } from "@/content/scrapers";

// The ready-made sites hub is linked once it has a live site page (spam review, 2026-11-10).
const sitesHubLive = Object.values(scraperPages).some((c) => c.status === "published");

const TYPES: {
    icon: typeof ListChecks;
    title: string;
    body: string;
    fields: string[];
    /** Page this card leads to, shown once that page is published. */
    link?: { slug: string; kind?: PageKind; text: string };
}[] = [
    {
        icon: ListChecks,
        title: "Any list on any page",
        body: "On sites without a ready-made setup, it spots the lists on the page for you. Pick one and it names the columns and follows every page.",
        fields: ["Next page", "Load more", "Infinite scroll", "Automatic columns"],
        link: { slug: "list-scraper", text: "Collect lists from any website" },
    },
    {
        icon: ShoppingBag,
        title: "Product prices and reviews",
        body: "Pull a store's product list across every page, then open each product for its full details and customer reviews.",
        fields: ["Product", "Price", "Sale price", "Rating", "Reviews", "Seller", "Image"],
        link: { slug: "product-scraper", text: "Collect product details and reviews" },
    },
    {
        icon: Home,
        title: "Property listings",
        body: "Collect homes for sale or rent with price, size and location, ready to sort and compare in a spreadsheet.",
        fields: ["Address", "Price", "Beds", "Baths", "Sq ft", "Photos", "Listing link"],
        link: { slug: "real-estate", kind: "use-case", text: "Collect property listings" },
    },
    {
        icon: Mail,
        title: "Emails and contact details",
        body: "Give it a list of websites, or the websites from a list you've already collected, and it finds the emails, phone numbers and social profiles on each one.",
        fields: ["Website", "Email", "Phone", "Social profiles"],
        link: { slug: "email-extractor", text: "Get emails from a list of websites" },
    },
    {
        icon: BookUser,
        title: "Business directory leads",
        body: "Search Yellow Pages, Justdial, BBB or any business directory and get every listing as a row, then add the emails and social links from each business's own website.",
        fields: ["Name", "Category", "Address", "Phone", "Website", "Rating", "Email"],
        link: { slug: "lead-generation", kind: "use-case", text: "Build a lead list from directories" },
    },
    {
        icon: Store,
        title: "Shopify stores",
        body: "Open a Shopify store and get its whole catalog at once, one row per product or variant, with a Shopify import CSV.",
        fields: ["Title", "Variant", "SKU", "Price", "Compare-at price", "Images"],
        link: { slug: "shopify-scraper", text: "Export a Shopify store's catalog" },
    },
];

export default function Collect() {
    return (
        <section id="what-you-can-collect" className="py-20 md:py-24 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <Reveal>
                    <SectionHeading
                        eyebrow="What you can collect"
                        title="The data you need, in named columns"
                        intro="Ready-made for popular sites, automatic everywhere else. Each comes back as a table you can export."
                    />
                </Reveal>

                <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {TYPES.map((t, i) => (
                        <Reveal key={t.title} delay={i * 0.05}>
                            <article className="h-full flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 transition-shadow hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-black/30">
                                <span className={`inline-flex w-10 h-10 items-center justify-center rounded-xl bg-[#2772ED]/10 text-[#1f5ec2] dark:text-[#7aa7ff]`} aria-hidden="true">
                                    <t.icon className="w-5 h-5" />
                                </span>
                                <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">{t.title}</h3>
                                <p className="mt-2.5 text-base text-slate-700 dark:text-slate-200 leading-[1.65]">{t.body}</p>
                                {/* One row of chips: the row is one chip tall and clips the ones that wrap, at any card width. */}
                                <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-4 h-[26px] overflow-hidden" aria-label={`Columns for ${t.title.toLowerCase()}`}>
                                    {t.fields.map((f) => (
                                        <li
                                            key={f}
                                            className="rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-2 py-0.5 text-sm text-slate-700 dark:text-slate-200"
                                        >
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                {t.link && publishedHref(t.link.slug, t.link.kind) && (
                                    <Link
                                        href={publishedHref(t.link.slug, t.link.kind)!}
                                        className="mt-auto pt-6 inline-block text-sm font-semibold text-[#1f5ec2] dark:text-[#7aa7ff] hover:underline"
                                    >
                                        {t.link.text} →
                                    </Link>
                                )}
                            </article>
                        </Reveal>
                    ))}
                </div>

                <Reveal className="mt-8">
                    <p className="text-center text-base text-slate-700 dark:text-slate-200 leading-[1.65]">
                        Also collects from Google Maps. For Maps-only lead lists,{" "}
                        <a href="https://mapsscraper.pro/" target="_blank" rel="noopener" className="font-semibold text-[#1f5ec2] dark:text-[#7aa7ff] underline underline-offset-2">
                            Maps Scraper Pro
                        </a>{" "}
                        is the same engine, Maps only.
                    </p>
                </Reveal>

                <Reveal className="mt-10">
                    {/* The ready-made sites in one line (homepage trim, 2026-11-10): the full list, by category, is on /scrapers.
                        Names are the sites with their own page in content/sites.ts. */}
                    <p className="text-center text-base text-slate-700 dark:text-slate-200 leading-[1.65]">
                        <span className="font-semibold text-slate-900 dark:text-white">Ready-made</span> for Amazon, eBay, Walmart, Etsy, Zillow,
                        Rightmove, Yellow Pages, Justdial, BBB, Hotels.com, Google Scholar and YouTube, and any list on any other site.
                        {sitesHubLive && (
                            <>
                                {" "}
                                <Link href="/scrapers" className="font-semibold text-[#1f5ec2] dark:text-[#7aa7ff] underline underline-offset-2">
                                    Every ready-made site
                                </Link>
                            </>
                        )}
                    </p>
                </Reveal>
            </div>
        </section>
    );
}
