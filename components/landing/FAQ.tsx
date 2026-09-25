import React from "react";
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/landing/SectionHeading";
import Reveal from "@/components/landing/Reveal";

// Native <details> keeps every answer in the HTML (readable by search engines and without JS).
const FAQS = [
    {
        q: "Is Web Scraper Pro free?",
        a: "Yes. The Chrome extension is free to install and use. Paid plans with more volume and cloud runs are coming soon.",
    },
    {
        q: "Do I need an account?",
        a: "Not for the extension: install it and start collecting. The cloud dashboard uses a Google sign-in.",
    },
    {
        q: "Do I need to know how to code?",
        a: "No. Type what you want in the chat, or click Collect. There are no selectors or scripts to set up.",
    },
    {
        q: "Which websites does it work on?",
        a: "Popular sites such as Amazon, Zillow and Maps have ready-made settings. On other sites, including independent online stores and directories, it detects the lists on the page automatically, and you can point it at a specific area if you need to.",
    },
    {
        q: "Can I get emails for businesses I find on Maps?",
        a: "Yes, in two steps. First collect the businesses from Maps. Then run Collect contacts on the websites from that list, and it adds the emails, phone numbers and social profiles it finds on each site.",
    },
    {
        q: "Will it get every page of results, not just the first?",
        a: "Yes. It clicks through next-page buttons, presses “Load more” and keeps scrolling pages that load as you go, until the list ends.",
    },
    {
        q: "Can I use it on sites I log in to, like an MLS or a member directory?",
        a: "Often, yes. It runs in your own browser, so it can read pages you're already signed in to, and it detects lists automatically on sites without a ready-made setup. Check the site's rules on exporting data first; many MLS systems have their own.",
    },
    {
        q: "Can it check prices every day on its own?",
        a: "That's coming with Pro: scheduled cloud runs, daily or weekly. Today you run it whenever you need fresh numbers, and each run gives you a new table to compare.",
    },
    {
        q: "Will websites block me?",
        a: "Most sites work normally, because it runs in your own browser just like a regular visit. If a site shows a check or asks you to sign in, do that in the tab and carry on.",
    },
    {
        q: "What can I export to?",
        a: "Excel (XLSX), CSV, JSON and Google Sheets. Full page text can also be saved as a Word document.",
    },
    {
        q: "What's the difference between the extension and the cloud?",
        a: "The extension runs in your browser, on the page you have open. The cloud runs on our servers: you paste a list of URLs, close your laptop, and download the results later.",
    },
    {
        q: "Where is my data stored?",
        a: "What you collect with the extension is saved in your browser until you export it. Chat messages are processed on our servers to work out what to collect.",
    },
    {
        q: "Is web scraping legal?",
        a: "Collecting publicly available data is generally allowed, but it depends on the website's terms, the kind of data and the laws where you are. Only collect data you're allowed to use, and take extra care with personal data. This isn't legal advice.",
    },
];

export default function FAQ() {
    return (
        <section id="faq" className="py-20 md:py-24 bg-white dark:bg-slate-950">
            <div className="max-w-3xl mx-auto px-6 md:px-12">
                <Reveal>
                    <SectionHeading eyebrow="FAQ" title="Questions, answered" />
                </Reveal>

                <Reveal className="mt-12">
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
                        {FAQS.map((f, i) => (
                            <details key={f.q} className="group px-5 md:px-6" open={i === 0}>
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                                    <h3 className="text-base md:text-[17px] font-semibold text-slate-900 dark:text-white group-open:text-[#2772ED] dark:group-open:text-[#7aa7ff]">
                                        {f.q}
                                    </h3>
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
            </div>
        </section>
    );
}
