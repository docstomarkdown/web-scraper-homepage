"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Package, Tag, Truck } from "lucide-react"

export function PoshmarkFeeHowToUse() {
    return (
        <ToolSteps
            title="How to use this tool"
            steps={[
                {
                    title: "Enter the selling price",
                    description: "Type the price the buyer pays. Poshmark's fee depends on whether it is under or over $15.",
                    icon: Tag,
                },
                {
                    title: "Add the item cost",
                    description: "Enter what you paid for the item so the calculator can show profit and margin.",
                    icon: Package,
                },
                {
                    title: "Add any shipping discount",
                    description: "If you offer a shipping discount, for example with an offer to likers, enter the amount you cover. Otherwise leave it at zero.",
                    icon: Truck,
                },
            ]}
        />
    )
}
