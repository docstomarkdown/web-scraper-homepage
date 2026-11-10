import React from "react";
import Link from "next/link";
import { ArrowRight, Chrome } from "lucide-react";
import Reveal from "@/components/landing/Reveal";
import { productConfig } from "@/config/product";

export default function CTA() {
    return (
        <section className="bg-white dark:bg-slate-950 px-6 md:px-12 pb-20 md:pb-24">
            {/* A soft tinted panel, so the page closes on the same blue button and headline treatment as the hero. */}
            <div className="relative overflow-hidden max-w-6xl mx-auto rounded-3xl border border-[#2772ED]/15 dark:border-slate-800 bg-gradient-to-br from-[#2772ED]/[0.07] via-white to-[#7CF2C4]/20 dark:from-[#2772ED]/20 dark:via-slate-900 dark:to-[#7CF2C4]/10 px-6 py-16 md:py-20 text-center">
                <div
                    className="absolute inset-0 pointer-events-none text-[#2772ED]/30 dark:text-slate-600"
                    aria-hidden="true"
                    style={{
                        backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                        maskImage: "radial-gradient(ellipse 60% 70% at 50% 50%, black 10%, transparent 75%)",
                        WebkitMaskImage: "radial-gradient(ellipse 60% 70% at 50% 50%, black 10%, transparent 75%)",
                        opacity: 0.5,
                    }}
                />
                <Reveal className="relative max-w-3xl mx-auto">
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
