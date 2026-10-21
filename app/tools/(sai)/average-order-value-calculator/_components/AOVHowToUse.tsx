"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Banknote, ShoppingCart, Calculator } from "lucide-react"

/** The three things a reader does, in order, with the calculator's own field names. */
export function AOVHowToUse() {
    return (
        <ToolSteps
            steps={[
                { title: "Enter your Total Revenue", description: "Use the sales for one period, such as last month, before refunds. Shopify, WooCommerce and Amazon all show it on the sales report.", icon: Banknote },
                { title: "Enter your Total Orders", description: "The number of orders in the same period, not the number of items. One order with three items counts once.", icon: ShoppingCart },
                { title: "Read the average order value", description: "AOV is revenue divided by orders. Compare it month to month, and use it to set a free shipping threshold a little above it.", icon: Calculator }
            ]}
        />
    )
}
