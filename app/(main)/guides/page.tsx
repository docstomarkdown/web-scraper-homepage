import type { Metadata } from "next";
import Link from "next/link";
import { getGuides, getAllGuides } from "@/lib/guides";
import { getPage, showPlannedPages } from "@/config/pages";
import SectionHeading from "@/components/landing/SectionHeading";

export const metadata: Metadata = {
    title: "Guides",
    description: "Step-by-step tutorials for collecting data with Web Scraper Pro, each tested on the released extension.",
    alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
    const guides = showPlannedPages ? getAllGuides() : getGuides();
    const features = Array.from(new Set(guides.map((g) => g.feature)));
    return (
        <main className="flex-1 bg-white dark:bg-slate-950 pt-32 pb-20">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <SectionHeading as="h1" eyebrow="Guides" title="How to collect the data you need" intro="One task per guide, with every step tested on the released extension and the version it was tested on." />
                {guides.length === 0 ? (
                    <p className="mt-12 text-lg text-slate-600 dark:text-slate-300">The first guides are being written. Until then, each feature page shows the steps for that feature.</p>
                ) : (
                    features.map((slug) => {
                        const feature = slug ? getPage(slug) : null;
                        const list = guides.filter((g) => g.feature === slug);
                        return (
                            <section key={slug || "general"} className="mt-14">
                                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                    {feature ? <Link href={feature.href} className="hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff]">{feature.label}</Link> : "General"}
                                </h2>
                                <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                    {list.map((g) => (
                                        <li key={g.slug} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                                            <h3 className="font-semibold text-slate-900 dark:text-white leading-snug">
                                                <Link href={`/guides/${g.slug}`} className="hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff]">{g.title}</Link>
                                                {g.status === "draft" && <span className="ml-2 rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:text-slate-400 align-middle">Draft</span>}
                                            </h3>
                                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{g.description}</p>
                                            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{g.readingMinutes} min read{g.video ? " · with video" : ""}</p>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        );
                    })
                )}
            </div>
        </main>
    );
}
