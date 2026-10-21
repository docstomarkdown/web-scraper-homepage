"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Tag, Truck, PieChart } from "lucide-react"

/** The three things a reader does, in order, with the calculator's own field names. */
export function DropshippingHowToUse() {
    return (
        <ToolSteps
            steps={[
                { title: "Enter the Purchase Price, Selling Price and Orders Received", description: "Purchase price is what the supplier charges you per unit; selling price is what the customer pays; orders received is the number of orders in the period.", icon: Tag },
                { title: "Enter Cancelled Qty, Return to Origin (RTO %), Shipping Cost, Ads Cost per Product and Other Cost per Product", description: "Cancelled orders never ship. RTO is the share of orders the customer refuses on delivery, common with cash on delivery. Ads and other costs are per order received, because you paid them before the order was delivered.", icon: Truck },
                { title: "Read the delivered orders, net profit and margin", description: "Only delivered orders bring revenue, but ads and other costs apply to every order and returned parcels cost shipping twice. The result shows how much is left and the return on your ad spend.", icon: PieChart }
            ]}
        />
    )
}
