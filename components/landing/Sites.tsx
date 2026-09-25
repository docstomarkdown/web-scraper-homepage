import React from "react";
import { Plus } from "lucide-react";
import SectionHeading from "@/components/landing/SectionHeading";
import Reveal from "@/components/landing/Reveal";

// Sites with tuned, ready-made settings in the extension. Names only (no logos).
// Keep this to sites whose setup is actually tuned; generic fallback packs don't belong here.
const GROUPS = [
    { label: "Maps and directories", sites: ["Maps", "Yellow Pages", "Manta"] },
    { label: "Shopify", sites: ["Any Shopify store: full catalog"] },
    {
        label: "Online stores",
        sites: ["Amazon", "Walmart", "Target", "Etsy", "Costco", "Wayfair", "Newegg", "Lowe's", "Nike", "Zara", "Flipkart", "Allegro"],
    },
    { label: "Real estate", sites: ["Zillow", "Realtor.com", "Rightmove"] },
    { label: "Travel", sites: ["Booking.com", "Hotels.com", "Tripadvisor"] },
    { label: "Jobs, cars and software", sites: ["Monster", "CarGurus", "Capterra", "Product Hunt"] },
];

export default function Sites() {
    return (
        <section id="ready-made-sites" className="py-20 md:py-24 bg-white dark:bg-slate-950">
            <div className="max-w-5xl mx-auto px-6 md:px-12">
                <Reveal>
                    <SectionHeading
                        eyebrow="Ready-made sites"
                        title="Tuned for the sites you already use"
                        intro="Popular sites come with ready-made settings, so the right columns show up with no setup. Everything else is detected automatically."
                    />
                </Reveal>

                <Reveal className="mt-12">
                    <dl className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
                        {GROUPS.map((g) => (
                            <div key={g.label} className="grid md:grid-cols-[200px_1fr] gap-3 md:gap-6 px-5 py-4 md:px-6 md:py-5">
                                <dt className="text-sm font-semibold text-slate-900 dark:text-white md:pt-1">{g.label}</dt>
                                <dd className="flex flex-wrap gap-2">
                                    {g.sites.map((site) => (
                                        <span
                                            key={site}
                                            className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-1 text-sm text-slate-700 dark:text-slate-200"
                                        >
                                            {site}
                                        </span>
                                    ))}
                                </dd>
                            </div>
                        ))}
                        <div className="grid md:grid-cols-[200px_1fr] gap-3 md:gap-6 px-5 py-4 md:px-6 md:py-5">
                            <dt className="text-sm font-semibold text-slate-900 dark:text-white md:pt-1">Everything else</dt>
                            <dd>
                                <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-[#2772ED]/40 bg-[#2772ED]/5 px-3 py-1 text-sm text-[#1f5ec2] dark:text-[#7aa7ff]">
                                    <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                                    Any site with a list, like independent online stores and directories: detected automatically
                                </span>
                            </dd>
                        </div>
                    </dl>
                </Reveal>
            </div>
        </section>
    );
}
