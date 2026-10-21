"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { ShoppingCart, CheckCircle2, Percent } from "lucide-react"

/** The three things a reader does, in order, with the calculator's own field names. */
export function AbandonmentHowToUse() {
    return (
        <ToolSteps
            steps={[
                { title: "Enter the Number of Carts Created", description: "How many visitors added at least one item to a cart in the period. Shopify shows it under Reports as Sessions with cart additions; Google Analytics calls it add-to-cart events.", icon: ShoppingCart },
                { title: "Enter the Completed Transactions", description: "The orders placed in the same period. Use the same date range for both numbers or the rate is meaningless.", icon: CheckCircle2 },
                { title: "Read the abandonment rate", description: "The share of carts that never became an order. Most stores sit between 65% and 80%; track it monthly and after every checkout change.", icon: Percent }
            ]}
        />
    )
}
