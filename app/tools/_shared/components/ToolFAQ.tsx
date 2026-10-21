"use client"
import { MessagesSquare, LucideIcon } from "lucide-react"
import { ToolSectionHeader } from "./ToolSectionHeader"

interface FAQItem {
    question: string
    answer: string
}

interface ToolFAQProps {
    title?: string
    icon?: LucideIcon
    faqs: FAQItem[]
}

/** Questions as native details/summary, like the rest of the site: every answer is in the HTML and readable without JS. */
export function ToolFAQ({ title = "Questions, answered", icon = MessagesSquare, faqs }: ToolFAQProps) {
    if (!faqs?.length) return null
    return (
        <section id="faq">
            <ToolSectionHeader icon={icon} title={title} />
            <div className="divide-y divide-slate-200 dark:divide-slate-800 border-y border-slate-200 dark:border-slate-800">
                {faqs.map((faq, index) => (
                    <details key={index} className="group py-5" open={index === 0}>
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f5ec2]">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white leading-snug">{faq.question}</h3>
                            <span className="mt-0.5 text-2xl leading-none text-slate-500 dark:text-slate-400 transition-transform motion-reduce:transition-none group-open:rotate-45" aria-hidden="true">+</span>
                        </summary>
                        <div
                            className="mt-3 text-base text-slate-700 leading-[1.65] [&_strong]:font-semibold [&_strong]:text-slate-800 [&_em]:not-italic [&_em]:font-semibold [&_a]:text-[#1f5ec2] [&_a]:underline dark:text-slate-200 dark:[&_strong]:text-white dark:[&_a]:text-[#7aa7ff]"
                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                    </details>
                ))}
            </div>
        </section>
    )
}
