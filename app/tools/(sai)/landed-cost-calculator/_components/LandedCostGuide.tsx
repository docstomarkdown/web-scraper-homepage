"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BookOpen, CircleDollarSign, ShieldCheck, Ship, TrendingDown } from "lucide-react"

export function LandedCostGuide() {
    return (
        <ToolGuide
            title="How landed cost is calculated"
            icon={BookOpen}
            items={[
                {
                    title: "What goes in",
                    description: "Landed cost = product cost + shipping + duty + insurance + other fees. Duty is a percentage of the product cost; everything else is a flat amount for the shipment.",
                    icon: CircleDollarSign,
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                },
                {
                    title: "Where to find your duty rate",
                    description: "Look up your product's HS code on your country's customs website, or ask your freight forwarder or customs broker. The rate changes by product category and origin.",
                    icon: ShieldCheck,
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                },
                {
                    title: "Sea or air",
                    description: "Sea freight costs far less per unit but takes weeks; air takes days and costs more. Run the calculator once for each quote to compare the landed cost, not the freight bill.",
                    icon: Ship,
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                },
                {
                    title: "A worked example",
                    description: "100 units at $25 is $2,500. Add $150 shipping, 5% duty ($125), $50 insurance and $25 fees: $2,850 in total. That is $28.50 per unit, 14% above the supplier's price.",
                    icon: TrendingDown,
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                },
            ]}
        />
    )
}
