"use client"
import { ToolSectionHeader } from "./ToolSectionHeader"
import { LucideIcon, HelpCircle } from "lucide-react"
export interface StepItem {
    title: string
    description: string
    icon: LucideIcon
}
interface ToolStepsProps {
    steps: StepItem[]
    title?: string
    icon?: LucideIcon
    goal?: StepItem
}
/** The how-to steps as one numbered list: cards side by side on wide screens, stacked on phones. */
export function ToolSteps({ steps, title = "How to use this calculator", icon = HelpCircle, goal }: ToolStepsProps) {
    const allSteps = goal ? [...steps, goal] : steps
    if (allSteps.length === 0) return null
    return (
        <section id="how-to-use" className="relative">
            <ToolSectionHeader icon={icon} title={title} />
            <ol className="grid gap-5 md:gap-8 pt-4 md:[grid-template-columns:repeat(var(--steps),minmax(0,1fr))]" style={{ "--steps": allSteps.length } as React.CSSProperties}>
                {allSteps.map((step, index) => {
                    const Icon = step.icon
                    return (
                        <li key={index} className="relative flex md:block items-start gap-4">
                            <span className="relative z-10 flex-shrink-0 w-9 h-9 md:absolute md:top-0 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 rounded-full bg-[#1f5ec2] flex items-center justify-center mt-1 md:mt-0 ring-4 ring-white dark:ring-slate-900" aria-hidden="true">
                                <span className="text-sm font-bold text-white leading-none">{index + 1}</span>
                            </span>
                            <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-5 md:p-6 md:pt-9 h-full dark:bg-slate-900 dark:border-slate-800">
                                <div className="flex items-center gap-3 mb-2.5">
                                    <span className="w-8 h-8 bg-[#2772ED]/10 flex items-center justify-center text-[#1f5ec2] rounded-xl flex-shrink-0 dark:bg-[#2772ED]/20 dark:text-[#7aa7ff]" aria-hidden="true">
                                        <Icon className="w-4 h-4" />
                                    </span>
                                    <h3 className="text-lg font-semibold text-slate-800 leading-snug dark:text-white">
                                        <span className="sr-only">Step {index + 1}: </span>{step.title}
                                    </h3>
                                </div>
                                <p
                                    className="text-base text-slate-700 leading-[1.65] [&_em]:not-italic [&_em]:font-semibold dark:text-slate-200"
                                    dangerouslySetInnerHTML={{ __html: step.description.replace(/<strong>(.*?)<\/strong>/gi, "$1") }}
                                />
                            </div>
                        </li>
                    )
                })}
            </ol>
        </section>
    )
}
