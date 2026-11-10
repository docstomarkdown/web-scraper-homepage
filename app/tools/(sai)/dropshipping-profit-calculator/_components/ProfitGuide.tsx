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
                { title: "The formula in words", description: "Shipped orders equal orders received minus cancelled. RTO orders equal shipped orders times the RTO percentage, rounded down. Delivered orders equal shipped minus RTO. Revenue equals delivered orders times the selling price. Expenses equal delivered orders times the purchase price, plus every order's ad and other costs, plus shipping on delivered orders, plus shipping both ways on RTO orders. Net profit is revenue minus expenses, and net margin is net profit divided by revenue.", icon: Calculator, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "A worked example", description: "Purchase $300, selling $800, 100 orders, 10 cancelled, 20% RTO, $60 shipping, $150 ads and $20 other costs per order. 90 ship, 18 come back and 72 deliver: revenue $57,600. Expenses are $21,600 of goods, $15,000 of ads, $2,000 of other costs, $4,320 of shipping and $2,160 of RTO shipping both ways, $45,080 in all. Net profit is $12,520, a 21.7% net margin.", icon: Undo2, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "Why RTO hurts twice", description: "A returned parcel costs the shipping out and the shipping back, and the ad money that produced the order is gone. In the example the 18 returns cost $2,160 in shipping and carried $2,700 of ad spend that brought no sale.", icon: Megaphone, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "What it doesn't include", description: "Payment gateway fees, packaging, taxes and the time it takes to get refunds from the supplier. Put a share of them into Other Cost per Product to see the full picture.", icon: AlertTriangle, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" }
            ]}
        />
    )
}
