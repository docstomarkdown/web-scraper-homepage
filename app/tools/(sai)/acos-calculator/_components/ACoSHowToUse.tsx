"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { CircleDollarSign, TrendingUp, PieChart } from "lucide-react"

/** The three things a reader does, in order, with the calculator's own field names. */
export function ACoSHowToUse() {
    return (
        <ToolSteps
            steps={[
                { title: "Enter your Ad Spend", description: "Type what you spent on the campaign or the period you're measuring. Use the spend figure from your ad console, not your total marketing budget.", icon: CircleDollarSign },
                { title: "Enter your Ad Revenue, then the optional fields", description: "Ad Revenue is the sales the ads produced, as reported by the ad console. Profit Margin is your margin before ads, as a percentage of the sale price. Total Revenue is all your sales for the period, for TACoS.", icon: TrendingUp },
                { title: "Read ACoS, ROAS, profit and TACoS", description: "ACoS is spend as a share of ad revenue; ROAS is revenue per unit of spend. With a margin, net profit shows what's left after product costs and ads, and break-even ACoS shows the ceiling you must stay under. With total revenue, TACoS shows ad spend as a share of all sales.", icon: PieChart }
            ]}
        />
    )
}
