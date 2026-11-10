"use client"
import { Info } from "lucide-react"
import { ToolOverview, ToolSectionHeader } from "@/app/tools/_shared/components"

/** What the calculator does, including the gross margin questions it answers (it replaced the gross margin calculator). */
export function MarginOverview() {
    return (
        <div className="w-full">
            <ToolSectionHeader icon={Info} title="About this calculator" />
            <ToolOverview
                heading="A profit margin and gross margin calculator"
                headingAccent="gross margin"
                definition="Gross margin is the share of each sale left after the cost of the goods. Enter a price and a cost to get the gross margin, markup and profit, or set a target margin to find the price you need or the most you can pay for the goods. It works for one unit or a period's revenue and cost of goods sold."
                accent="blue"
                facts={[
                    { stat: "Find margin", label: "from price and cost", detail: "Gross margin, markup and profit, plus net margin when you add shipping and fees." },
                    { stat: "Find price", label: "for a target margin", detail: "The price that keeps the margin you want on a cost." },
                    { stat: "Find cost", label: "for a target margin", detail: "The most the goods can cost at your price and target margin." },
                ]}
            />
        </div>
    )
}
