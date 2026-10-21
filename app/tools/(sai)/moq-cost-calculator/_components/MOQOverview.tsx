"use client"
import { Info } from "lucide-react"
import { ToolOverview, ToolSectionHeader } from "@/app/tools/_shared/components"

export function MOQOverview() {
    return (
        <div className="w-full">
            <ToolSectionHeader icon={Info} title="About this calculator" />
            <ToolOverview
                heading="What the MOQ cost calculator does"
                definition="Suppliers set a minimum order quantity. This calculator shows what that minimum costs in total, what each unit costs once shipping and fees are included, and how long the order will last at your sales rate."
                accent="blue"
                facts={[
                    { stat: "Total investment", label: "Cash before the first sale", detail: "Unit price × MOQ + shipping + other costs." },
                    { stat: "Landed per unit", label: "Always above the quote", detail: "Total investment ÷ MOQ. Shipping and fees are spread across the units." },
                    { stat: "Months of stock", label: "MOQ ÷ monthly sales", detail: "Three to four months is comfortable; over six ties up cash and adds storage fees." },
                ]}
            />
        </div>
    )
}
