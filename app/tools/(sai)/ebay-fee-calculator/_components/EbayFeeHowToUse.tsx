"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Tag, Percent, PieChart } from "lucide-react"

/** The three things a reader does, in order, with the calculator's own field names. */
export function EbayFeeHowToUse() {
    return (
        <ToolSteps
            steps={[
                { title: "Enter the Item Price and Shipping Charged", description: "eBay charges its final value fee on both, so the calculator adds them into the total the buyer pays.", icon: Tag },
                { title: "Enter your Product Cost and Shipping Cost, and the fee rates", description: "The eBay Fee is the final value fee percentage for your category, 13.25% for most; the Order Fee is the fixed amount per order; Promoted Listings is the ad rate if you use it.", icon: Percent },
                { title: "Read the fees, profit and margin", description: "The result shows the final value fee, the promoted listings fee, the total fees, the profit after your costs and the margin on the sale.", icon: PieChart }
            ]}
        />
    )
}
