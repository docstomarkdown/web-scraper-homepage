"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { AlertTriangle, BookOpen, Calculator, Table } from "lucide-react"

/** The formula in words, where the inputs come from, a worked example, and what the result leaves out. */
export function AffiliateGuide() {
    return (
        <ToolGuide
            title="How the numbers are worked out"
            icon={BookOpen}
            items={[
                {
                    title: "The formula, in words",
                    description: "Estimated sales are clicks multiplied by the conversion rate. Revenue is sales multiplied by the average order value. Payout is revenue multiplied by the commission rate. Net profit is revenue minus payout minus product cost.",
                    icon: Calculator,
                    stat: "4 steps",
                    statLabel: "one after another",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "Where the inputs come from",
                    description: "Clicks and conversion rate are in your affiliate platform's report. Average order value is in your store's sales report. Product cost as a share of revenue comes from your cost of goods divided by sales.",
                    icon: BookOpen,
                    stat: "3 reports",
                    statLabel: "store and affiliate",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-emerald-700 dark:text-emerald-300",
                },                {
                    title: "A worked example",
                    description: "10,000 clicks at 2.5% give 250 sales. At $75 an order that's $18,750 of revenue. A 10% commission is $1,875. With product cost at 40% ($7,500), net profit is $9,375.",
                    icon: Table,
                    stat: "$1,875",
                    statLabel: "payout on $18,750",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "What it leaves out",
                    description: "Returns, refunds, payment fees and your own time aren't in the formula. Treat the result as the top of the range, and keep a margin for them when you set the rate.",
                    icon: AlertTriangle,
                    stat: "Estimate",
                    statLabel: "not a forecast",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-amber-700 dark:text-amber-300",
                }
            ]}
        />
    )
}
