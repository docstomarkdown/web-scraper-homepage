"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { AlertTriangle, BookOpen, Calculator, Table } from "lucide-react"

/** The formula in words, where the inputs come from, a worked example, and what the result leaves out. */
export function InventoryTurnoverGuide() {
    return (
        <ToolGuide
            title="How the numbers are worked out"
            icon={BookOpen}
            items={[
                {
                    title: "The formula, in words",
                    description: "Average inventory is opening plus closing, divided by two. Turnover is cost of goods sold divided by average inventory. Days sales of inventory is the period's days divided by the turnover.",
                    icon: Calculator,
                    stat: "COGS ÷ avg",
                    statLabel: "inventory",
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "Where the inputs come from",
                    description: "Cost of goods sold is on the profit and loss for the period. Opening and closing inventory are on the balance sheet, or in the inventory report valued at cost.",
                    icon: BookOpen,
                    stat: "2 statements",
                    statLabel: "P&L and balance sheet",
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                    statColor: "text-emerald-700 dark:text-emerald-300",
                },                {
                    title: "A worked example",
                    description: "$150,000 of cost of goods sold, with inventory of $25,000 at the start and $35,000 at the end, averages $30,000. Turnover is 5 times a year, and days sales of inventory is 73 days.",
                    icon: Table,
                    stat: "5.0",
                    statLabel: "turns a year",
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                    statColor: "text-violet-700 dark:text-violet-300",
                },                {
                    title: "What counts as good",
                    description: "It depends on what you sell. Groceries turn 15 or more times a year; furniture may turn 3. Compare with your own past periods and with sellers in your category, not with a general number.",
                    icon: AlertTriangle,
                    stat: "By category",
                    statLabel: "not one target",
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                    statColor: "text-amber-700 dark:text-amber-300",
                }
            ]}
        />
    )
}
