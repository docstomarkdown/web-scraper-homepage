"use client"
import React from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
interface SecondaryMetric {
    label: string
    value: React.ReactNode
    color?: string
    tooltip?: string
}
interface ResultFeedbackCardProps {
    title: React.ReactNode
    titleIcon?: LucideIcon
    titleLabel?: string | React.ReactNode // e.g. "High Performance"
    labelClassName?: string // e.g. "text-blue-400"
    mainValue?: React.ReactNode
    valueColor?: string // e.g. "text-blue-400"
    mainMetricLabel?: string // e.g. "ROAS %"
    mainMetricValue?: React.ReactNode // e.g. "420%"
    mainMetricColor?: string
    secondaryMetrics?: SecondaryMetric[]
    className?: string
    children?: React.ReactNode
    hideChildrenBorder?: boolean
}
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"
export function ResultFeedbackCard({
    title,
    titleIcon: TitleIcon,
    titleLabel,
    labelClassName,
    mainValue,
    valueColor,
    mainMetricLabel,
    mainMetricValue,
    mainMetricColor = "text-white",
    secondaryMetrics = [],
    className,
    variant = "default",
    tooltip,
    children,
    hideChildrenBorder = false
}: ResultFeedbackCardProps & { variant?: "default" | "warning" | "compact", tooltip?: string }) {
    // Default styles based on variant
    const getBaseStyles = () => {
        switch (variant) {
            case "warning":
                return "bg-red-950 border-red-900"
            case "compact":
                return "bg-white border-slate-200 shadow-sm text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-white"
            default:
                return "bg-slate-700 border-0 text-white"
        }
    }
    const getLabelStyles = () => {
        if (labelClassName) return labelClassName
        if (variant === "compact") return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
        return "text-blue-400 bg-slate-600/50 border-slate-500/50"
    }
    const getValueColor = () => {
        if (valueColor) return valueColor
        if (variant === "compact") return "text-slate-900 dark:text-white"
        return "text-white"
    }
    // Background effects (only for default/warning dark themes)
    const showEffects = variant !== "compact"
    return (
        <Card className={cn(
            "shadow-xl overflow-hidden relative transition-all duration-300",
            "[&_.text-lg]:break-all [&_.text-xl]:break-all [&_.text-2xl]:break-all [&_.text-3xl]:break-all [&_.text-4xl]:break-all [&_.text-5xl]:break-all",
            getBaseStyles(),
            className
        )}>
            {/* Background Effects */}
            {showEffects && (
                <>
                    <div className={cn(
                        "absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none opacity-20",
                        variant === "warning" ? "bg-red-600" : "bg-[#1f5ec2]"
                    )} />
                    <div className={cn(
                        "absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none opacity-10",
                        variant === "warning" ? "bg-orange-600" : "bg-[#1f5ec2]"
                    )} />
                </>
            )}
            {/* Header Section */}
            <div className={cn(
                "p-6 pb-2 relative z-10 flex flex-col space-y-1.5",
                variant === "compact" && "p-4 pb-2"
            )}>
                <div className={cn(
                    "text-sm font-medium tracking-wider flex justify-between items-center gap-2",
                    "text-slate-700 dark:text-slate-200"
                )}>
                    <div className="flex items-center gap-2">
                        {TitleIcon && (
                            <div className={cn(
                                "flex-shrink-0 w-4 h-4 rounded flex items-center justify-center",
                                variant === "compact" ? "bg-blue-50 dark:bg-blue-950/40" : "bg-white/10 dark:bg-slate-900/10"
                            )}>
                                <TitleIcon className={cn(
                                    "h-2.5 w-2.5",
                                    variant === "compact" ? "text-[#1f5ec2] dark:text-[#7aa7ff]" : "text-white"
                                )} />
                            </div>
                        )}
                        <span>{title}</span>
                        {tooltip && (
                            <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button type="button" aria-label="About this result" className={cn(
                                            "transition-colors",
                                            variant === "compact" ? "text-slate-700 dark:text-slate-200 hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff]" : "text-slate-700 dark:text-slate-200 hover:text-white dark:text-slate-400"
                                        )}>
                                            <Info className="h-3.5 w-3.5" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="max-w-xs text-sm bg-slate-900 text-white border-slate-800 dark:bg-slate-800 dark:border-slate-700">
                                        {tooltip}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>
                    {titleLabel && (
                        <span className={cn("text-sm font-bold px-2 py-0.5 rounded-full", getLabelStyles())}>
                            {titleLabel}
                        </span>
                    )}
                </div>
            </div>
            {/* Content Section */}
            <div className={cn(
                "p-6 pt-0 relative z-10",
                variant === "compact" && "p-4 pt-0"
            )}>
                {/* Main Big Number */}
                {mainValue && (
                    <div className={cn("flex items-baseline gap-3", variant === "compact" ? "mb-4" : "mb-6")}>
                        <div className={cn(
                            "font-bold tracking-tight",
                            variant === "compact" ? "text-2xl" : "text-5xl",
                            getValueColor()
                        )}>
                            {mainValue}
                        </div>
                    </div>
                )}
                {/* Metrics Section */}
                {(mainMetricLabel || secondaryMetrics.length > 0) && (
                    <div className={cn(
                        "pt-4 space-y-4",
                        variant === "compact" ? "border-t border-slate-100 dark:border-slate-800" : "border-t border-white/10 dark:border-slate-800"
                    )}>
                        {/* Primary Supporting Metric (Full Width) */}
                        {mainMetricLabel && (
                            <div className={cn("pb-3", variant === "compact" ? "border-b border-slate-100 dark:border-slate-800" : "border-b border-white/5 dark:border-slate-800")}>
                                <p className={cn("text-sm mb-1", variant === "compact" ? "text-slate-700 dark:text-slate-200" : "text-inherit opacity-90")}>{mainMetricLabel}</p>
                                <div className={cn("text-2xl font-bold break-words", mainMetricColor)}>
                                    {mainMetricValue}
                                </div>
                            </div>
                        )}
                        {/* Secondary Supporting Metrics Grid */}
                        {secondaryMetrics.length > 0 && (
                            <div className="grid grid-cols-2 gap-4">
                                {secondaryMetrics.map((metric, index) => (
                                    <div key={index}>
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <p className={cn("text-sm", variant === "compact" ? "text-slate-700 dark:text-slate-200" : "text-inherit opacity-90")}>{metric.label}</p>
                                            {metric.tooltip && (
                                                <TooltipProvider delayDuration={100}>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button type="button" aria-label="About this value" className={cn(
                                                                "transition-colors",
                                                                variant === "compact" ? "text-slate-700 dark:text-slate-200 hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff]" : "text-slate-700 dark:text-slate-200 hover:text-white dark:text-slate-400"
                                                            )}>
                                                                <Info className="h-3 w-3" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top" className="max-w-xs text-sm bg-slate-900 text-white border-slate-800 dark:bg-slate-800 dark:border-slate-700">
                                                            {metric.tooltip}
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
                                        <div className={cn("text-2xl font-bold break-all", metric.color || "text-[#1f5ec2] dark:text-[#7aa7ff]")}>
                                            {metric.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                {/* Custom Children */}
                {children && (
                    <div className={cn(
                        "pt-4",
                        !hideChildrenBorder && (mainValue || mainMetricLabel || secondaryMetrics.length > 0) && (variant === "compact" ? "border-t border-slate-100 dark:border-slate-800" : "border-t border-white/10 dark:border-slate-800")
                    )}>
                        {children}
                    </div>
                )}
            </div>
        </Card>
    )
}
