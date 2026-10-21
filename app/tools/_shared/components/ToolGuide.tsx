"use client"
import { BookOpen, LucideIcon } from "lucide-react"
import { ReactNode } from "react"
import { ToolSectionHeader } from "./ToolSectionHeader"
import { cn } from "@/lib/utils"

export interface GuideItem {
    title: string
    description: string | ReactNode
    icon: LucideIcon
    iconBg: string
    iconColor: string
    stat?: string
    statColor?: string
    statLabel?: string
    tooltip?: string
}
interface ToolGuideProps {
    title: string
    icon?: LucideIcon
    items: GuideItem[]
}
/** The explainer cards under a calculator: one h3 and a short body each. */
export function ToolGuide({ title, icon = BookOpen, items }: ToolGuideProps) {
    if (!items?.length) return null
    const bodyCls = "text-base text-slate-700 leading-[1.65] [&_em]:not-italic [&_em]:font-semibold [&_a]:text-[#1f5ec2] [&_a]:underline dark:text-slate-200 dark:[&_a]:text-[#7aa7ff]"
    return (
        <section id="tool-guide" className="space-y-6">
            <ToolSectionHeader icon={icon} title={title} />
            <ul className="space-y-4">
                {items.map((item, index) => {
                    const Icon = item.icon
                    return (
                        <li key={index} className="bg-white rounded-2xl border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
                            <div className="px-6 sm:px-8 py-5 sm:py-6">
                                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                    <div className={cn("flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center", item.iconBg, item.iconColor)} aria-hidden="true">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-slate-800 mb-1 leading-snug dark:text-white">{item.title}</h3>
                                        {typeof item.description === "string" ? (
                                            <div className={bodyCls} dangerouslySetInnerHTML={{ __html: item.description.replace(/<strong>(.*?)<\/strong>/gi, "$1") }} />
                                        ) : (
                                            <div className={bodyCls}>{item.description}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
