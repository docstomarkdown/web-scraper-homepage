"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** What this calculator does, in plain words. Copy rules: docs/writing-style.md. */
export function AffiliateOverview() {
    return (
        <div id="overview">
            <ToolOverview
                heading="What the Affiliate Commission Calculator tells you"
                headingAccent="Affiliate Commission Calculator"
                definition="Type the clicks an affiliate sends, how many turn into orders, the average order value and the commission rate. The calculator shows the commission you'll owe, the revenue those orders bring, and the profit left after the product cost. Use it before you agree a rate, and again when you change one."
                facts={[
                    { stat: "Payout", label: "What you owe", detail: "The commission total for the orders those clicks produce, before you commit to a rate." },
                    { stat: "Net profit", label: "What you keep", detail: "Revenue minus the payout and your product cost, so a rate that looks generous shows its real effect." },
                    { stat: "Compare", label: "Rates side by side", detail: "Change one number and read the result again. Trying 10%, 12% and 15% takes a minute." },
                ]}
            />
        </div>
    )
}
