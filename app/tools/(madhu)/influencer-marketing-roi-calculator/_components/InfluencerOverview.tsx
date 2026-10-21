"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** What this calculator does, in plain words. Copy rules: docs/writing-style.md. */
export function InfluencerOverview() {
    return (
        <div id="overview">
            <ToolOverview
                heading="What the Influencer Marketing ROI Calculator tells you"
                headingAccent="Influencer Marketing ROI Calculator"
                definition="An influencer campaign has more costs than the fee: the products you send, the shipping, and any ads you run behind the post. Type each cost, or one total, and the revenue the campaign produced, and the calculator shows the profit and the return on investment."
                facts={[
                    { stat: "True cost", label: "all in", detail: "Fee, ad spend, product cost and shipping added up, or a single total if that's what you have." },
                    { stat: "Profit", label: "or loss", detail: "Revenue minus the true cost, in money." },
                    { stat: "ROI", label: "as a percentage", detail: "Profit divided by cost; 100% means the campaign paid for itself twice over." },
                ]}
            />
        </div>
    )
}
