"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { Store, Calculator, Percent, Megaphone, AlertTriangle } from "lucide-react"

/** What the calculator computes, the formula in words, where the inputs come from, and one worked example. */
export function EtsyFeeGuide() {
    return (
        <ToolGuide
            title="How Etsy fees are worked out"
            icon={Store}
            items={[
                { title: "The formula in words", description: "Revenue equals the item price plus shipping charged. Fees are the listing fee, plus revenue times the transaction rate, plus revenue times the payment rate plus the fixed payment fee, plus revenue times the offsite ads rate. Profit equals revenue minus your product cost, your shipping cost and the fees; margin is profit divided by revenue.", icon: Calculator, iconBg: "bg-blue-50 dark:bg-blue-950/40", iconColor: "text-blue-700 dark:text-blue-300" },
                { title: "A worked example", description: "A $40 item with $5 shipping charged is $45 of revenue. The listing fee is $0.20, the 6.5% transaction fee $2.93, payment processing at 3% plus $0.25 is $1.60, and no offsite ad applies: $4.73 in fees. With a $12 product cost and $4 to ship, profit is $24.27, a 53.9% margin.", icon: Percent, iconBg: "bg-amber-50 dark:bg-amber-950/40", iconColor: "text-amber-700 dark:text-amber-300" },
                { title: "Offsite ads", description: "If a buyer arrives from an Etsy offsite ad and buys within 30 days, Etsy charges 15% of the order, or 12% for shops that made over $10,000 in the past year. Enter the rate when the sale came through an ad, otherwise leave it at zero.", icon: Megaphone, iconBg: "bg-emerald-50 dark:bg-emerald-950/40", iconColor: "text-emerald-700 dark:text-emerald-300" },
                { title: "What it doesn't include", description: "Currency conversion (2.5%), regulatory operating fees in some countries, Etsy Ads you pay per click, and the listing fee for renewals after a sale. Compare with your Etsy payment account for one real order.", icon: AlertTriangle, iconBg: "bg-violet-50 dark:bg-violet-950/40", iconColor: "text-violet-700 dark:text-violet-300" }
            ]}
        />
    )
}
