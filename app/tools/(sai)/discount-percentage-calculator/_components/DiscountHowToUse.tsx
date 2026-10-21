"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Tag, Percent, Calculator } from "lucide-react"

/** The three things a reader does, in order, with the calculator's own field names. */
export function DiscountHowToUse() {
    return (
        <ToolSteps
            steps={[
                { title: "Choose Find Final Price or Find Discount %", description: "Find Final Price takes a discount percentage and gives the price to pay. Find Discount % takes the sale price and gives the percentage off.", icon: Tag },
                { title: "Enter the Original Price and the discount or the Final Price", description: "In the first mode, type the percentage off; in the second, type the sale price. Add a Quantity to see the saving across several items.", icon: Percent },
                { title: "Read the final price, the saving and the total saved", description: "The result shows what you pay per item, how much comes off, and the total saved for the quantity.", icon: Calculator }
            ]}
        />
    )
}
