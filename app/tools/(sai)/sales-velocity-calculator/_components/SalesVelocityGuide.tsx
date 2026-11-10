"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BookOpen, Calculator, LineChart, ShieldAlert, TrendingUp } from "lucide-react"

export function SalesVelocityGuide() {
    return (
        <ToolGuide
            title="Raw velocity and true velocity"
            icon={BookOpen}
            items={[
                {
                    title: "The formulas",
                    description: "Raw velocity = units sold ÷ days in the period. True velocity = units sold ÷ (days − days out of stock). Monthly run rate = true velocity × 30.",
                    icon: Calculator,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Why the raw number misleads",
                    description: "If you were out of stock for part of the period, the raw average is too low and your next order will be too small. Use the true rate to reorder.",
                    icon: ShieldAlert,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Revenue run rate",
                    description: "True velocity × 30 × price is the revenue you could make in a month with stock all month. Compare it against the raw figure to see what stockouts cost.",
                    icon: LineChart,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "A worked example",
                    description: "300 units in 30 days with 5 days out of stock: raw velocity 10 a day, true velocity 12 a day. At $25 a unit the monthly run rate is 360 units and $9,000.",
                    icon: TrendingUp,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
            ]}
        />
    )
}
