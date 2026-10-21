"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Building2, Tag, Calculator } from "lucide-react"

/** The three things a reader does, in order, with the calculator's own field names. */
export function BreakEvenHowToUse() {
    return (
        <ToolSteps
            steps={[
                { title: "Enter your Total Fixed Costs", description: "The costs you pay whether you sell anything or not, for the period you're planning: rent, salaries, software, insurance.", icon: Building2 },
                { title: "Enter the Sales Price Per Unit and Variable Cost Per Unit", description: "Variable cost is what one extra unit costs you to make or buy and deliver: product cost, packaging, payment fees, shipping you pay.", icon: Tag },
                { title: "Read the break-even units and revenue", description: "Units is the number you must sell to cover fixed costs; revenue is those units at your price. Every unit after that adds the contribution margin to profit.", icon: Calculator }
            ]}
        />
    )
}
