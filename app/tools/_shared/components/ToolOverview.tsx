"use client"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

import { ReactNode } from "react"

export interface OverviewFact {
    stat: string
    label: string
    detail: string
}

interface ToolOverviewProps {
    heading: string
    headingAccent?: string
    definition: ReactNode
    facts: OverviewFact[]
    accent?: "blue" | "indigo" | "violet" | "rose" | "emerald" | "amber" | "red"
}

const accentStyles = {
    blue: {
        headingAccent: "text-blue-700 dark:text-blue-300",
        sectionBg: "bg-gradient-to-br from-blue-50/80 via-slate-50/60 to-white dark:from-blue-950/30 dark:via-slate-900 dark:to-slate-900",
        border: "border-blue-100/80 dark:border-blue-900/50",
        columnDivider: "bg-blue-100/60 dark:bg-blue-900/40",
        statColor: "text-blue-700 dark:text-blue-300",
        cardBorder: "border-blue-100/50 dark:border-blue-900/50",
        cardBg: "bg-white/70 dark:bg-slate-900/70",
    },
    indigo: {
        headingAccent: "text-indigo-700 dark:text-indigo-300",
        sectionBg: "bg-gradient-to-br from-indigo-50/80 via-slate-50/60 to-white dark:from-indigo-950/30 dark:via-slate-900 dark:to-slate-900",
        border: "border-indigo-100/80 dark:border-indigo-900/50",
        columnDivider: "bg-indigo-100/60 dark:bg-indigo-900/40",
        statColor: "text-indigo-700 dark:text-indigo-300",
        cardBorder: "border-indigo-100/50 dark:border-indigo-900/50",
        cardBg: "bg-white/70 dark:bg-slate-900/70",
    },
    violet: {
        headingAccent: "text-violet-700 dark:text-violet-300",
        sectionBg: "bg-gradient-to-br from-violet-50/80 via-slate-50/60 to-white dark:from-violet-950/30 dark:via-slate-900 dark:to-slate-900",
        border: "border-violet-100/80 dark:border-violet-900/50",
        columnDivider: "bg-violet-100/60 dark:bg-violet-900/40",
        statColor: "text-violet-700 dark:text-violet-300",
        cardBorder: "border-violet-100/50 dark:border-violet-900/50",
        cardBg: "bg-white/70 dark:bg-slate-900/70",
    },
    rose: {
        headingAccent: "text-rose-700 dark:text-rose-300",
        sectionBg: "bg-gradient-to-br from-rose-50/80 via-slate-50/60 to-white dark:from-rose-950/30 dark:via-slate-900 dark:to-slate-900",
        border: "border-rose-100/80 dark:border-rose-900/50",
        columnDivider: "bg-rose-100/60 dark:bg-rose-900/40",
        statColor: "text-rose-700 dark:text-rose-300",
        cardBorder: "border-rose-100/50 dark:border-rose-900/50",
        cardBg: "bg-white/70 dark:bg-slate-900/70",
    },
    red: {
        headingAccent: "text-red-700 dark:text-red-300",
        sectionBg: "bg-gradient-to-br from-red-50/80 via-slate-50/60 to-white dark:from-red-950/30 dark:via-slate-900 dark:to-slate-900",
        border: "border-red-100/80 dark:border-red-900/50",
        columnDivider: "bg-red-100/60 dark:bg-red-900/40",
        statColor: "text-red-700 dark:text-red-300",
        cardBorder: "border-red-100/50 dark:border-red-900/50",
        cardBg: "bg-white/70 dark:bg-slate-900/70",
    },
    emerald: {
        headingAccent: "text-emerald-700 dark:text-emerald-300",
        sectionBg: "bg-gradient-to-br from-emerald-50/80 via-slate-50/60 to-white dark:from-emerald-950/30 dark:via-slate-900 dark:to-slate-900",
        border: "border-emerald-100/80 dark:border-emerald-900/50",
        columnDivider: "bg-emerald-100/60 dark:bg-emerald-900/40",
        statColor: "text-emerald-700 dark:text-emerald-300",
        cardBorder: "border-emerald-100/50 dark:border-emerald-900/50",
        cardBg: "bg-white/70 dark:bg-slate-900/70",
    },
    amber: {
        headingAccent: "text-amber-700 dark:text-amber-300",
        sectionBg: "bg-gradient-to-br from-amber-50/80 via-slate-50/60 to-white dark:from-amber-950/30 dark:via-slate-900 dark:to-slate-900",
        border: "border-amber-100/80 dark:border-amber-900/50",
        columnDivider: "bg-amber-100/60 dark:bg-amber-900/40",
        statColor: "text-amber-700 dark:text-amber-300",
        cardBorder: "border-amber-100/50 dark:border-amber-900/50",
        cardBg: "bg-white/70 dark:bg-slate-900/70",
    },
}

export function ToolOverview({
    heading,
    headingAccent,
    definition,
    facts,
    accent = "blue",
}: ToolOverviewProps) {
    const s = accentStyles[accent]
    const reduceMotion = useReducedMotion()
    const reveal = reduceMotion ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.5, ease: "easeOut" as const } }

    const renderHeading = () => {
        if (!headingAccent) return <>{heading}</>
        const parts = heading.split(headingAccent)
        const trailing = parts[1] ?? ""
        return (
            <>
                {parts[0]}
                <span className={cn("relative inline-flex items-center", s.headingAccent)}>
                    <span className="relative z-10">{headingAccent}{trailing}</span>
                </span>
            </>
        )
    }

    return (
        <motion.section
            id="tool-overview"
            {...reveal}
            className={cn(
                "relative w-full rounded-2xl border overflow-hidden",
                "px-8 py-10 sm:px-12 sm:py-12",
                s.sectionBg,
                s.border,
            )}
        >
            <div className="flex flex-col lg:flex-row gap-0 items-stretch relative z-10">
                {/* ── Left: heading + definition ── */}
                <div className="lg:w-[42%] flex-shrink-0 flex flex-col justify-center pr-0 lg:pr-10 pb-8 lg:pb-0">
                    <h2 className="text-[1.5rem] sm:text-[1.75rem] font-semibold tracking-tight leading-snug text-slate-800 mb-3 dark:text-white">
                        {renderHeading()}
                    </h2>
                    <p className="text-base sm:text-lg text-slate-700 leading-[1.65] text-left hyphens-none dark:text-slate-200">
                        {definition}
                    </p>
                </div>

                {/* ── Column divider (desktop only) ── */}
                {facts.length > 0 && (
                    <div className={cn("hidden lg:block w-px flex-shrink-0 self-stretch mx-3 rounded-full", s.columnDivider)} />
                )}

                {/* ── Right: fact cards ── */}
                {facts.length > 0 && (
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 pl-0 lg:pl-8">
                        {facts.map((fact, idx) => (
                            <motion.div
                                key={idx}
                                {...(reduceMotion ? {} : { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.35, delay: idx * 0.08 } })}
                                className={cn(
                                    "rounded-xl border px-4 py-3.5",
                                    "transition-all duration-200",
                                    s.cardBg,
                                    s.cardBorder,
                                )}
                            >
                                <div className="flex items-baseline gap-2.5 mb-1">
                                    <span className={cn("text-xl font-semibold leading-none tracking-tight", s.statColor)}>
                                        {fact.stat}
                                    </span>
                                    <span className="text-base font-semibold text-slate-800 leading-snug dark:text-white">
                                        {fact.label}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-700 leading-relaxed dark:text-slate-200">
                                    {fact.detail}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </motion.section>
    )
}
