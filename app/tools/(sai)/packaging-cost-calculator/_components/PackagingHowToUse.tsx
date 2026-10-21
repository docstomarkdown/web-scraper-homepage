"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Calculator, Layers, Package } from "lucide-react"

export function PackagingHowToUse() {
    return (
        <ToolSteps
            title="How to use this tool"
            steps={[
                {
                    title: "Enter the box and the labour",
                    description: "Type the cost of the box or mailer, the minutes it takes to pack one order, and the hourly wage of the person packing.",
                    icon: Package,
                },
                {
                    title: "Add the extras",
                    description: "Enter padding, tape, the shipping label and any branded inserts, each as a cost per order.",
                    icon: Layers,
                },
                {
                    title: "Read the cost per order",
                    description: "The calculator shows the total per order, split into materials and labour, and multiplies it by your order quantity.",
                    icon: Calculator,
                },
            ]}
        />
    )
}
