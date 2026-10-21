"use client"
import React from "react"
import { CardHeader } from "@/components/ui/card"
import { HelpCircle, RotateCw, LucideIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { CurrencyCombobox } from "./CurrencyCombobox"

interface CalculatorCardHeaderProps {
    title?: string
    titleIcon?: LucideIcon
    description: string
    guideId?: string
    currency?: string
    onCurrencyChange?: (value: string) => void
    tooltip?: string
    onReset?: () => void
}

/** The calculator card's heading (an h2, since the page title is the h1), its one-line description, currency and reset. */
export function CalculatorCardHeader({
    title,
    titleIcon: TitleIcon,
    description,
    guideId = "how-to-use",
    currency,
    onCurrencyChange,
    tooltip,
    onReset,
}: CalculatorCardHeaderProps) {
    const scrollToGuide = () => {
        const element = document.getElementById(guideId)
        if (element) {
            const offset = 100
            const elementPosition = element.getBoundingClientRect().top + window.scrollY
            window.scrollTo({ top: elementPosition - offset, behavior: "smooth" })
        }
    }

    return (
        <CardHeader className="px-6 py-5 border-b border-slate-100 bg-white/40 dark:border-slate-800 dark:bg-slate-900/40">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                        {TitleIcon && (
                            <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-[#2772ED]/10 flex items-center justify-center dark:bg-[#2772ED]/20" aria-hidden="true">
                                <TitleIcon className="h-3.5 w-3.5 text-[#1f5ec2] dark:text-[#7aa7ff]" />
                            </div>
                        )}
                        {title?.trim() && (
                            <h2 className="text-xl font-semibold text-slate-800 tracking-tight leading-none dark:text-white">{title}</h2>
                        )}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    type="button"
                                    onClick={scrollToGuide}
                                    aria-label="How to use this calculator"
                                    className="text-slate-600 hover:text-[#1f5ec2] transition-colors flex-shrink-0 mt-0.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f5ec2] dark:text-slate-300 dark:hover:text-[#7aa7ff]"
                                >
                                    <HelpCircle className="h-4 w-4" aria-hidden="true" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-sm bg-slate-900 text-white border-slate-800 dark:bg-slate-800 dark:border-slate-700">
                                {tooltip || "How to use this calculator"}
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    {description?.trim() && (
                        <p className="text-base text-slate-700 leading-relaxed whitespace-pre-wrap dark:text-slate-200">{description}</p>
                    )}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                    {currency && onCurrencyChange && (
                        <div className="w-[150px]">
                            <CurrencyCombobox value={currency} onValueChange={onCurrencyChange} />
                        </div>
                    )}
                    {onReset && (
                        <button
                            type="button"
                            onClick={onReset}
                            className="flex items-center justify-center h-10 w-10 text-slate-700 hover:text-[#1f5ec2] bg-white border border-slate-300 hover:border-[#1f5ec2] rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f5ec2] dark:text-slate-200 dark:hover:text-[#7aa7ff] dark:bg-slate-900 dark:border-slate-700"
                            aria-label="Reset the calculator"
                        >
                            <RotateCw className="h-4 w-4" aria-hidden="true" />
                        </button>
                    )}
                </div>
            </div>
        </CardHeader>
    )
}
