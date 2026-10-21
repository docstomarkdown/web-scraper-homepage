"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { Target, Percent, Scale, Calculator } from "lucide-react"

export function ACoSGuide() {
    return (
        <ToolGuide
            title="Mastering ACoS & Ad Profitability"
            icon={Target}
            items={[
                {
                    title: "What is ACoS?",
                    description: "Advertising Cost of Sales (ACoS) measures the efficiency of your ad campaigns. It shows exactly how much of your ad revenue is consumed by your ad spend.",
                    icon: Percent,
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-600 dark:text-blue-400",
                    tooltip: "Ad Spend ÷ Ad Revenue",
                    stat: "15-30%",
                    statColor: "text-blue-600 dark:text-blue-400",
                    statLabel: "Typical Benchmark"
                },
                {
                    title: "Profit Margin Impact",
                    description: "Your baseline profit margin acts as your breakeven threshold. If your ACoS is lower than your profit margin, your campaigns are profitable. If it is higher, you are losing money.",
                    icon: Scale,
                    iconBg: "bg-indigo-50 dark:bg-indigo-950/40",
                    iconColor: "text-indigo-600 dark:text-indigo-400",
                    stat: "< Margin",
                    statColor: "text-indigo-600 dark:text-indigo-400",
                    statLabel: "Required for Profit"
                },
                {
                    title: "Calculating Net Profit",
                    description: "True success isn't just about revenue—it's about what you keep. By combining ACoS with your margin, you can determine exactly how much real profit your ads are generating.",
                    icon: Calculator,
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-600 dark:text-emerald-400",
                    stat: "$ Output",
                    statColor: "text-emerald-600 dark:text-emerald-400",
                    statLabel: "The Real Goal"
                }
            ]}
        />
    )
}