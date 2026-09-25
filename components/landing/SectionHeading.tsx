import React from "react";

/** Shared section header: small eyebrow, the section's <h2>, and an optional intro line. */
export default function SectionHeading({
    eyebrow,
    title,
    intro,
    align = "center",
}: {
    eyebrow: string;
    title: React.ReactNode;
    intro?: React.ReactNode;
    align?: "center" | "left";
}) {
    const centered = align === "center";
    return (
        <div className={centered ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
            <p className="text-sm font-semibold text-[#2772ED] dark:text-[#7aa7ff]">{eyebrow}</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">{title}</h2>
            {intro && <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{intro}</p>}
        </div>
    );
}
