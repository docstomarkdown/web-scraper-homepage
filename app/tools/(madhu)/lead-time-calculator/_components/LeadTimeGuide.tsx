"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BookOpen, Calculator, RefreshCw, Table } from "lucide-react"

/** The formula in words, where the inputs come from, a worked example, and what the result leaves out. */
export function LeadTimeGuide() {
    return (
        <ToolGuide
            title="How the numbers are worked out"
            icon={BookOpen}
            items={[
                {
                    title: "The formula, in words",
                    description: "Total lead time is supplier time plus shipping time plus the safety buffer. Part days round up to a whole day, and the arrival date is today plus that many days. Each part's share is its days divided by the total.",
                    icon: Calculator,
                    stat: "3 parts",
                    statLabel: "added up",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "Where the inputs come from",
                    description: "Your supplier quotes production days; add their usual delay from past orders. Your forwarder quotes transit days per route. The buffer is your own judgement, informed by the last few orders.",
                    icon: BookOpen,
                    stat: "Past orders",
                    statLabel: "beat the quote",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-emerald-700 dark:text-emerald-300",
                },                {
                    title: "A worked example",
                    description: "14 days at the supplier, 7 days shipping and a 3-day buffer is 24 days. Order on the 1st and the stock is ready on the 25th. The supplier is 58% of the wait, so that's where a faster option saves the most.",
                    icon: Table,
                    stat: "24 days",
                    statLabel: "order to shelf",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "Use it with the other two",
                    description: "Lead time feeds the reorder point (daily sales × lead time + safety stock) and sets the floor for days of inventory. If your runway is shorter than your lead time, you're already late.",
                    icon: RefreshCw,
                    stat: "ROP",
                    statLabel: "uses this number",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-amber-700 dark:text-amber-300",
                }
            ]}
        />
    )
}
