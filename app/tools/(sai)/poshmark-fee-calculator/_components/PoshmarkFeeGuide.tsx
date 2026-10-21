"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BookOpen, Calculator, Receipt, Scale, Truck } from "lucide-react"

export function PoshmarkFeeGuide() {
    return (
        <ToolGuide
            title="How Poshmark fees work"
            icon={BookOpen}
            items={[
                {
                    title: "The fee has two levels",
                    description: "Sales under $15 pay a flat $2.95. Sales of $15 and over pay 20% of the price. A $10 item loses nearly 30% to the fee; a $50 item loses 20%.",
                    icon: Receipt,
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                },
                {
                    title: "Shipping discounts come out of your side",
                    description: "Buyers pay Poshmark's flat shipping unless you discount it. Any discount you offer is taken from your earnings, so enter it here.",
                    icon: Truck,
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                },
                {
                    title: "Bundles and sourcing",
                    description: "Bundling low-priced items into one sale moves them above $15, where the fee is 20% rather than $2.95 each. Many clothing resellers list at three times what they paid.",
                    icon: Scale,
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                },
                {
                    title: "A worked example",
                    description: "A $25 sale with a $5 item cost and no shipping discount: the fee is $5.00, net earnings $20.00, net profit $15.00, a 60% margin.",
                    icon: Calculator,
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                },
            ]}
        />
    )
}
