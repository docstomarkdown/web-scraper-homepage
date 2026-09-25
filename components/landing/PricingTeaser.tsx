import React from "react";
import Link from "next/link";
import { ArrowRight, Check, Chrome } from "lucide-react";
import SectionHeading from "@/components/landing/SectionHeading";
import Reveal from "@/components/landing/Reveal";
import { productConfig } from "@/config/product";

const FREE = [
    "Chat or click Collect on any page",
    "Ready-made sites and automatic lists",
    "Export to Excel, CSV, JSON or Google Sheets",
];
const PAID = ["Higher monthly volume", "Larger bulk runs", "Cloud runs on our servers"];

export default function PricingTeaser() {
    return (
        <section id="pricing" className="py-20 md:py-24 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800/60">
            <div className="max-w-5xl mx-auto px-6 md:px-12">
                <Reveal>
                    <SectionHeading
                        eyebrow="Pricing"
                        title="Start free. Upgrade when you need more."
                        intro="Simple monthly plans with no credits to count, and you can cancel anytime."
                    />
                </Reveal>

                <div className="mt-12 grid md:grid-cols-2 gap-5">
                    <Reveal>
                        <div className="h-full rounded-2xl border-2 border-[#2772ED] bg-white dark:bg-slate-900 p-7 shadow-lg shadow-[#2772ED]/10">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Free</h3>
                            <p className="mt-1 text-[15px] text-slate-600 dark:text-slate-300">The Chrome extension, ready to use today.</p>
                            <ul className="mt-5 space-y-2.5">
                                {FREE.map((f) => (
                                    <li key={f} className="flex items-start gap-2.5 text-[15px] text-slate-700 dark:text-slate-200">
                                        <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#2772ED]" aria-hidden="true" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={`${productConfig.product.ctaUrl}?utm_source=website&utm_medium=pricing_teaser&utm_campaign=chrome_install`}
                                target="_blank"
                                className="mt-7 group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2772ED] hover:bg-[#1f5ec2] px-6 py-3 text-base font-semibold text-white transition-colors"
                            >
                                <Chrome className="w-5 h-5" aria-hidden="true" />
                                Add to Chrome — it&apos;s free
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                            </Link>
                        </div>
                    </Reveal>

                    <Reveal delay={0.08}>
                        <div className="h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7">
                            <div className="flex items-center justify-between gap-3">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Pro</h3>
                                <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:text-slate-300">
                                    Coming soon
                                </span>
                            </div>
                            <p className="mt-1 text-[15px] text-slate-600 dark:text-slate-300">For people who collect data every week.</p>
                            <ul className="mt-5 space-y-2.5">
                                {PAID.map((f) => (
                                    <li key={f} className="flex items-start gap-2.5 text-[15px] text-slate-700 dark:text-slate-200">
                                        <Check className="w-4 h-4 mt-0.5 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-7 text-sm text-slate-500 dark:text-slate-400">Everything in Free, plus more room to grow.</p>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
