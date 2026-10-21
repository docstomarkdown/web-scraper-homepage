"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** One paragraph on what the calculator is for, and three plain facts about it. */
export function CLVOverview() {
    return (
        <ToolOverview
            heading="What is a customer worth over time?"
            headingAccent="over time"
            definition="Customer lifetime value is the revenue, and with a margin the profit, that one customer brings over the years they keep buying. This calculator multiplies order value, orders a year and lifespan, applies your margin, and sets the result against what you paid to win the customer."
            facts={[
                { stat: "3 inputs", label: "What you enter", detail: "Average order value, purchases a year and customer lifespan; margin and CAC are optional." },
                { stat: "AOV × frequency × years", label: "The formula", detail: "$60 × 4 × 3 is $720 of lifetime revenue." },
                { stat: "3 : 1", label: "The benchmark", detail: "Lifetime profit should be about three times the acquisition cost." }
            ]}
            accent="indigo"
        />
    )
}
