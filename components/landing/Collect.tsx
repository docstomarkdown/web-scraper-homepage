import React from "react";
import { Briefcase, Home, ListChecks, Mail, MapPin, ShoppingBag } from "lucide-react";
import SectionHeading from "@/components/landing/SectionHeading";
import Reveal from "@/components/landing/Reveal";

const TYPES = [
    {
        icon: MapPin,
        title: "Local business leads",
        body: "Search Maps or a business directory and get every result as a row. Add emails from each business's own website in the same run.",
        fields: ["Name", "Category", "Address", "Phone", "Website", "Rating", "Email"],
        tint: "text-rose-500 bg-rose-50 dark:bg-rose-950/40",
    },
    {
        icon: ShoppingBag,
        title: "Product prices and reviews",
        body: "Pull a store's product list across every page, then open each product for its full details and customer reviews.",
        fields: ["Product", "Price", "Sale price", "Rating", "Reviews", "Seller", "Image"],
        tint: "text-amber-500 bg-amber-50 dark:bg-amber-950/40",
    },
    {
        icon: Home,
        title: "Property listings",
        body: "Collect homes for sale or rent with price, size and location, ready to sort and compare in a spreadsheet.",
        fields: ["Address", "Price", "Beds", "Baths", "Sq ft", "Listing link"],
        tint: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40",
    },
    {
        icon: Briefcase,
        title: "Job posts",
        body: "Turn a job search into a clean list of roles you can filter by company, location and pay.",
        fields: ["Role", "Company", "Location", "Salary", "Posted", "Job link"],
        tint: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40",
    },
    {
        icon: Mail,
        title: "Emails and contact details",
        body: "Give it a list of websites and it finds the contact emails, phone numbers and social profiles on each one.",
        fields: ["Website", "Email", "Phone", "Social profiles"],
        tint: "text-sky-500 bg-sky-50 dark:bg-sky-950/40",
    },
    {
        icon: ListChecks,
        title: "Any list on any page",
        body: "On sites without a ready-made setup, it spots the lists on the page for you. Pick one and it names the columns and follows every page.",
        fields: ["Automatic columns", "Next page", "Load more", "Infinite scroll"],
        tint: "text-[#2772ED] bg-[#2772ED]/10",
    },
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

                <Reveal>
                    <p className="mt-10 text-center text-[15px] text-slate-500 dark:text-slate-400">
                        Also: reviews, hotels and travel, cars, events, research papers, images, links and full page text.
                    </p>
                </Reveal>
            </div>
        </section>
    );
}
