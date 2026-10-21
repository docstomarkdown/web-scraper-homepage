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
                { title: "Referral fee", description: "Amazon's commission on the sale: a percentage of the selling price set by the category, 15% for most, 8% for consumer electronics and beauty, 17% for apparel, with a minimum of $0.30 in the US. It's charged on every sale, FBA or not.", icon: Percent, iconBg: "bg-blue-50 dark:bg-blue-950/40", iconColor: "text-blue-700 dark:text-blue-300" },
                { title: "FBA fulfilment fee", description: "What Amazon charges to pick, pack and ship one unit and handle its customer service. It's set by the size tier (small standard, large standard or oversize) and the packaged weight, with small surcharges that depend on the price band.", icon: Box, iconBg: "bg-amber-50 dark:bg-amber-950/40", iconColor: "text-amber-700 dark:text-amber-300" },
                { title: "A worked example (US)", description: "A $25 product weighing 1 lb in a 10 × 8 × 2 in box is large standard. The fulfilment fee is $4.75 plus a $0.08 price-band adjustment, $4.83. The 15% referral fee is $3.75. Amazon takes $8.58 and $16.42 is left before your product cost.", icon: Calculator, iconBg: "bg-emerald-50 dark:bg-emerald-950/40", iconColor: "text-emerald-700 dark:text-emerald-300" },
                { title: "Why the number is an estimate", description: "The rate cards here are simplified to the main tiers and rounded; Amazon changes them yearly, charges extra for dangerous goods and apparel, and uses dimensional weight for bulky items. Check the fee preview in Seller Central before you commit to a price.", icon: AlertTriangle, iconBg: "bg-violet-50 dark:bg-violet-950/40", iconColor: "text-violet-700 dark:text-violet-300" }
            ]}
        />
    )
}
