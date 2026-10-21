"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Boxes, Clock, Table, TrendingUp } from "lucide-react"

export function ReorderPointHowToUse() {
    return (
        <ToolSteps
            title="How to use this calculator"
            steps={[
                { title: "Type the average daily units sold", description: "Use the average over the last month or quarter, or the rate you expect for the coming weeks.", icon: TrendingUp },
                { title: "Type the delivery time in days", description: "The full lead time from order to goods on the shelf, from the lead time calculator or your last few orders.", icon: Clock },
                { title: "Type the safety stock", description: "The units you keep back for a late delivery or a spike. Zero if you accept the occasional stock-out.", icon: Boxes },
                { title: "Read the results", description: "The reorder point is the main number. When stock falls to it, order. Beside it are the lead-time demand and the days covered.", icon: Table },
            ]}
        />
    )
}
