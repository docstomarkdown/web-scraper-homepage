import React from "react";
import Hero from "@/components/landing/Hero";
import Collect from "@/components/landing/Collect";
import HowItWorks from "@/components/landing/HowItWorks";
import Sites from "@/components/landing/Sites";
import Capabilities from "@/components/landing/Capabilities";
import Cloud from "@/components/landing/Cloud";
import Developers from "@/components/landing/Developers";
import PricingTeaser from "@/components/landing/PricingTeaser";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export const metadata = {
    title: "Web Scraper",
    description:
        "Turn any web page into a spreadsheet. Collect Maps leads, Amazon products, and Zillow listings in one click, then export to Google Sheets, Excel, or CSV. Free Chrome extension.",
};

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
            <main className="flex-1">
                <Hero />
                <Collect />
                <HowItWorks />
                <Sites />
                <Capabilities />
                <Cloud />
                <Developers />
                <PricingTeaser />
                <FAQ />
                <CTA />
            </main>
            <Footer />
        </div>
    );
}
