"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** What this calculator does, in plain words. Copy rules: docs/writing-style.md. */
export function EmailROIOverview() {
    return (
        <div id="overview">
            <ToolOverview
                heading="What the Email Marketing ROI Calculator tells you"
                headingAccent="Email Marketing ROI Calculator"
                definition="Type how many people you'll email, what the campaign costs, and the open, click and conversion rates you expect, and the calculator walks the list down to orders, revenue and profit. The return on investment at the end tells you whether the campaign pays for itself."
                facts={[
                    { stat: "Funnel", label: "step by step", detail: "Subscribers to opens to clicks to orders, each a share of the one before." },
                    { stat: "Revenue", label: "and profit", detail: "Orders multiplied by the average order value, minus the campaign cost." },
                    { stat: "ROI", label: "as a percentage", detail: "Profit divided by cost, so 300% means three dollars back for each one spent." },
                ]}
            />
        </div>
    )
}
