"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { Layers, Calculator, Percent, Gift, AlertTriangle } from "lucide-react"

/** What the calculator computes, the formula in words, where the inputs come from, and one worked example. */
export function BundleGuide() {
    return (
        <ToolGuide
            title="How bundle profit is worked out"
            icon={Layers}
            items={[
                { title: "The formula in words", description: "Combined cost is the sum of the products' costs; combined price is the sum of their selling prices. The bundle price is the combined price minus the discount, or the fixed price you set. Profit equals bundle price minus combined cost, and margin equals profit divided by bundle price.", icon: Calculator, iconBg: "bg-blue-50 dark:bg-blue-950/40", iconColor: "text-blue-700 dark:text-blue-300" },
                { title: "A worked example", description: "Product A costs $8 and sells for $20; product B costs $5 and sells for $15. Together they cost $13 and list for $35. With a 20% bundle discount the bundle sells for $28, the profit is $15 and the margin is 53.6%, down from 62.9% at full price.", icon: Percent, iconBg: "bg-amber-50 dark:bg-amber-950/40", iconColor: "text-amber-700 dark:text-amber-300" },
                { title: "Why bundles can still win at a lower margin", description: "A bundle raises the order value and ships as one parcel, so shipping and marketing cost per unit fall. If customers buy two items instead of one, a lower margin on a bigger order can mean more profit per customer.", icon: Gift, iconBg: "bg-emerald-50 dark:bg-emerald-950/40", iconColor: "text-emerald-700 dark:text-emerald-300" },
                { title: "What it doesn't include", description: "Shipping, packaging, payment fees and marketplace fees aren't in the cost unless you add them to each product's cost. Put a share of them into the cost fields to see the real margin.", icon: AlertTriangle, iconBg: "bg-violet-50 dark:bg-violet-950/40", iconColor: "text-violet-700 dark:text-violet-300" }
            ]}
        />
    )
}
