import React from "react";
import Link from "next/link";
import { ArrowRight, Check, Chrome, Clock } from "lucide-react";
import SectionHeading from "@/components/landing/SectionHeading";
import Reveal from "@/components/landing/Reveal";
import { productConfig } from "@/config/product";

// One plan with everything included. Only cloud features are marked as coming soon.
const INCLUDED = [
    "Chat or click Collect on any page",
    "Ready-made sites and automatic lists",
    "Maps leads and contact details",
    "Shopify store catalog export",
    "Bulk runs on hundreds of URLs",
    "Excel, CSV, JSON and Google Sheets export",
    "AI agents over MCP",
];
const COMING_SOON = ["Cloud runs on our servers", "Scheduled runs, daily or weekly"];

export default function PricingTeaser() {
    return (
        <section id="pricing" className="py-20 md:py-24 bg-white dark:bg-slate-950">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <Reveal>
                    <SectionHeading
                        eyebrow="Pricing"
                        title="One plan. Everything included."
                        intro="No credits to count, no features held back, and you can cancel anytime."
                    />
                </Reveal>

                <Reveal className="mt-12">
                    <div className="rounded-3xl border-2 border-[#2772ED] bg-white dark:bg-slate-900 p-8 md:p-10 shadow-xl shadow-[#2772ED]/10">
                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Pro</h3>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Everything included</p>
                        </div>

                        <ul className="mt-7 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                            {INCLUDED.map((f) => (
                                <li key={f} className="flex items-start gap-2.5 text-[15px] text-slate-700 dark:text-slate-200">
                                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#2772ED]" aria-hidden="true" />
                                    {f}
                                </li>
                            ))}
                            {COMING_SOON.map((f) => (
                                <li key={f} className="flex items-start gap-2.5 text-[15px] text-slate-500 dark:text-slate-400">
                                    <Clock className="w-4 h-4 mt-0.5 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                                    <span>
                                        {f}
                                        <span className="ml-2 whitespace-nowrap rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-300">
                                            Coming soon
                                        </span>
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <Link
                            href={`${productConfig.product.ctaUrl}?utm_source=website&utm_medium=pricing_teaser&utm_campaign=chrome_install`}
                            target="_blank"
                            className="mt-9 group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#2772ED] hover:bg-[#1f5ec2] px-8 py-3.5 text-base font-semibold text-white transition-colors"
                        >
                            <Chrome className="w-5 h-5" aria-hidden="true" />
                            Add to Chrome
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                        </Link>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
