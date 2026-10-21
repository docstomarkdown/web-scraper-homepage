"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** One paragraph on what the calculator is for, and three plain facts about it. */
export function BreakEvenOverview() {
    return (
        <ToolOverview
            heading="When do you start making money?"
            headingAccent="making money"
            definition="Break-even is the point where sales cover all costs. This calculator takes your fixed costs, your price and your cost per unit and tells you how many units that is, and what revenue those units bring in. Below the number you're losing money; above it, every unit adds the contribution margin to profit."
            facts={[
                { stat: "3 inputs", label: "What you enter", detail: "Fixed costs, price per unit and variable cost per unit." },
                { stat: "Fixed ÷ margin", label: "The formula", detail: "$10,000 of fixed costs at a $20 margin per unit is 500 units." },
                { stat: "2 results", label: "What you get", detail: "Break-even units and break-even revenue." }
            ]}
            accent="blue"
        />
    )
}
