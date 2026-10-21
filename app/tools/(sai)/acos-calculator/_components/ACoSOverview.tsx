"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** One paragraph on what the calculator is for, and three plain facts about it. */
export function ACoSOverview() {
    return (
        <ToolOverview
            heading="Why track your ACoS?"
            headingAccent="ACoS"
            definition="ACoS (advertising cost of sales) is the share of ad revenue that went back out as ad spend. This calculator turns three numbers from your ad console into ACoS, ROAS, net profit after ads and the ACoS you must stay under to make money."
            facts={[
                { stat: "3 inputs", label: "What you enter", detail: "Ad spend, ad revenue and your profit margin before ads." },
                { stat: "ACoS = margin", label: "Break-even", detail: "The campaign makes money while ACoS stays below your profit margin." },
                { stat: "4 results", label: "What you get", detail: "ACoS, ROAS, net profit after ads and break-even ACoS." }
            ]}
            accent="blue"
        />
    )
}
