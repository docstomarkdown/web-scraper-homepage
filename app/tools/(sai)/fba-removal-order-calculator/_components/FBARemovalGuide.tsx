"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { Scale, Calculator, Truck, Trash2, AlertTriangle } from "lucide-react"

/** What the calculator computes, the formula in words, where the inputs come from, and one worked example. */
export function FBARemovalGuide() {
    return (
        <ToolGuide
            title="How the comparison is worked out"
            icon={Scale}
            items={[
                { title: "The formula in words", description: "Profit if removed equals the expected selling price minus the removal fee minus other costs, times the units. Loss if disposed equals the disposal fee times the units. If the removal profit is positive, removal wins by that profit plus the avoided disposal loss; if both lose money, the smaller loss wins.", icon: Calculator, iconBg: "bg-blue-50 dark:bg-blue-950/40", iconColor: "text-blue-700 dark:text-blue-300" },
                { title: "A worked example", description: "100 units, a $1.04 removal fee, a $1.04 disposal fee, an expected price of $8 and $2 of other costs per unit. Removal makes ($8 − $1.04 − $2) × 100 = $496. Disposal loses $104. Remove: the difference is $600 in your favour.", icon: Truck, iconBg: "bg-amber-50 dark:bg-amber-950/40", iconColor: "text-amber-700 dark:text-amber-300" },
                { title: "When disposal wins", description: "When the units can't be sold for more than the removal fee plus the cost of selling them. Damaged stock, expired goods and items that cost more to ship than they fetch are the usual cases; disposal caps the loss at the fee.", icon: Trash2, iconBg: "bg-emerald-50 dark:bg-emerald-950/40", iconColor: "text-emerald-700 dark:text-emerald-300" },
                { title: "A third option", description: "Amazon's liquidation programme sells the stock to a liquidator and pays you a small share of the price, with no removal fee. It's worth checking for units that would otherwise be disposed of.", icon: AlertTriangle, iconBg: "bg-violet-50 dark:bg-violet-950/40", iconColor: "text-violet-700 dark:text-violet-300" }
            ]}
        />
    )
}
