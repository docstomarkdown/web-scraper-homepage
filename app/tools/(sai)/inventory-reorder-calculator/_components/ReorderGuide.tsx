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
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Why lead time matters most",
                    description: "If a supplier takes 30 days, you must order while you still hold 30 days of sales. Count lead time from the day you place the order to the day stock is on the shelf.",
                    icon: Timer,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "What a safety buffer is",
                    description: "The buffer is extra stock measured in days of sales. Seven days means you can absorb a week of delay or a week of higher demand without running out.",
                    icon: ShieldAlert,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "A worked example",
                    description: "You sell 10 units a day, your supplier takes 14 days, and you want a 7-day buffer. Lead-time demand is 140 units and the buffer is 70, so the reorder point is 210. With 300 units in stock, you have 9 days before you must order.",
                    icon: BarChart3,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
            ]}
        />
    )
}
