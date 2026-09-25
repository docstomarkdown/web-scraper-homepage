import React from "react";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
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
                <Features />
                <FAQ />
                <CTA />
            </main>
            <Footer />
        </div>
    );
}
