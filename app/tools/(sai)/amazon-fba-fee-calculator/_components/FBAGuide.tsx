"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { Package, Percent, Box, Calculator, AlertTriangle } from "lucide-react"

/** What the calculator computes, the formula in words, where the inputs come from, and one worked example. */
export function FBAGuide() {
    return (
        <ToolGuide
            title="What the fees are"
            icon={Package}
            items={[
                { title: "Referral fee", description: "Amazon's commission on the sale: a percentage of the selling price set by the category, 15% for most, 8% for consumer electronics, and 8% for beauty and baby items at $10 and under, with a minimum of $0.30 in the US. It's charged on every sale, FBA or not.", icon: Percent, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "FBA fulfilment fee", description: "What Amazon charges to pick, pack and ship one unit and handle its customer service. It's set by the size tier (small standard, large standard or oversize) and the shipping weight. In the US, large standard and oversize items are charged on the greater of the packaged weight and the dimensional weight, length × width × height in inches ÷ 139.", icon: Box, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "A worked example (US)", description: "A $25 product weighing 1 lb in a 10 × 8 × 2 in box is large standard. Its dimensional weight is 160 ÷ 139 = 1.15 lb, more than the 1 lb it weighs, so the fulfilment fee is the 1 to 1.5 lb rate, $5.57. The 15% referral fee is $3.75. Amazon takes $9.32 and $15.68 is left before your product cost.", icon: Calculator, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "Why the number is an estimate", description: "The rate cards here are simplified to the main tiers and rounded, and Amazon changes them yearly and charges extra for dangerous goods and some categories. Check the fee preview and rate card in Seller Central before you commit to a price.", icon: AlertTriangle, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" }
            ]}
        />
    )
}
