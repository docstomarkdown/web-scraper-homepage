"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** One paragraph on what the calculator is for, and three plain facts about it. */
export function AbandonmentOverview() {
    return (
        <ToolOverview
            heading="How many carts do you lose?"
            headingAccent="carts"
            definition="Cart abandonment is the share of shoppers who add something to a cart and leave without paying. This calculator turns two numbers from your analytics, carts created and orders completed, into the rate, so you can track it month to month and after every checkout change."
            facts={[
                { stat: "2 inputs", label: "What you enter", detail: "Carts created and completed transactions for the same period." },
                { stat: "65% to 80%", label: "The usual range", detail: "Most online stores lose two carts in three; the number itself matters less than its trend." },
                { stat: "1 − orders ÷ carts", label: "The formula", detail: "150 orders from 500 carts is a 70% abandonment rate." }
            ]}
            accent="rose"
        />
    )
}
