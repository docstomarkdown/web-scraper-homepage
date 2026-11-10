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
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Where to find your duty rate",
                    description: "Look up your product's HS code on your country's customs website, or ask your freight forwarder or customs broker. The rate changes by product category and origin.",
                    icon: ShieldCheck,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Sea or air",
                    description: "Sea freight costs far less per unit but takes weeks; air takes days and costs more. Run the calculator once for each quote to compare the landed cost, not the freight bill.",
                    icon: Ship,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "A worked example",
                    description: "100 units at $25 is $2,500. Add $150 shipping, 5% duty ($125), $50 insurance and $25 fees: $2,850 in total. That is $28.50 per unit, 14% above the supplier's price.",
                    icon: TrendingDown,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
            ]}
        />
    )
}
