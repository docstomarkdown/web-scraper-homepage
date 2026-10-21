"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { ShoppingCart, Repeat, Calculator } from "lucide-react"

/** The three things a reader does, in order, with the calculator's own field names. */
export function CLVHowToUse() {
    return (
        <ToolSteps
            steps={[
                { title: "Enter the Avg. Order Value, Annual Purchase Frequency and Customer Lifespan", description: "Order value is what a typical order is worth; frequency is how many orders a customer places a year; lifespan is how many years a customer keeps buying.", icon: ShoppingCart },
                { title: "Add your Gross Margin and Acquisition Cost (CAC) if you have them", description: "The margin turns lifetime revenue into lifetime profit. The acquisition cost lets the calculator show the LTV to CAC ratio.", icon: Repeat },
                { title: "Read lifetime revenue, lifetime profit and the ratio", description: "Lifetime revenue is the three inputs multiplied. Profit applies the margin. The ratio compares profit with the cost of winning the customer; three to one or better is the usual target.", icon: Calculator }
            ]}
        />
    )
}
