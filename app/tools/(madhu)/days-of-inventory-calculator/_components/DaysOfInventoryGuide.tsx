"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { AlertTriangle, BookOpen, Calculator, Table } from "lucide-react"

/** The formula in words, where the inputs come from, a worked example, and what the result leaves out. */
export function DaysOfInventoryGuide() {
    return (
        <ToolGuide
            title="How the numbers are worked out"
            icon={BookOpen}
            items={[
                {
                    title: "The formula, in words",
                    description: "Days of inventory is stock divided by daily sales, rounded down. Usable days is stock minus the safety buffer, divided by daily sales.",
                    icon: Calculator,
                    stat: "÷ daily",
                    statLabel: "rounded down",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "Where the inputs come from",
                    description: "Stock is in your inventory report. Daily sales is units sold over a period divided by the days in it; the last 30 days is a sensible default unless you're in a seasonal peak.",
                    icon: BookOpen,
                    stat: "30 days",
                    statLabel: "of sales history",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-emerald-700 dark:text-emerald-300",
                },                {
                    title: "A worked example",
                    description: "5,000 units in stock at 150 a day is 33 days of inventory. With a 500-unit buffer, the usable runway is 30 days. If the supplier needs 21 days, you should order within the next 9.",
                    icon: Table,
                    stat: "33 days",
                    statLabel: "of stock",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "What it leaves out",
                    description: "Sales aren't flat; promotions and seasons change the daily rate. Rerun the calculator with the rate you expect for the next few weeks, not the average of the last year.",
                    icon: AlertTriangle,
                    stat: "Flat rate",
                    statLabel: "assumed",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-amber-700 dark:text-amber-300",
                }
            ]}
        />
    )
}
