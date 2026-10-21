"use client"
import { Info } from "lucide-react"
import { ToolOverview, ToolSectionHeader } from "@/app/tools/_shared/components"

export function ReorderOverview() {
    return (
        <div className="w-full">
            <ToolSectionHeader icon={Info} title="About this calculator" />
            <ToolOverview
                heading="What the reorder point calculator does"
                definition="It tells you the stock level at which to place your next order so the shipment lands before the shelf is empty. Enter daily sales, the supplier's lead time and the buffer you want; it does the rest."
                accent="blue"
                facts={[
                    { stat: "Lead-time demand", label: "Units sold while you wait", detail: "Daily sales × lead time. A 14-day lead time at 10 units a day is 140 units you must still have on the day you order." },
                    { stat: "Safety buffer", label: "Extra days of stock", detail: "Daily sales × buffer days. It absorbs a late delivery or a strong week without a stockout." },
                    { stat: "Days left", label: "Until you must order", detail: "(Current stock − reorder point) ÷ daily sales. Zero means order today." },
                ]}
            />
        </div>
    )
}
