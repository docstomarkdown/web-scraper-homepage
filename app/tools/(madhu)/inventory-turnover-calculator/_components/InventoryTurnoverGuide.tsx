"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { Hourglass, Gauge, CalendarDays, Warehouse, BookOpen } from "lucide-react"
export function InventoryTurnoverGuide() {
    return (
        <ToolGuide
            title="How This Tool Optimizes Your Inventory"
            icon={BookOpen}
            items={[
                {
                    title: "Measure Your Sales Speed",
                    description: "This calculator helps you understand how quickly your products are moving by computing your exact turnover ratio.",
                    icon: Gauge,
                    stat: "Analyze",
                    statLabel: "Sales Flow",
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-600 dark:text-blue-400",
                    statColor: "text-blue-600 dark:text-blue-400",
                    tooltip: "The ratio shows if you're matching your buying speed to your customer demand."
                },
                {
                    title: "Calculate Cash-to-Cash Time",
                    description: "Find out precisely how many days your cash is tied up in physical stock using the 'Days to Sell Inventory' result.",
                    icon: Hourglass,
                    stat: "Sell Time",
                    statLabel: "Cash Cycle",
                    iconBg: "bg-orange-50 dark:bg-orange-950/40",
                    iconColor: "text-orange-600 dark:text-orange-400",
                    statColor: "text-orange-600 dark:text-orange-400"
                },
                {
                    title: "Avoid Overstock Costs",
                    description: "Use this tool to identify if you have too much capital sitting in the warehouse. Reducing your Average Inventory Value limits unnecessary storage fees.",
                    icon: Warehouse,
                    stat: "Save",
                    statLabel: "Storage Cap",
                    iconBg: "bg-red-50 dark:bg-red-950/40",
                    iconColor: "text-red-600 dark:text-red-400",
                    statColor: "text-red-600 dark:text-red-400"
                },
                {
                    title: "Simplify Stock Planning",
                    description: "Adjust the Analysis Period to track performance monthly, quarterly, or annually. This ensures you make smarter, timely restocking decisions instantly.",
                    icon: CalendarDays,
                    stat: "Flexible",
                    statLabel: "Periods",
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-600 dark:text-emerald-400",
                    statColor: "text-emerald-600 dark:text-emerald-400"
                }
            ]}
        />
    )
}
