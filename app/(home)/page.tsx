import React from "react";
import Hero from "@/components/landing/Hero";
import Collect from "@/components/landing/Collect";
import HowItWorks from "@/components/landing/HowItWorks";
import Capabilities from "@/components/landing/Capabilities";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";

export const metadata = {
    title: { absolute: "Web Scraper Pro: Free Web Scraper Chrome Extension, No Code" },
    alternates: { canonical: "/" },
    description:
        "Turn any web page into a spreadsheet. Collect Amazon products, Zillow listings and any list on any site in one click, then export to Google Sheets, Excel or CSV. Free Chrome extension, no code.",
};

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
            <main id="main" className="flex-1">
                <Hero />
                <Collect />
                <HowItWorks />
                <Capabilities />
                <FAQ />
                <CTA />
            </main>
        </div>
    );
}
