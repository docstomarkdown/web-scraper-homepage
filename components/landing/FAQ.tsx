import React from "react";
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/landing/SectionHeading";
import Reveal from "@/components/landing/Reveal";
import { JsonLd, faqJsonLd } from "@/components/seo/JsonLd";

// Native <details> keeps every answer in the HTML (readable by search engines and without JS).
// Pagination and export formats are covered in the sections above, so they're not repeated here. Trimmed to the questions
// people ask before installing (2026-11-10); the Shopify questions are on /shopify-scraper.
const GROUPS = [
    {
        title: "Getting started",
        faqs: [
            {
                q: "Is it free?",
                a: "Yes. Every feature is included, with no paid plan, credits or trial that ends. Chat has a daily message limit; the List and Properties tabs work without it.",
            },
            {
                q: "Do I need an account?",
                a: "No. The extension works right after you install it.",
            },
            {
                q: "Which websites does it work on?",
                a: "Popular sites such as Amazon, Zillow and Yellow Pages have ready-made settings. On other sites, including independent online stores and directories, it detects the lists on the page automatically, and you can point it at a specific area if you need to.",
            },
        ],
    },
    {
        title: "Collecting data",
        faqs: [
            {
                q: "Can I get emails for a list of businesses?",
                a: "Yes. Collect the businesses from a directory, or paste a list of websites, and Web Scraper Pro reads each business's own website for the emails, phone numbers and social links it publishes, adding them to that business's row. Businesses that don't publish an email still come back with their phone and website.",
            },
            {
                q: "Can I use it on sites I log in to, like an MLS or a member directory?",
                a: "Often, yes. It runs in your own browser, so it can read pages you're already signed in to, and it detects lists automatically on sites without a ready-made setup. Check the site's rules on exporting data first; many MLS systems have their own.",
            },
            {
                q: "Will websites block me?",
                a: "It runs in your own browser, so a site sees a regular visit. If a site shows a check or asks you to sign in, do that in the tab and carry on.",
            },
            {
                q: "What's the difference between the extension and the cloud?",
                a: "The extension runs in your browser, on the page you have open. The cloud, coming soon, will run on our servers: you paste a list of URLs, close your laptop, and download the results later.",
            },
        ],
    },
    {
        title: "Your data",
        faqs: [
            {
                q: "Where is my data stored?",
                a: "What you collect with the extension is saved in your browser until you export it. Chat messages are processed on our servers to work out what to collect.",
            },
            {
                q: "Is web scraping legal?",
                a: "Collecting publicly available data is generally allowed, but it depends on the website's terms, the kind of data and the laws where you are. Only collect data you're allowed to use, and take extra care with personal data. This isn't legal advice.",
            },
        ],
    },
];

export default function FAQ() {
    return (
        <section id="faq" className="py-20 md:py-24 bg-white dark:bg-slate-950">
            <JsonLd data={faqJsonLd(GROUPS.flatMap((g) => g.faqs))} />
            <div className="max-w-3xl mx-auto px-6 md:px-12">
                <Reveal>
                    <SectionHeading eyebrow="FAQ" title="Questions, answered" />
                </Reveal>

                <div className="mt-12 space-y-10">
                    {GROUPS.map((g, gi) => (
                        <Reveal key={g.title}>
                            <h3 className="mb-3 text-base font-semibold text-slate-700 dark:text-slate-200">{g.title}</h3>
                            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
                                {g.faqs.map((f, i) => (
                                    <details key={f.q} className="group px-5 md:px-6" open={gi === 0 && i === 0}>
                                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 rounded-lg [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2772ED]">
                                            <h4 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white group-open:text-[#1f5ec2] dark:group-open:text-[#7aa7ff]">
                                                {f.q}
                                            </h4>
                                            <ChevronDown
                                                className="w-5 h-5 shrink-0 text-slate-600 dark:text-slate-300 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                                                aria-hidden="true"
                                            />
                                        </summary>
                                        <p className="pb-5 -mt-1 text-base text-slate-700 dark:text-slate-200 leading-[1.65]">{f.a}</p>
                                    </details>
                                ))}
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
