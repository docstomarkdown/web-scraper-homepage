"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { Ticket, Calculator, Percent, Scale, AlertTriangle } from "lucide-react"

/** What the calculator computes, the formula in words, where the inputs come from, and one worked example. */
export function CouponROIGuide() {
    return (
        <ToolGuide
            title="How coupon ROI is worked out"
            icon={Ticket}
            items={[
                { title: "The formula in words", description: "Gross revenue equals redemptions times the average order value. Net revenue is gross revenue minus the discounts given. Cost of goods equals the order value times one minus the margin, times redemptions. Profit equals net revenue minus cost of goods minus the campaign cost, and ROI is that profit divided by the campaign cost.", icon: Calculator, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "A worked example", description: "A $300 campaign issues 1,000 coupons and 120 are redeemed on $60 orders with $10 off, at a 40% margin. Gross revenue is $7,200, discounts $1,200, net revenue $6,000, cost of goods $4,320. Profit after the campaign is $1,380, a 460% return on the $300 spent.", icon: Percent, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "Redemption rate", description: "Redemptions divided by coupons issued: 12% in the example. Rates differ a lot by channel, so compare against your own past campaigns. The rate tells you whether the next campaign should go wider or deeper.", icon: Scale, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "What it doesn't count", description: "Orders that would have happened without the coupon, and customers who come back later at full price. The first makes the ROI look better than it is, the second worse; the calculator treats every redemption as caused by the campaign.", icon: AlertTriangle, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" }
            ]}
        />
    )
}
