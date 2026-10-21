"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Scale, Banknote, Package } from "lucide-react"

/** The three things a reader does, in order, with the calculator's own field names. */
export function FBAHowToUse() {
    return (
        <ToolSteps
            steps={[
                { title: "Enter the Selling Price, Packaged Weight and the box's Length, Width and Height", description: "Use the packaged weight and dimensions, not the bare product. The marketplace you pick sets the units: pounds and inches for the US, kilograms and centimetres elsewhere.", icon: Scale },
                { title: "Pick the Product Category", description: "The referral fee is a percentage of the price that depends on the category, 15% for most. Open the advanced options to change it from General.", icon: Banknote },
                { title: "Read the fees and what's left", description: "The result shows the FBA fulfilment fee, the referral fee and the total Amazon takes. What's left is the price minus those fees, before your own product and shipping costs.", icon: Package }
            ]}
        />
    )
}
