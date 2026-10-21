"use client"
import { Info } from "lucide-react"
import { ToolOverview, ToolSectionHeader } from "@/app/tools/_shared/components"

export function PODProfitOverview() {
    return (
        <div className="w-full">
            <ToolSectionHeader icon={Info} title="About this calculator" />
            <ToolOverview
                heading="What the print-on-demand profit calculator does"
                definition="It takes the base product cost, shipping both ways and every marketplace and payment fee off a sale, and shows the profit and margin per item sold."
                accent="blue"
                facts={[
                    { stat: "Two shipping costs", label: "Charged and paid", detail: "What you charge the customer and what the provider charges you. Free shipping means the second comes out of your margin." },
                    { stat: "Fees on the total", label: "Item plus shipping", detail: "Marketplaces charge their percentage on everything the customer pays, plus a fixed amount per order." },
                    { stat: "Net margin", label: "Profit ÷ order total", detail: "20% to 30% is a common target; below that one fee change can erase the profit." },
                ]}
            />
        </div>
    )
}
