"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { AlertTriangle, BookOpen, Calculator, Scale, Table } from "lucide-react"

/** The formula in words, where the inputs come from, a worked example, and what the result leaves out. */
export function GrossMarginGuide() {
    return (
        <ToolGuide
            title="How the numbers are worked out"
            icon={BookOpen}
            items={[
                {
                    title: "The formula, in words",
                    description: "Gross profit is revenue minus cost of goods sold. Gross margin is gross profit divided by revenue, as a percentage. To find revenue from a target margin, divide the cost by one minus the margin. To find the cost, multiply revenue by one minus the margin.",
                    icon: Calculator,
                    stat: "1 − margin",
                    statLabel: "is the cost share",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "Margin is not markup",
                    description: "A 40% margin on $10,000 of revenue is $4,000 of profit on $6,000 of cost, which is a 67% markup. Suppliers quote markup; your accounts show margin. Don't mix them.",
                    icon: Scale,
                    stat: "40% ≠ 40%",
                    statLabel: "margin vs markup",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-amber-700 dark:text-amber-300",
                },                {
                    title: "A worked example",
                    description: "Revenue of $10,000 with $6,000 of cost gives $4,000 gross profit and a 40% margin. To hold 40% on goods that cost $7,500, you'd need $12,500 of revenue. At $10,000 of revenue and a 40% target, the goods can cost at most $6,000.",
                    icon: Table,
                    stat: "40%",
                    statLabel: "on $10,000",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "What it leaves out",
                    description: "Gross margin ignores fees, advertising, overheads and tax. Use the net profit calculator for what's left at the end; use gross margin to compare products and price points.",
                    icon: AlertTriangle,
                    stat: "Gross",
                    statLabel: "not net",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-emerald-700 dark:text-emerald-300",
                }
            ]}
        />
    )
}
