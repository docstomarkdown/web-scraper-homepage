"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Coins, Mail, Percent, Table } from "lucide-react"

export function EmailROIHowToUse() {
    return (
        <ToolSteps
            title="How to use this calculator"
            steps={[
                { title: "Type the list size and the cost", description: "Number of subscribers is the people who'll receive the email. Total campaign cost covers the platform fee, design time and any incentive.", icon: Mail },
                { title: "Type the open, click and conversion rates", description: "Open rate is the share who open, click rate the share of openers who click, conversion rate the share of clickers who buy. The placeholders show common averages.", icon: Percent },
                { title: "Type the average order value", description: "What a typical order from this email is worth.", icon: Coins },
                { title: "Read the results", description: "ROI is the main number. Revenue, net profit and the counts at each step sit beneath it.", icon: Table },
            ]}
        />
    )
}
