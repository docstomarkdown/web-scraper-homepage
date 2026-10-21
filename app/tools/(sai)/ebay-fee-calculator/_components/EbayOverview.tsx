"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** One paragraph on what the calculator is for, and three plain facts about it. */
export function EbayOverview() {
    return (
        <ToolOverview
            heading="What does eBay take from a sale?"
            headingAccent="eBay take"
            definition="eBay charges a final value fee on the item price and the shipping you charge, plus a fixed amount per order and an optional promoted listings fee. This calculator applies the rates you enter to a sale, subtracts your own costs and shows the fees, the profit and the margin."
            facts={[
                { stat: "Price + shipping", label: "What's charged on", detail: "The final value fee applies to the whole amount the buyer pays." },
                { stat: "13.25% + $0.30", label: "The common rate", detail: "Most categories, before store discounts; enter your own." },
                { stat: "Profit and margin", label: "What you get", detail: "What's left after fees, product and shipping costs, and as a share of revenue." }
            ]}
            accent="blue"
        />
    )
}
