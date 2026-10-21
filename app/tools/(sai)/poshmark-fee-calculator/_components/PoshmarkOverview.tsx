"use client"
import { Info } from "lucide-react"
import { ToolOverview, ToolSectionHeader } from "@/app/tools/_shared/components"

export function PoshmarkOverview() {
    return (
        <div className="w-full">
            <ToolSectionHeader icon={Info} title="About this calculator" />
            <ToolOverview
                heading="What the Poshmark fee calculator does"
                definition="It applies Poshmark's fee, a flat $2.95 under $15 or 20% above, takes off your item cost and any shipping discount, and shows your earnings, profit and margin."
                accent="blue"
                facts={[
                    { stat: "$2.95", label: "Flat fee under $15", detail: "A $10 sale keeps $7.05 before your costs, nearly 30% to the fee." },
                    { stat: "20%", label: "Fee at $15 and over", detail: "A $25 sale pays $5.00. Bundling low-priced items into one sale moves them into this band." },
                    { stat: "Shipping discounts", label: "Come out of your side", detail: "Buyers pay flat shipping unless you discount it; any discount reduces your earnings." },
                ]}
            />
        </div>
    )
}
