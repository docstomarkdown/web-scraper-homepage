"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { Calculator, Undo2, Megaphone, AlertTriangle } from "lucide-react"

/** What the calculator computes, the formula in words, where the inputs come from, and one worked example. */
export function ProfitGuide() {
    return (
        <ToolGuide
            title="How net profit is worked out"
            icon={Calculator}
            items={[
                { title: "The formula in words", description: "RTO orders equal orders received times the RTO percentage, rounded down. Delivered orders equal orders received minus cancelled minus RTO. Revenue equals delivered orders times the selling price. Expenses equal delivered orders times the purchase price, plus every order's ad and other costs, plus shipping on delivered orders, plus shipping again on RTO orders. Net profit is revenue minus expenses.", icon: Calculator, iconBg: "bg-blue-50 dark:bg-blue-950/40", iconColor: "text-blue-700 dark:text-blue-300" },
                { title: "A worked example", description: "Purchase $300, selling $800, 100 orders, 10 cancelled, 20% RTO, $60 shipping, $150 ads and $20 other costs per order. 20 orders return and 70 deliver: revenue $56,000. Expenses are $21,000 of goods, $15,000 of ads, $2,000 of other costs, $4,200 of shipping and $1,200 of return shipping, $43,400 in all. Net profit is $12,600.", icon: Undo2, iconBg: "bg-amber-50 dark:bg-amber-950/40", iconColor: "text-amber-700 dark:text-amber-300" },
                { title: "Why RTO hurts twice", description: "A returned parcel costs the shipping out and the shipping back, and the ad money that produced the order is gone. In the example the 20 returns cost $1,200 in extra shipping and carried $3,000 of ad spend that brought no sale.", icon: Megaphone, iconBg: "bg-emerald-50 dark:bg-emerald-950/40", iconColor: "text-emerald-700 dark:text-emerald-300" },
                { title: "What it doesn't include", description: "Payment gateway fees, packaging, taxes and the time it takes to get refunds from the supplier. Put a share of them into Other Cost per Product to see the full picture.", icon: AlertTriangle, iconBg: "bg-violet-50 dark:bg-violet-950/40", iconColor: "text-violet-700 dark:text-violet-300" }
            ]}
        />
    )
}
