import React from "react";
import Link from "next/link";
import { ArrowRight, Chrome } from "lucide-react";
import Reveal from "@/components/landing/Reveal";
import { productConfig } from "@/config/product";

export default function CTA() {
    return (
        <section className="relative overflow-hidden py-24 md:py-28 bg-slate-50/70 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800/60">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div
                    className="absolute inset-0 text-slate-300 dark:text-slate-700"
                    style={{
                        backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                        maskImage: "radial-gradient(ellipse 60% 70% at 50% 50%, black 20%, transparent 75%)",
                        WebkitMaskImage: "radial-gradient(ellipse 60% 70% at 50% 50%, black 20%, transparent 75%)",
                        opacity: 0.6,
                    }}
                />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[360px] rounded-full bg-gradient-to-tr from-[#2772ED]/20 via-[#7c3aed]/10 to-[#06b6d4]/15 blur-[100px]" />
            </div>

            <div className="relative max-w-3xl mx-auto px-6 md:px-12 text-center">
                <Reveal>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                        Turn your next web page into a{" "}
                        <span className="bg-gradient-to-r from-[#2772ED] via-[#4f46e5] to-[#7c3aed] dark:from-[#5b9bff] dark:via-[#818cf8] dark:to-[#a78bfa] bg-clip-text text-transparent">
                            spreadsheet.
                        </span>
                    </h2>
                    <p className="mt-5 text-lg text-slate-600 dark:text-slate-300">Install it, open a page, and ask for the data you want.</p>
                    <Link
                        href={`${productConfig.product.ctaUrl}?utm_source=website&utm_medium=cta_section&utm_campaign=chrome_install`}
                        target="_blank"
                        className="mt-9 group inline-flex items-center justify-center gap-2 rounded-xl bg-[#2772ED] hover:bg-[#1f5ec2] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#2772ED]/25 transition-all hover:-translate-y-px active:scale-[0.98]"
                    >
                        <Chrome className="w-5 h-5" aria-hidden="true" />
                        Add to Chrome — it&apos;s free
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}
