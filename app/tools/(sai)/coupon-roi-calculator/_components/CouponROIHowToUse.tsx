"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Ticket, Percent, PieChart } from "lucide-react"

/** The three things a reader does, in order, with the calculator's own field names. */
export function CouponROIHowToUse() {
    return (
        <ToolSteps
            steps={[
                { title: "Enter the Campaign Cost, Number of Coupons Issued and Redemptions", description: "Campaign cost is what you paid to run it: design, email or ad spend, printing. Redemptions are the orders that used the coupon.", icon: Ticket },
                { title: "Enter the Average Order Value, Discount Amount (per order) and Profit Margin", description: "Average order value is what a coupon order was worth before the discount; the discount is the amount taken off each order; the margin is your gross margin before the campaign.", icon: Percent },
                { title: "Read the revenue, profit and ROI", description: "The result shows gross revenue, the discounts given, the cost of goods, the profit after the campaign cost and the return on investment as a percentage of the campaign cost.", icon: PieChart }
            ]}
        />
    )
}
