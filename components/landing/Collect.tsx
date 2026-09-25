import React from "react";
import { BookOpen, Briefcase, Calendar, Car, FileText, Home, Image, ListChecks, Mail, MapPin, MessageSquareQuote, Plane, ShoppingBag } from "lucide-react";
import SectionHeading from "@/components/landing/SectionHeading";
import Reveal from "@/components/landing/Reveal";

const TYPES = [
    {
        icon: MapPin,
        title: "Local business leads",
        body: "Search Maps or a business directory and get every result as a row. Then collect emails from each business's own website in one more step.",
        fields: ["Name", "Category", "Address", "Phone", "Website", "Rating", "Email"],
        goodFor: "building prospect lists by city and niche, finding local partners, sizing up competitors nearby.",
        tint: "text-rose-500 bg-rose-50 dark:bg-rose-950/40",
    },
    {
        icon: ShoppingBag,
        title: "Product prices and reviews",
        body: "Pull a store's product list across every page, then open each product for its full details and customer reviews.",
        fields: ["Product", "Price", "Sale price", "Rating", "Reviews", "Seller", "Image"],
        goodFor: "checking competitor prices, researching what sells, gathering reviews for product ideas.",
        tint: "text-amber-500 bg-amber-50 dark:bg-amber-950/40",
    },
    {
        icon: Home,
        title: "Property listings",
        body: "Collect homes for sale or rent with price, size and location, ready to sort and compare in a spreadsheet.",
        fields: ["Address", "Price", "Beds", "Baths", "Sq ft", "Photos", "Listing link"],
        goodFor: "comparing homes in a neighbourhood, pulling this week's new listings, building a list of rentals.",
        tint: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40",
    },
    {
        icon: Briefcase,
        title: "Job posts",
        body: "Turn a job board search or a company's careers page into a clean list of roles you can filter by company, location and pay.",
        fields: ["Role", "Company", "Location", "Salary", "Posted", "Job link"],
        goodFor: "seeing who is hiring, tracking openings on company careers pages, researching salaries.",
        tint: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40",
    },
    {
        icon: Mail,
        title: "Emails and contact details",
        body: "Give it a list of websites, or the websites from a list you've already collected, and it finds the emails, phone numbers and social profiles on each one.",
        fields: ["Website", "Email", "Phone", "Social profiles"],
        goodFor: "adding contact details to a list of companies before outreach.",
        tint: "text-sky-500 bg-sky-50 dark:bg-sky-950/40",
    },
    {
        icon: ListChecks,
        title: "Any list on any page",
        body: "On sites without a ready-made setup, it spots the lists on the page for you. Pick one and it names the columns and follows every page.",
        fields: ["Automatic columns", "Next page", "Load more", "Infinite scroll"],
        goodFor: "directories, event lists, catalogues and tables on any other site.",
        tint: "text-[#2772ED] bg-[#2772ED]/10",
    },
];

// Smaller data types, one line each (all supported by the extension today).
const MORE = [
    { icon: MessageSquareQuote, title: "Reviews", body: "Ratings, titles and review text, across every page of reviews." },
    { icon: Plane, title: "Hotels and travel", body: "Hotel names, prices, ratings and locations from travel sites." },
    { icon: Car, title: "Cars", body: "Car listings with their prices and details." },
    { icon: Calendar, title: "Events", body: "Event names, dates and places from event listings." },
    { icon: BookOpen, title: "Research papers", body: "Titles, authors, sources, snippets and full-text links from Scholar search results." },
    { icon: Image, title: "Images and links", body: "Every image or link on a page, with its web address." },
    { icon: FileText, title: "Page text", body: "A page's readable text, saved as a document or ready to paste into an AI tool." },
];

export default function Collect() {
    return (
        <section id="what-you-can-collect" className="py-20 md:py-24 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <Reveal>
                    <SectionHeading
                        eyebrow="What you can collect"
                        title="The data you need, in named columns"
                        intro="Ready-made for popular sites, automatic everywhere else. Every type below comes back as a clean table."
                    />
                </Reveal>

                <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {TYPES.map((t, i) => (
                        <Reveal key={t.title} delay={i * 0.05}>
                            <article className="h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 transition-shadow hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-black/30">
                                <span className={`inline-flex w-10 h-10 items-center justify-center rounded-xl ${t.tint}`} aria-hidden="true">
                                    <t.icon className="w-5 h-5" />
                                </span>
                                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{t.title}</h3>
                                <p className="mt-2 text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">{t.body}</p>
                                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                    <span className="font-medium text-slate-700 dark:text-slate-200">Good for:</span> {t.goodFor}
                                </p>
                                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`Columns for ${t.title.toLowerCase()}`}>
                                    {t.fields.map((f) => (
                                        <li
                                            key={f}
                                            className="rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-2 py-0.5 text-xs text-slate-600 dark:text-slate-300"
                                        >
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        </Reveal>
                    ))}
                </div>

                <Reveal className="mt-14">
                    <h3 className="text-center text-sm font-semibold text-slate-900 dark:text-white">More you can collect</h3>
                    <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
                        {MORE.map((m) => (
                            <li key={m.title} className="flex gap-3">
                                <m.icon className="w-4 h-4 mt-0.5 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{m.title}</h4>
                                    <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{m.body}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </div>
        </section>
    );
}
