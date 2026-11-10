"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** One paragraph on what the calculator is for, and three plain facts about it. */
export function CACOverview() {
    return (
        <ToolOverview
            heading="What does a new customer cost you?"
            headingAccent="new customer"
            definition="Customer acquisition cost is everything you spend to win customers divided by the customers you won. This calculator takes the two totals for a period, or a cost per click and conversion rate, and gives the cost per new customer. It works the same way for CPA (cost per acquisition): enter ad spend and conversions. Add a customer's lifetime value to see the LTV:CAC ratio."
            facts={[
                { stat: "2 inputs", label: "What you enter", detail: "Total sales and marketing costs and the new customers they brought, or a cost per click and conversion rate." },
                { stat: "Costs ÷ customers", label: "The formula", detail: "$12,000 that brought 300 new customers is a $40 CAC." },
                { stat: "3 : 1", label: "The benchmark", detail: "A common rule of thumb: lifetime profit per customer about three times the CAC." }
            ]}
            accent="blue"
        />
    )
}
