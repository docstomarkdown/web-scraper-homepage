"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { ShieldAlert, Tag, Truck } from "lucide-react"

export function MOQHowToUse() {
    return (
        <ToolSteps
            title="How to use this tool"
            steps={[
                {
                    title: "Enter the supplier's terms",
                    description: "Type the cost per unit and the minimum order quantity the supplier requires.",
                    icon: Tag,
                },
                {
                    title: "Add shipping and other costs",
                    description: "Enter the shipping for the whole order and any other costs, such as duties, inspection or bank charges.",
                    icon: Truck,
                },
                {
                    title: "Check the investment and the risk",
                    description: "Enter your expected monthly sales. The calculator shows the total cash needed, the landed cost per unit and how many months the order will last.",
                    icon: ShieldAlert,
                },
            ]}
        />
    )
}
