"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** One paragraph on what the calculator is for, and three plain facts about it. */
export function AdBudgetOverview() {
    return (
        <ToolOverview
            heading="How much should you spend on ads?"
            headingAccent="spend on ads"
            definition="This planner works backwards from a revenue goal. Enter the sales you want in a month and the return you need from each unit of ad spend, and it gives the monthly and daily budget, then estimates the clicks and orders that budget buys at your cost per click and conversion rate."
            facts={[
                { stat: "4 inputs", label: "What you enter", detail: "Revenue goal, target ROAS, average cost per click and conversion rate." },
                { stat: "Goal ÷ ROAS", label: "The budget", detail: "A $20,000 goal at a 4× ROAS needs $5,000 of ads." },
                { stat: "Clicks → orders", label: "The check", detail: "Budget ÷ CPC gives clicks; clicks × conversion rate gives orders." }
            ]}
            accent="indigo"
        />
    )
}
