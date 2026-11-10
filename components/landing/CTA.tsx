import React from "react";
import Link from "next/link";
import { ArrowRight, Chrome } from "lucide-react";
import Reveal from "@/components/landing/Reveal";
import { productConfig } from "@/config/product";

export default function CTA() {
    return (
        <section className="bg-white dark:bg-slate-950 px-6 md:px-12">
            {/* Plain on purpose: a hairline above, then the hero's headline treatment and the one blue button. */}
            <div className="max-w-6xl mx-auto border-t border-slate-200 dark:border-slate-800 py-24 md:py-28 text-center">
                <Reveal className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                        Turn your next web page into a{" "}
                        <span className="relative inline-block whitespace-nowrap text-[#2470EB] dark:text-[#7aa7ff]">
                            <span className="relative z-10">spreadsheet.</span>
                            <span className="absolute inset-x-0 -bottom-[0.06em] h-[0.14em] rounded-full bg-[#7CF2C4]" aria-hidden="true" />
                        </span>
                    </h2>
                    <p className="mt-5 text-lg text-slate-700 dark:text-slate-200">Install it, open a page, and ask for the data you want.</p>
                    <Link
                        href={`${productConfig.product.ctaUrl}?utm_source=website&utm_medium=cta_section&utm_campaign=chrome_install`}
                        target="_blank"
                        className="mt-9 group inline-flex items-center justify-center gap-2 rounded-xl bg-[#2470EB] hover:bg-[#1f5ec2] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#2470EB]/30 transition-all hover:-translate-y-px active:scale-[0.98]"
                    >
                        <Chrome className="w-5 h-5" aria-hidden="true" />
                        Add to Chrome
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}
