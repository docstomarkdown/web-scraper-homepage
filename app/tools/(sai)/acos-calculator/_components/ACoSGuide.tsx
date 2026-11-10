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
                { title: "The formula in words", description: "ACoS equals ad spend divided by ad revenue, times 100. ROAS is the same ratio the other way round: ad revenue divided by ad spend. A 25% ACoS and a 4× ROAS describe the same campaign.", icon: Percent, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "Why your margin is the ceiling", description: "Your profit margin before ads is the break-even ACoS. If ACoS is below the margin the campaign adds profit; if it's above, every ad sale loses money. Net profit after ads equals ad revenue times margin, minus ad spend.", icon: Scale, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "A worked example", description: "Ad spend $500, ad revenue $2,000, margin 30%. ACoS is 25% and ROAS is 4×. Net profit after ads is $2,000 × 30% − $500 = $100. The break-even ACoS is 30%, so there's 5 points of room before the campaign stops paying.", icon: Calculator, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "What it doesn't do", description: "It measures the sales the ads were credited with, not sales the ads influenced without a click. Organic lift and repeat purchases aren't in the number, so a campaign can be worth more than its ACoS shows.", icon: AlertTriangle, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" }
            ]}
        />
    )
}
