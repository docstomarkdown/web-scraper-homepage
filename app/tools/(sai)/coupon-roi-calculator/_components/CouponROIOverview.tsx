"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** One paragraph on what the calculator is for, and three plain facts about it. */
export function CouponROIOverview() {
    return (
        <ToolOverview
            heading="Did the coupon campaign pay?"
            headingAccent="coupon campaign"
            definition="A coupon costs you twice: what you spend to send it and what you give away on each order. This calculator sets both against the revenue the redemptions brought and the margin on those goods, and shows the profit and the return on the campaign cost."
            facts={[
                { stat: "6 inputs", label: "What you enter", detail: "Campaign cost, coupons issued, redemptions, order value, discount per order and margin." },
                { stat: "2 costs", label: "What a coupon costs", detail: "The campaign spend plus the discount given on every redeemed order." },
                { stat: "Profit ÷ cost", label: "The return", detail: "$1,380 of profit on a $300 campaign is a 460% ROI." }
            ]}
            accent="violet"
        />
    )
}
