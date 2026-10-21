"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { ShoppingCart, Truck, TrendingUp } from "lucide-react"

/** The three things a reader does, in order, with the calculator's own field names. */
export function FreeShippingHowToUse() {
    return (
        <ToolSteps
            steps={[
                { title: "Enter your Average Order Value and Gross Margin", description: "Average order value is revenue divided by orders; gross margin is the share of the order price left after the cost of goods.", icon: ShoppingCart },
                { title: "Enter your Average Shipping Cost and a Proposed Free Shipping Threshold", description: "The shipping cost is what you'd absorb per order. The threshold is the order value above which you'd ship free; try one a little above today's average order.", icon: Truck },
                { title: "Read the profit per order and the required sales increase", description: "The result shows the gross profit per order, what's left after absorbing shipping, and how much more you'd need to sell to make the same total profit as before.", icon: TrendingUp }
            ]}
        />
    )
}
