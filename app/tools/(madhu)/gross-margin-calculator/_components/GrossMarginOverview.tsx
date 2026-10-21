"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** What this calculator does, in plain words. Copy rules: docs/writing-style.md. */
export function GrossMarginOverview() {
    return (
        <div id="overview">
            <ToolOverview
                heading="What the Gross Margin Calculator tells you"
                headingAccent="Gross Margin Calculator"
                definition="Gross margin is the share of each sale left after the cost of the goods. Type revenue and cost to get the margin, or set a target margin to find the revenue you need or the most you can pay for the goods. Three modes, one formula."
                facts={[
                    { stat: "Find margin", label: "from revenue and cost", detail: "Gross profit divided by revenue, as a percentage." },
                    { stat: "Find revenue", label: "for a target margin", detail: "The price you need to charge to keep the margin you want." },
                    { stat: "Find COGS", label: "for a target margin", detail: "The most the goods can cost at your price and target margin." },
                ]}
            />
        </div>
    )
}
