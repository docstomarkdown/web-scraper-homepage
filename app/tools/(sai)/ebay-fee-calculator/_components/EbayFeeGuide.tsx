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
                { title: "The formula in words", description: "Total revenue equals the item price plus shipping charged. The final value fee equals revenue times the fee rate plus the fixed order fee. The promoted listings fee equals revenue times the ad rate. Profit equals revenue minus your product cost, your shipping cost and the fees; margin is profit divided by revenue.", icon: Calculator, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "A worked example", description: "A $100 item with $10 shipping charged is $110 of revenue. At 13.6% plus $0.40 the final value fee is $15.36; a 2% promoted listing adds $2.20, so fees are $17.56. With a $40 product cost and $8 to ship, profit is $44.44, a 40.4% margin.", icon: Percent, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "Where the rates come from", description: "eBay's fee page lists the final value fee by category, most at 13.6% up to $7,500 and 2.35% above, with a per-order fee of $0.30 on orders of $10 or less and $0.40 above in the US. Store subscribers pay less in many categories; enter your own rate.", icon: Megaphone, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "What it doesn't include", description: "International selling fees, the higher rate above the price cap in some categories, payment disputes and the fee on sales tax collected in some regions. Check your eBay invoice for a real order to calibrate.", icon: AlertTriangle, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" }
            ]}
        />
    )
}
