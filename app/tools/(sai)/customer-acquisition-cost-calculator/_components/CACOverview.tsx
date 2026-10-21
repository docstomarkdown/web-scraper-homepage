"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** One paragraph on what the calculator is for, and three plain facts about it. */
export function CACOverview() {
    return (
        <ToolOverview
            heading="What does a new customer cost you?"
            headingAccent="new customer"
            definition="Customer acquisition cost is everything you spend to win customers divided by the customers you won. This calculator takes the two totals for a period and gives the cost per new customer, the number to hold against what a customer is worth over time."
            facts={[
                { stat: "2 inputs", label: "What you enter", detail: "Total sales and marketing costs, and the new customers they brought." },
                { stat: "Costs ÷ customers", label: "The formula", detail: "$12,000 that brought 300 new customers is a $40 CAC." },
                { stat: "3 : 1", label: "The benchmark", detail: "Lifetime profit per customer should be about three times the CAC." }
            ]}
            accent="blue"
        />
    )
}
