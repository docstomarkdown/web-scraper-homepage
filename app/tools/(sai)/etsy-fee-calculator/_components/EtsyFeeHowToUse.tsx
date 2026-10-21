"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Tag, Percent, PieChart } from "lucide-react"

/** The three things a reader does, in order, with the calculator's own field names. */
export function EtsyFeeHowToUse() {
    return (
        <ToolSteps
            steps={[
                { title: "Enter the Item Price and Shipping Charged to Customer", description: "Etsy's transaction and payment fees apply to both, so the calculator adds them into the total the buyer pays.", icon: Tag },
                { title: "Enter your Product Cost and Shipping Cost, then check the fee rates", description: "The defaults are Etsy's US rates: a $0.20 listing fee, a 6.5% transaction fee, 3% plus $0.25 payment processing, and offsite ads at 0%, 12% or 15% depending on whether an ad brought the sale.", icon: Percent },
                { title: "Read the fees, profit and margin", description: "The result shows each fee, the total Etsy takes, the profit after your costs and the margin on the sale.", icon: PieChart }
            ]}
        />
    )
}
