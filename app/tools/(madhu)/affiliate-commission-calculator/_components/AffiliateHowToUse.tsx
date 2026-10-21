"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { ClipboardList, Coins, Percent, Table } from "lucide-react"

export function AffiliateHowToUse() {
    return (
        <ToolSteps
            title="How to use this calculator"
            steps={[
                { title: "Enter the clicks and the conversion rate", description: "Type the number of clicks the affiliate sends in a month and the share that becomes an order. The conversion rate starts at 2.5%; change it to your own figure if you know it.", icon: ClipboardList },
                { title: "Enter the order value and the commission rate", description: "Average order value is what a typical order is worth. Commission rate is the share of each order you pay the affiliate; there's no default, so type the rate you're considering.", icon: Percent },
                { title: "Add your product cost, if you want profit", description: "Product cost is optional, as a percentage of revenue. Leave it blank for payout and revenue only; fill it in to see net profit.", icon: Coins },
                { title: "Read the results", description: "Affiliate payout is the main number. Below it sit estimated sales, total revenue and net profit, all updating as you type.", icon: Table },
            ]}
        />
    )
}
