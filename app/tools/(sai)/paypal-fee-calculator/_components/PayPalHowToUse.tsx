"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { CircleDollarSign, Globe, Receipt } from "lucide-react"

export function PayPalHowToUse() {
    return (
        <ToolSteps
            title="How to use this tool"
            steps={[
                {
                    title: "Enter the amount",
                    description: "Type the amount the buyer pays.",
                    icon: CircleDollarSign,
                },
                {
                    title: "Pick the rate",
                    description: "Choose standard, international, micropayment or nonprofit. Each has its own percentage and fixed fee.",
                    icon: Globe,
                },
                {
                    title: "Read the fee and the payout",
                    description: "The calculator shows the fee, what lands in your account, and the amount to ask for if you want to receive the full figure.",
                    icon: Receipt,
                },
            ]}
        />
    )
}
