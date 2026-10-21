"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Banknote, MousePointerClick, Target } from "lucide-react"

/** The three things a reader does, in order, with the calculator's own field names. */
export function CPAHowToUse() {
    return (
        <ToolSteps
            steps={[
                { title: "Pick Campaign Data or Estimation", description: "Campaign Data takes what you spent and the conversions you got. Estimation takes a cost per click and a conversion rate for a campaign you haven't run yet.", icon: Banknote },
                { title: "Enter the numbers for that mode", description: "Campaign Data: Total Ad Spend and Total Conversions. Estimation: Cost Per Click and Conversion Rate (%). Add a Target CPA if you know the most you can afford per customer.", icon: MousePointerClick },
                { title: "Read the CPA against your target", description: "Cost per acquisition is what one conversion cost. If it's at or under the target the result shows green; above it, the campaign needs a lower CPC or a better conversion rate.", icon: Target }
            ]}
        />
    )
}
