"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Users, ShoppingCart, Percent } from "lucide-react"

/** The three things a reader does, in order, with the calculator's own field names. */
export function ConversionHowToUse() {
    return (
        <ToolSteps
            steps={[
                { title: "Enter your Total Visitors (Sessions)", description: "Sessions for the period from Google Analytics, Shopify or your store's own report. Use sessions, not page views.", icon: Users },
                { title: "Enter your Total Conversions", description: "Orders, sign-ups or whatever you count as a conversion, for the same period.", icon: ShoppingCart },
                { title: "Read the conversion rate", description: "Conversions divided by visitors, as a percentage. Compare it with last month and with the benchmark band the result shows.", icon: Percent }
            ]}
        />
    )
}
