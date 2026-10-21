"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Package, Receipt, Tag } from "lucide-react"

export function PODProfitHowToUse() {
    return (
        <ToolSteps
            title="How to use this tool"
            steps={[
                {
                    title: "Enter the sale",
                    description: "Type the item price and any shipping you charge the customer.",
                    icon: Tag,
                },
                {
                    title: "Add the supplier's costs",
                    description: "Enter the base product cost and the shipping your print provider charges you.",
                    icon: Package,
                },
                {
                    title: "Add the fees",
                    description: "Enter the marketplace transaction fee, payment processing percentage and fixed fee, and any platform or offsite-ads fee. The calculator shows net profit and margin.",
                    icon: Receipt,
                },
            ]}
        />
    )
}
