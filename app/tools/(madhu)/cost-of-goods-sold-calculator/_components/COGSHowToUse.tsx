"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Coins, Package, Table } from "lucide-react"

export function COGSHowToUse() {
    return (
        <ToolSteps
            title="How to use this calculator"
            steps={[
                { title: "Type the product cost and the quantity", description: "Product cost is what you pay the supplier for one unit. Quantity is how many units you're ordering; the total uses it.", icon: Coins },
                { title: "Add shipping, packaging and fulfilment per unit", description: "Shipping is the inbound freight divided by the units in the shipment. Packaging is the box, filler and label. Fulfilment is the pick, pack and ship fee per order.", icon: Package },
                { title: "Read the results", description: "The cost per unit is the main number; the total for the quantity sits beside it. Change any input and both update.", icon: Table },
            ]}
        />
    )
}
