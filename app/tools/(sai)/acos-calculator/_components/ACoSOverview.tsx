"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** One paragraph on what the calculator is for, and three plain facts about it. */
export function ACoSOverview() {
    return (
        <ToolOverview
            heading="Why track your ACoS?"
            headingAccent="ACoS"
            definition="ACoS (advertising cost of sales) is the share of ad revenue that went back out as ad spend. This calculator turns numbers from your ad console into ACoS, ROAS, net profit after ads and the ACoS you must stay under to make money. Add your total sales and it also gives TACoS (total advertising cost of sales)."
            facts={[
                { stat: "4 inputs", label: "What you enter", detail: "Ad spend and ad revenue, plus your profit margin before ads and total sales if you have them." },
                { stat: "ACoS = margin", label: "Break-even", detail: "The campaign makes money while ACoS stays below your profit margin." },
                { stat: "6 results", label: "What you get", detail: "ACoS, ROAS, break-even ACoS, net profit after ads, TACoS and the margin left after ads." }
            ]}
            accent="blue"
        />
    )
}
