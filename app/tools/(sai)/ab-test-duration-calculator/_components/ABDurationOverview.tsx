"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** One paragraph on what the calculator is for, and three plain facts about it. */
export function ABDurationOverview() {
    return (
        <ToolOverview
            heading="How long should your A/B test run?"
            headingAccent="A/B test"
            definition="This calculator tells you how many visitors an A/B test needs and how many days that takes at your traffic. Enter today's conversion rate, the lift you want to detect and your daily visitors; the sample size and duration update as you type."
            facts={[
                { stat: "4 inputs", label: "What you enter", detail: "Daily visitors, current conversion rate, expected improvement and the traffic split." },
                { stat: "95% / 80%", label: "Confidence and power", detail: "The standard settings for website tests; the formula uses z-scores of 1.96 and 0.84." },
                { stat: "2 numbers", label: "What you get", detail: "Visitors per variant and the number of days before you can trust the result." }
            ]}
            accent="blue"
        />
    )
}
