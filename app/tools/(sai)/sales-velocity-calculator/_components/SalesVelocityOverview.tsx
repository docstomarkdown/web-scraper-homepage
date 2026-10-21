"use client"
import { Info } from "lucide-react"
import { ToolOverview, ToolSectionHeader } from "@/app/tools/_shared/components"

export function SalesVelocityOverview() {
    return (
        <div className="w-full">
            <ToolSectionHeader icon={Info} title="About this calculator" />
            <ToolOverview
                heading="What the sales velocity calculator does"
                definition="It divides units sold by the days you were in stock, so stockout days don't drag the average down, and shows the monthly units and revenue that rate implies."
                accent="blue"
                facts={[
                    { stat: "Raw velocity", label: "Units ÷ all days", detail: "Too low if you ran out during the period, so a reorder based on it is too small." },
                    { stat: "True velocity", label: "Units ÷ days in stock", detail: "The rate at which the product sells when it can be bought. Use it to reorder." },
                    { stat: "Run rate", label: "True velocity × 30", detail: "Monthly units, and revenue when you add a price. The gap from the raw figure is what stockouts cost." },
                ]}
            />
        </div>
    )
}
