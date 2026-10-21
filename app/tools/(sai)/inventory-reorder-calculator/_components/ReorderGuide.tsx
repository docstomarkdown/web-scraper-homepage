"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BarChart3, BookOpen, Calculator, ShieldAlert, Timer } from "lucide-react"

export function ReorderGuide() {
    return (
        <ToolGuide
            title="How the reorder point works"
            icon={BookOpen}
            items={[
                {
                    title: "The formula",
                    description: "Reorder point = daily sales × lead time + daily sales × safety days. The first part covers the units you sell while the order is on its way. The second part is the buffer.",
                    icon: Calculator,
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                },
                {
                    title: "Why lead time matters most",
                    description: "If a supplier takes 30 days, you must order while you still hold 30 days of sales. Count lead time from the day you place the order to the day stock is on the shelf.",
                    icon: Timer,
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                },
                {
                    title: "What a safety buffer is",
                    description: "The buffer is extra stock measured in days of sales. Seven days means you can absorb a week of delay or a week of higher demand without running out.",
                    icon: ShieldAlert,
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                },
                {
                    title: "A worked example",
                    description: "You sell 10 units a day, your supplier takes 14 days, and you want a 7-day buffer. Lead-time demand is 140 units and the buffer is 70, so the reorder point is 210. With 300 units in stock, you have 9 days before you must order.",
                    icon: BarChart3,
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                },
            ]}
        />
    )
}
