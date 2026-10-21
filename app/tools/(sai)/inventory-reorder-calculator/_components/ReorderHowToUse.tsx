"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { ClipboardList, Clock, ShieldAlert } from "lucide-react"

export function ReorderHowToUse() {
    return (
        <ToolSteps
            title="How to use this tool"
            steps={[
                {
                    title: "Enter daily sales and lead time",
                    description: "Type your average units sold per day and the number of days a new order takes to arrive.",
                    icon: ClipboardList,
                },
                {
                    title: "Add a safety buffer",
                    description: "Enter how many days of extra stock you want to hold against late deliveries or a sales spike.",
                    icon: ShieldAlert,
                },
                {
                    title: "Read the reorder point",
                    description: "The calculator shows the stock level that should trigger a new order. Enter your current stock to see how many days you have left.",
                    icon: Clock,
                },
            ]}
        />
    )
}
