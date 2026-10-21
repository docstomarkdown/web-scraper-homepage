"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** One paragraph on what the calculator is for, and three plain facts about it. */
export function EtsyOverview() {
    return (
        <ToolOverview
            heading="What does Etsy take from a sale?"
            headingAccent="Etsy take"
            definition="Etsy charges four fees on a sale: a listing fee, a transaction fee on the price and shipping, a payment processing fee, and an offsite ads fee when an ad brought the buyer. This calculator applies them to one sale, subtracts your costs and shows the profit and margin."
            facts={[
                { stat: "4 fees", label: "What Etsy charges", detail: "Listing $0.20, transaction 6.5%, payment 3% + $0.25, offsite ads 12% or 15% when it applies." },
                { stat: "Price + shipping", label: "What's charged on", detail: "The transaction and payment fees apply to the whole amount the buyer pays." },
                { stat: "Profit and margin", label: "What you get", detail: "What's left after fees, product and shipping costs, and as a share of revenue." }
            ]}
            accent="amber"
        />
    )
}
