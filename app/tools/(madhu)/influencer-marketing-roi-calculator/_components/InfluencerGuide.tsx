"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { AlertTriangle, BookOpen, Calculator, Table } from "lucide-react"

/** The formula in words, where the inputs come from, a worked example, and what the result leaves out. */
export function InfluencerGuide() {
    return (
        <ToolGuide
            title="How the numbers are worked out"
            icon={BookOpen}
            items={[
                {
                    title: "The formula, in words",
                    description: "Cost is the influencer fee plus ad spend plus product cost plus shipping, or the total you entered. Profit is revenue minus cost. ROI is profit divided by cost, as a percentage.",
                    icon: Calculator,
                    stat: "4 costs",
                    statLabel: "one revenue",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "Where the inputs come from",
                    description: "The fee is in the contract. Ad spend is in your ads manager. Product cost is the cost of goods for the units you sent. Revenue comes from the code or link you gave the influencer.",
                    icon: BookOpen,
                    stat: "Code or link",
                    statLabel: "to attribute sales",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-emerald-700 dark:text-emerald-300",
                },                {
                    title: "A worked example",
                    description: "A $1,000 fee, $500 of ads, $200 of product and $30 of shipping is $1,730 of cost. $5,000 of attributed revenue gives $3,270 of profit and a 189% ROI.",
                    icon: Table,
                    stat: "189%",
                    statLabel: "ROI on $1,730",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "What it leaves out",
                    description: "Followers who buy later without the code, and the cost of goods on the orders themselves, aren't counted. For a product with a thin margin, a positive ROI here can still be a loss once you take off what the sold goods cost.",
                    icon: AlertTriangle,
                    stat: "Revenue",
                    statLabel: "not margin",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-amber-700 dark:text-amber-300",
                }
            ]}
        />
    )
}
