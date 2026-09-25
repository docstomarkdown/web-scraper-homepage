import React from "react";
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/landing/SectionHeading";
import Reveal from "@/components/landing/Reveal";

// Native <details> keeps every answer in the HTML (readable by search engines and without JS).
// Pagination and export formats are covered in the Features section, so they're not repeated here.
const GROUPS = [
    {
        title: "Getting started",
        faqs: [
            {
                q: "What's included in the plan?",
                a: "Everything. There's one plan, Pro, with every feature included: chat, ready-made sites, Maps leads and contact details, Shopify catalog export, bulk runs and every export format. Cloud runs are coming soon. No credits, and you can cancel anytime.",
            },
            {
                q: "Do I need an account?",
                a: "The extension works right after you install it. The cloud dashboard, coming soon, will use a Google sign-in.",
            },
            {
                q: "Do I need to know how to code?",
                a: "No. Type what you want in the chat, or click Collect. There are no selectors or scripts to set up.",
            },
            {
                q: "Which websites does it work on?",
                a: "Popular sites such as Amazon, Zillow and Maps have ready-made settings. On other sites, including independent online stores and directories, it detects the lists on the page automatically, and you can point it at a specific area if you need to.",
            },
        ],
    },
    {
        title: "Collecting data",
        faqs: [
            {
                q: "Can I get emails for businesses I find on Maps?",
                a: "Yes, in two steps. First collect the businesses from Maps. Then run Collect contacts on the websites from that list, and it adds the emails, phone numbers and social profiles it finds on each site.",
            },
            {
                q: "Can I use it on sites I log in to, like an MLS or a member directory?",
                a: "Often, yes. It runs in your own browser, so it can read pages you're already signed in to, and it detects lists automatically on sites without a ready-made setup. Check the site's rules on exporting data first; many MLS systems have their own.",
            },
            {
                q: "Will websites block me?",
                a: "Most sites work normally, because it runs in your own browser just like a regular visit. If a site shows a check or asks you to sign in, do that in the tab and carry on.",
            },
            {
                q: "Can it check prices every day on its own?",
                a: "That's coming soon with cloud runs, which can run on a schedule, daily or weekly. For now you run it whenever you need fresh numbers, and each run gives you a new table to compare.",
            },
            {
                q: "What's the difference between the extension and the cloud?",
                a: "The extension runs in your browser, on the page you have open. The cloud, coming soon, will run on our servers: you paste a list of URLs, close your laptop, and download the results later.",
            },
        ],
    },
    {
        title: "Shopify stores",
        faqs: [
            {
                q: "Does it work on any Shopify store?",
                a: "On most of them. It reads the store's public product feed, so you get the whole catalog with variants and images. It can't read password-protected stores, and a few stores block these requests; for those, turn the store feed off in settings and it collects from the page like any other site.",
            },
            {
                q: "Can I import the export into my own Shopify store?",
                a: "Yes. Choose Shopify import CSV when you export, and the file uses Shopify's product import layout. Try it on a test store first, and review the products before importing into a live store.",
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
        <section id="faq" className="py-20 md:py-24 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800/60">
            <div className="max-w-3xl mx-auto px-6 md:px-12">
                <Reveal>
                    <SectionHeading eyebrow="FAQ" title="Questions, answered" />
                </Reveal>

                <div className="mt-12 space-y-10">
                    {GROUPS.map((g, gi) => (
                        <Reveal key={g.title}>
                            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{g.title}</h3>
                            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
                                {g.faqs.map((f, i) => (
                                    <details key={f.q} className="group px-5 md:px-6" open={gi === 0 && i === 0}>
                                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 rounded-lg [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2772ED]">
                                            <h4 className="text-base md:text-[17px] font-semibold text-slate-900 dark:text-white group-open:text-[#2772ED] dark:group-open:text-[#7aa7ff]">
                                                {f.q}
                                            </h4>
                                            <ChevronDown
                                                className="w-5 h-5 shrink-0 text-slate-400 dark:text-slate-500 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                                                aria-hidden="true"
                                            />
                                        </summary>
                                        <p className="pb-5 -mt-1 text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">{f.a}</p>
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
