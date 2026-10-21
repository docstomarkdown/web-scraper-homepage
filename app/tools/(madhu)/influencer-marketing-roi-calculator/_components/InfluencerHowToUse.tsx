"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Coins, Table, Users } from "lucide-react"

export function InfluencerHowToUse() {
    return (
        <ToolSteps
            title="How to use this calculator"
            steps={[
                { title: "Type the total cost, or break it down", description: "Enter one total campaign cost, or open the breakdown and type the influencer fee, ad spend, product cost and shipping separately.", icon: Users },
                { title: "Type the revenue", description: "The sales you can attribute to the campaign: through a discount code, a tracked link or a landing page.", icon: Coins },
                { title: "Read the results", description: "ROI is the main number, with the profit or loss and the cost split beneath it.", icon: Table },
            ]}
        />
    )
}
