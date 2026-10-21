"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { Target, Percent, Scale, Calculator, AlertTriangle } from "lucide-react"

/** What the calculator computes, the formula in words, where the inputs come from, and one worked example. */
export function ACoSGuide() {
    return (
        <ToolGuide
            title="What ACoS tells you"
            icon={Target}
            items={[
                { title: "The formula in words", description: "ACoS equals ad spend divided by ad revenue, times 100. ROAS is the same ratio the other way round: ad revenue divided by ad spend. A 25% ACoS and a 4× ROAS describe the same campaign.", icon: Percent, iconBg: "bg-blue-50 dark:bg-blue-950/40", iconColor: "text-blue-700 dark:text-blue-300" },
                { title: "Why your margin is the ceiling", description: "Your profit margin before ads is the break-even ACoS. If ACoS is below the margin the campaign adds profit; if it's above, every ad sale loses money. Net profit after ads equals ad revenue times margin, minus ad spend.", icon: Scale, iconBg: "bg-amber-50 dark:bg-amber-950/40", iconColor: "text-amber-700 dark:text-amber-300" },
                { title: "A worked example", description: "Ad spend $500, ad revenue $2,000, margin 30%. ACoS is 25% and ROAS is 4×. Net profit after ads is $2,000 × 30% − $500 = $100. The break-even ACoS is 30%, so there's 5 points of room before the campaign stops paying.", icon: Calculator, iconBg: "bg-emerald-50 dark:bg-emerald-950/40", iconColor: "text-emerald-700 dark:text-emerald-300" },
                { title: "What it doesn't do", description: "It measures the sales the ads were credited with, not sales the ads influenced without a click. Organic lift and repeat purchases aren't in the number, so a campaign can be worth more than its ACoS shows.", icon: AlertTriangle, iconBg: "bg-violet-50 dark:bg-violet-950/40", iconColor: "text-violet-700 dark:text-violet-300" }
            ]}
        />
    )
}
