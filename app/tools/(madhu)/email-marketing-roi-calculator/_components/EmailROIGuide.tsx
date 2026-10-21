"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { AlertTriangle, BookOpen, Calculator, Table } from "lucide-react"

/** The formula in words, where the inputs come from, a worked example, and what the result leaves out. */
export function EmailROIGuide() {
    return (
        <ToolGuide
            title="How the numbers are worked out"
            icon={BookOpen}
            items={[
                {
                    title: "The formula, in words",
                    description: "Opens are subscribers times the open rate. Clicks are opens times the click rate. Orders are clicks times the conversion rate. Revenue is orders times the average order value. Profit is revenue minus cost, and ROI is profit divided by cost, as a percentage.",
                    icon: Calculator,
                    stat: "4 rates",
                    statLabel: "multiplied down",
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "Where the inputs come from",
                    description: "Your email platform reports open and click rates for past campaigns. Conversion rate and order value come from your store's analytics, filtered to email traffic.",
                    icon: BookOpen,
                    stat: "2 reports",
                    statLabel: "email and store",
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                    statColor: "text-emerald-700 dark:text-emerald-300",
                },                {
                    title: "A worked example",
                    description: "10,000 subscribers at a 20% open rate is 2,000 opens. A 2.5% click rate gives 50 clicks; a 3% conversion rate gives about 2 orders. At $50 each that's $100 of revenue, so a $500 campaign loses $400. Raising the list to 100,000 turns the same rates into $1,000 of revenue and a 100% ROI.",
                    icon: Table,
                    stat: "100%",
                    statLabel: "ROI at 100,000 subscribers",
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                    statColor: "text-violet-700 dark:text-violet-300",
                },                {
                    title: "What it leaves out",
                    description: "Repeat purchases, unsubscribes and the value of a reader who buys later aren't counted. A campaign can be worth more than its first-week ROI, and a cheap one can cost you subscribers.",
                    icon: AlertTriangle,
                    stat: "First order",
                    statLabel: "only",
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                    statColor: "text-amber-700 dark:text-amber-300",
                }
            ]}
        />
    )
}
