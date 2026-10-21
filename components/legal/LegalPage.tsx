"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { Shield, FileText, Mail, ArrowLeft, ChevronUp } from "lucide-react";

interface Section {
    id: string;
    title: string;
}

interface LegalPageProps {
    type: "privacy" | "terms";
    content: string;
    sections: Section[];
}

const icons = {
    privacy: Shield,
    terms: FileText,
};

const headings = {
    privacy: "Privacy Policy",
    terms: "Terms of Service",
};

const subheadings = {
    privacy: "Your privacy matters. Here's how we handle your data with care and transparency.",
    terms: "Clear and fair terms that govern how you use Web Scraper Pro.",
};

const badges = {
    privacy: { label: "Data Protection", color: "bg-[#7CF2C4]/20 text-[#0B7A5C] dark:text-[#7CF2C4] border-[#12A37B]/30" },
    terms: { label: "Legal Agreement", color: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-[#7aa7ff] border-blue-200 dark:border-blue-800" },
};

export default function LegalPage({ type, content, sections }: LegalPageProps) {
    const Icon = icons[type];
    const badge = badges[type];
    const [activeId, setActiveId] = useState<string>("");
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Track which section is in view
    useEffect(() => {
        const handleScroll = () => {
            const headingElements = sections.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];

            let newActiveId = "";
            for (const el of headingElements) {
                const rect = el.getBoundingClientRect();
                // 150px to account for sticky header and spacing
                if (rect.top <= 160) {
                    newActiveId = el.id;
                }
            }

            // If above the first section, highlight the first one
            if (!newActiveId && headingElements.length > 0) {
                newActiveId = headingElements[0].id;
            }

            setActiveId((prev) => prev !== newActiveId && newActiveId !== "" ? newActiveId : prev);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        setTimeout(handleScroll, 100); // Initialize after render
        return () => window.removeEventListener("scroll", handleScroll);
    }, [sections]);

    // Show/hide scroll-to-top button
    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 600);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950">

            <main id="main">
            {/* ── Hero header ── */}
            <div className="relative bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
                {/* Subtle decorative background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-50/60 dark:bg-blue-900/20 blur-3xl" />
                    <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-indigo-50/40 dark:bg-indigo-900/10 blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-12 md:pt-[110px] md:pb-14">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-[#7aa7ff] transition-colors mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        Back to home
                    </Link>

                    <div className="flex items-start gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                            <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <div className="mb-3">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${badge.color}`}>
                                    {badge.label}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-700 dark:text-white tracking-tight">
                                {headings[type]}
                            </h1>
                            <p className="mt-3 text-slate-700 dark:text-slate-200 text-base md:text-lg leading-relaxed max-w-2xl">
                                {subheadings[type]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Body ── */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 md:py-12">
                <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-10 items-start">

                    {/* Sidebar TOC */}
                    {sections.length > 0 && (
                        <div className="hidden lg:block sticky top-24 self-start">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
                                <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/60">
                                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                                        On this page
                                    </p>
                                </div>
                                <nav aria-label="On this page" className="p-3 space-y-0.5 max-h-[calc(100vh-180px)] overflow-y-auto">
                                    {sections.map((s) => (
                                        <a
                                            key={s.id}
                                            href={`#${s.id}`}
                                            className={`block text-sm px-3 py-2 rounded-lg transition-all duration-200 ${activeId === s.id
                                                ? "bg-[#1f5ec2]/10 text-[#1f5ec2] dark:text-[#7aa7ff] font-semibold"
                                                : "text-slate-600 dark:text-slate-300 hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff] hover:bg-slate-50 dark:hover:bg-slate-800"
                                                }`}
                                        >
                                            {s.title}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    )}

                    {/* Main content */}
                    <div>
                        <article className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="px-8 py-10 md:px-12 md:py-12">
                                <ReactMarkdown
                                    rehypePlugins={[rehypeRaw]}
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        h1: ({ ...props }) => (
                                            <h1 className="text-2xl font-semibold text-slate-800 dark:text-white mt-2 mb-5 tracking-tight" {...props} />
                                        ),
                                        h2: ({ children, ...props }) => {
                                            const text = Array.isArray(children)
                                                ? children.map((c) => (typeof c === "string" ? c : "")).join("")
                                                : typeof children === "string" ? children : "";
                                            const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
                                            return (
                                                <h2
                                                    id={id}
                                                    className="group scroll-mt-28 text-[1.35rem] font-semibold text-slate-800 dark:text-white mt-12 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 tracking-tight flex items-center gap-3"
                                                    {...props}
                                                >
                                                    <span className="w-1 h-5 rounded-full bg-[#1f5ec2] dark:bg-[#7aa7ff] shrink-0" aria-hidden="true" />
                                                    {children}
                                                </h2>
                                            );
                                        },
                                        h3: ({ ...props }) => (
                                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mt-7 mb-2" {...props} />
                                        ),
                                        p: ({ ...props }) => (
                                            <p className="text-slate-700 dark:text-slate-200 leading-[1.7] mb-4 text-lg" {...props} />
                                        ),
                                        ul: ({ ...props }) => (
                                            <ul className="mb-5 space-y-2.5 pl-1" {...props} />
                                        ),
                                        ol: ({ ...props }) => (
                                            <ol className="list-decimal pl-5 mb-5 space-y-2.5 text-slate-700 dark:text-slate-200 text-lg" {...props} />
                                        ),
                                        li: ({ ...props }) => (
                                            <li className="flex items-start gap-3 text-slate-700 dark:text-slate-200 text-lg leading-[1.7]">
                                                <span className="mt-[12px] w-1.5 h-1.5 rounded-full bg-[#1f5ec2] dark:bg-[#7aa7ff] shrink-0" aria-hidden="true" />
                                                <span {...props} />
                                            </li>
                                        ),
                                        strong: ({ ...props }) => (
                                            <strong className="font-semibold text-slate-700 dark:text-slate-200" {...props} />
                                        ),
                                        a: ({ href, ...props }) => {
                                            const isInternal = href?.startsWith("/");
                                            if (isInternal) {
                                                return (
                                                    <Link
                                                        href={href || "/"}
                                                        className="text-[#1f5ec2] dark:text-[#7aa7ff] underline underline-offset-2 transition-colors font-medium"
                                                        {...props}
                                                    />
                                                );
                                            }
                                            return (
                                                <a
                                                    href={href}
                                                    className="text-[#1f5ec2] dark:text-[#7aa7ff] underline underline-offset-2 transition-colors font-medium"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    {...props}
                                                />
                                            );
                                        },
                                        code: ({ ...props }) => (
                                            <code className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-1.5 py-0.5 rounded text-[0.92em] font-mono" {...props} />
                                        ),
                                        blockquote: ({ ...props }) => (
                                            <blockquote className="my-6 pl-5 border-l-4 border-[#1f5ec2]/40 bg-slate-50 dark:bg-slate-800/60 py-3 pr-4 rounded-r-xl text-slate-700 dark:text-slate-200 italic text-lg" {...props} />
                                        ),
                                        table: ({ ...props }) => (
                                            <div className="overflow-x-auto mb-6 rounded-xl border border-slate-200 dark:border-slate-800" tabIndex={0} role="region" aria-label="Table, scrolls sideways">
                                                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-base" {...props} />
                                            </div>
                                        ),
                                        thead: ({ ...props }) => (
                                            <thead className="bg-slate-50 dark:bg-slate-800/60" {...props} />
                                        ),
                                        th: ({ ...props }) => (
                                            <th className="px-4 py-3 text-left text-base font-semibold text-slate-800 dark:text-slate-100" {...props} />
                                        ),
                                        tr: ({ ...props }) => (
                                            <tr className="even:bg-slate-50/50 dark:even:bg-slate-800/30" {...props} />
                                        ),
                                        td: ({ ...props }) => (
                                            <td className="px-4 py-3 text-slate-700 dark:text-slate-200" {...props} />
                                        ),
                                        hr: () => (
                                            <hr className="my-10 border-slate-100 dark:border-slate-800" />
                                        ),
                                    }}
                                >
                                    {content}
                                </ReactMarkdown>
                            </div>
                        </article>

                        {/* Contact card */}
                        <div className="mt-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center shrink-0" aria-hidden="true">
                                <Mail className="w-5 h-5 text-[#1f5ec2] dark:text-[#7aa7ff]" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">
                                    Have questions about this {headings[type]}?
                                </h3>
                                <p className="text-slate-700 dark:text-slate-200 text-base leading-relaxed">
                                    Ask on the Get help page. A person on the team reads every request and replies by email, usually within one working day.
                                </p>
                            </div>
                            <Link
                                href="/support"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1f5ec2] hover:bg-[#1a4fa3] text-white text-base font-semibold transition-all duration-200 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 shrink-0"
                            >
                                <Mail className="w-4 h-4" aria-hidden="true" />
                                Get help
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            </main>

            {/* Scroll to top */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={`fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff] transition-all duration-300 ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                aria-label="Scroll to top"
            >
                <ChevronUp className="w-5 h-5" />
            </button>
        </div>
    );
}
