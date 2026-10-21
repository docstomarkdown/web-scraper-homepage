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
                { title: "The formula in words", description: "Gross revenue equals redemptions times the average order value. Net revenue is gross revenue minus the discounts given. Cost of goods equals the order value times one minus the margin, times redemptions. Profit equals net revenue minus cost of goods minus the campaign cost, and ROI is that profit divided by the campaign cost.", icon: Calculator, iconBg: "bg-blue-50 dark:bg-blue-950/40", iconColor: "text-blue-700 dark:text-blue-300" },
                { title: "A worked example", description: "A $300 campaign issues 1,000 coupons and 120 are redeemed on $60 orders with $10 off, at a 40% margin. Gross revenue is $7,200, discounts $1,200, net revenue $6,000, cost of goods $4,320. Profit after the campaign is $1,380, a 460% return on the $300 spent.", icon: Percent, iconBg: "bg-amber-50 dark:bg-amber-950/40", iconColor: "text-amber-700 dark:text-amber-300" },
                { title: "Redemption rate", description: "Redemptions divided by coupons issued: 12% in the example. Email coupons to past customers often redeem at 5% to 15%; printed and ad coupons far lower. The rate tells you whether the next campaign should go wider or deeper.", icon: Scale, iconBg: "bg-emerald-50 dark:bg-emerald-950/40", iconColor: "text-emerald-700 dark:text-emerald-300" },
                { title: "What it doesn't count", description: "Orders that would have happened without the coupon, and customers who come back later at full price. The first makes the ROI look better than it is, the second worse; the calculator treats every redemption as caused by the campaign.", icon: AlertTriangle, iconBg: "bg-violet-50 dark:bg-violet-950/40", iconColor: "text-violet-700 dark:text-violet-300" }
            ]}
        />
    )
}
