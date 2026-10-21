"use client"
import { Info } from "lucide-react"
import { ToolOverview, ToolSectionHeader } from "@/app/tools/_shared/components"

export function PPCBidOverview() {
    return (
        <div className="w-full">
            <ToolSectionHeader icon={Info} title="About this calculator" />
            <ToolOverview
                heading="What the PPC bid calculator does"
                definition="It turns your product price, conversion rate and profit margin into two bids: the break-even cost per click, and a recommended bid that keeps your target ACoS and leaves profit."
                accent="blue"
                facts={[
                    { stat: "Break-even bid", label: "Price × conversion × margin", detail: "The click cost at which a sale earns nothing. Never bid above it for long." },
                    { stat: "Recommended bid", label: "Price × conversion × target ACoS", detail: "With no target entered, the calculator uses 75% of your margin as the ACoS." },
                    { stat: "Conversion rate", label: "Orders ÷ clicks", detail: "From your ad reports. A small change here moves both bids a lot, so keep it current." },
                ]}
            />
        </div>
    )
}
