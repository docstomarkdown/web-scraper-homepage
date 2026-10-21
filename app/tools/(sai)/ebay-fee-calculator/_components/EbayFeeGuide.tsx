"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { Store, Calculator, Percent, Megaphone, AlertTriangle } from "lucide-react"

/** What the calculator computes, the formula in words, where the inputs come from, and one worked example. */
export function EbayFeeGuide() {
    return (
        <ToolGuide
            title="How eBay fees are worked out"
            icon={Store}
            items={[
                { title: "The formula in words", description: "Total revenue equals the item price plus shipping charged. The final value fee equals revenue times the fee rate plus the fixed order fee. The promoted listings fee equals revenue times the ad rate. Profit equals revenue minus your product cost, your shipping cost and the fees; margin is profit divided by revenue.", icon: Calculator, iconBg: "bg-blue-50 dark:bg-blue-950/40", iconColor: "text-blue-700 dark:text-blue-300" },
                { title: "A worked example", description: "A $100 item with $10 shipping charged is $110 of revenue. At 13.25% plus $0.30 the final value fee is $14.88; a 2% promoted listing adds $2.20, so fees are $17.08. With a $40 product cost and $8 to ship, profit is $44.92, a 40.8% margin.", icon: Percent, iconBg: "bg-amber-50 dark:bg-amber-950/40", iconColor: "text-amber-700 dark:text-amber-300" },
                { title: "Where the rates come from", description: "eBay's fee page lists the final value fee by category, most at 13.25% up to a price cap, with a fixed per-order fee of $0.30 in the US. Store subscribers pay less in many categories; enter your own rate.", icon: Megaphone, iconBg: "bg-emerald-50 dark:bg-emerald-950/40", iconColor: "text-emerald-700 dark:text-emerald-300" },
                { title: "What it doesn't include", description: "International selling fees, the higher rate above the price cap in some categories, payment disputes and the fee on sales tax collected in some regions. Check your eBay invoice for a real order to calibrate.", icon: AlertTriangle, iconBg: "bg-violet-50 dark:bg-violet-950/40", iconColor: "text-violet-700 dark:text-violet-300" }
            ]}
        />
    )
}
