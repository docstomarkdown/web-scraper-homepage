import React from "react";
import Link from "next/link";
import { ArrowRight, Chrome } from "lucide-react";
import Reveal from "@/components/landing/Reveal";
import { productConfig } from "@/config/product";

export default function CTA() {
    return (
        <section className="relative overflow-hidden py-24 md:py-28 bg-[#2470EB]">
            {/* Background: masked dot grid + a soft mint glow (decorative) */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div
                    className="absolute inset-0 text-white"
                    style={{
                        backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                        maskImage: "radial-gradient(ellipse 60% 70% at 50% 50%, black 20%, transparent 75%)",
                        WebkitMaskImage: "radial-gradient(ellipse 60% 70% at 50% 50%, black 20%, transparent 75%)",
                        opacity: 0.18,
                    }}
                />
                <div className="absolute -right-24 -bottom-32 w-[520px] h-[360px] rounded-full bg-[#7CF2C4]/20 blur-[110px]" />
            </div>

            <div className="relative max-w-3xl mx-auto px-6 md:px-12 text-center">
                <Reveal>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                        Turn your next web page into a{" "}
                        <span className="text-[#7CF2C4]">
                            spreadsheet.
                        </span>
                    </h2>
                    <p className="mt-5 text-lg text-white">Install it, open a page, and ask for the data you want.</p>
                    <Link
                        href={`${productConfig.product.ctaUrl}?utm_source=website&utm_medium=cta_section&utm_campaign=chrome_install`}
                        target="_blank"
                        className="mt-9 group inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-100 px-8 py-4 text-base font-semibold text-[#1f5ec2] shadow-lg shadow-slate-900/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all hover:-translate-y-px active:scale-[0.98]"
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
