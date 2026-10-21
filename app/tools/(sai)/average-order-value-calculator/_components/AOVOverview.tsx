"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** One paragraph on what the calculator is for, and three plain facts about it. */
export function AOVOverview() {
    return (
        <ToolOverview
            heading="What is average order value?"
            headingAccent="average order value"
            definition="Average order value is what a typical order is worth: revenue divided by orders over the same period. It's the quickest health check for a store, because raising it adds revenue without finding new customers. Enter two numbers from your sales report and read the result."
            facts={[
                { stat: "2 inputs", label: "What you enter", detail: "Total revenue and total orders for the same period." },
                { stat: "Revenue ÷ orders", label: "The formula", detail: "$50,000 from 1,250 orders is a $40 AOV." },
                { stat: "3 levers", label: "How stores raise it", detail: "Bundles, a free shipping threshold and checkout add-ons." }
            ]}
            accent="emerald"
        />
    )
}
