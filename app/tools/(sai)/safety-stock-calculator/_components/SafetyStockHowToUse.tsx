"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { ClipboardList, Package, ShieldAlert } from "lucide-react"

export function SafetyStockHowToUse() {
    return (
        <ToolSteps
            title="How to use this tool"
            steps={[
                {
                    title: "Enter the worst case",
                    description: "Type the highest daily sales you have seen and the longest lead time your supplier has taken.",
                    icon: ShieldAlert,
                },
                {
                    title: "Enter the normal case",
                    description: "Type your average daily sales and the usual lead time, from the last 30 to 60 days.",
                    icon: ClipboardList,
                },
                {
                    title: "Read the buffer",
                    description: "The calculator subtracts normal demand from worst-case demand and shows the extra units to hold at all times.",
                    icon: Package,
                },
            ]}
        />
    )
}
