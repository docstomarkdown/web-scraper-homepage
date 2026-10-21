"use client"
import { Info } from "lucide-react"
import { ToolOverview, ToolSectionHeader } from "@/app/tools/_shared/components"

export function SafetyStockOverview() {
    return (
        <div className="w-full">
            <ToolSectionHeader icon={Info} title="About this calculator" />
            <ToolOverview
                heading="What the safety stock calculator does"
                definition="It subtracts your normal demand over a normal lead time from your worst-case demand over your longest lead time. The difference is the buffer to hold so a bad week or a late supplier doesn't empty the shelf."
                accent="blue"
                facts={[
                    { stat: "Worst case", label: "Max sales × max lead time", detail: "The most units you could sell while the slowest delivery is on its way." },
                    { stat: "Normal case", label: "Average sales × average lead time", detail: "What usually happens. The reorder point already covers this." },
                    { stat: "Buffer", label: "Worst case − normal case", detail: "The extra units to hold at all times. Recalculate each quarter and before a peak season." },
                ]}
            />
        </div>
    )
}
