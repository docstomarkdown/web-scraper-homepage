"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { ClipboardList, Coins, Percent, Table } from "lucide-react"

export function NetProfitHowToUse() {
    return (
        <ToolSteps
            title="How to use this calculator"
            steps={[
                { title: "Type the revenue and the cost of goods", description: "Revenue is the period's sales. Cost of goods sold is what those goods cost you, including inbound shipping and packaging.", icon: Coins },
                { title: "Type advertising and overheads", description: "Advertising is ad spend for the period. Overheads are rent, software, salaries and fees that don't change with each sale.", icon: ClipboardList },
                { title: "Set the tax rate", description: "Your effective rate on profit, as a percentage. Leave it at the placeholder if you don't know it yet.", icon: Percent },
                { title: "Read the results", description: "Net profit and net margin are the main numbers, with gross and operating profit above them and a bar showing where the revenue went.", icon: Table },
            ]}
        />
    )
}
