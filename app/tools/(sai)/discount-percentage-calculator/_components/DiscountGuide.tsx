"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { Tag, Calculator, Percent, ShoppingCart, AlertTriangle } from "lucide-react"

/** What the calculator computes, the formula in words, where the inputs come from, and one worked example. */
export function DiscountGuide() {
    return (
        <ToolGuide
            title="How the discount is worked out"
            icon={Tag}
            items={[
                { title: "The formulas in words", description: "Saving equals the original price times the discount percentage divided by 100; final price equals the original price minus the saving. Going the other way, discount percentage equals the original price minus the sale price, divided by the original price, times 100.", icon: Calculator, iconBg: "bg-blue-50 dark:bg-blue-950/40", iconColor: "text-blue-700 dark:text-blue-300" },
                { title: "A worked example", description: "An $80 item at 25% off saves $20 and costs $60. Three of them save $60 in total. If the tag instead shows $80 crossed out and $60 to pay, the discount is ($80 − $60) ÷ $80, which is 25%.", icon: Percent, iconBg: "bg-amber-50 dark:bg-amber-950/40", iconColor: "text-amber-700 dark:text-amber-300" },
                { title: "Stacked discounts", description: "Two discounts don't add. 20% off and then 10% off an $80 item is $80 × 0.8 × 0.9 = $57.60, a 28% total discount, not 30%. Run the calculator twice, feeding the first result into the second.", icon: ShoppingCart, iconBg: "bg-emerald-50 dark:bg-emerald-950/40", iconColor: "text-emerald-700 dark:text-emerald-300" },
                { title: "For sellers", description: "A percentage off comes straight out of your margin. A 25% discount on a product with a 40% margin leaves 15 points of margin, so check the bundle and break-even calculators on this site before a sale.", icon: AlertTriangle, iconBg: "bg-violet-50 dark:bg-violet-950/40", iconColor: "text-violet-700 dark:text-violet-300" }
            ]}
        />
    )
}
