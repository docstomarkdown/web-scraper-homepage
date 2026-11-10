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
                    description: "Landed cost = product cost + shipping + duty + insurance + other fees. Duty is a percentage of the dutiable value: goods + freight + insurance (CIF) in the EU, UK and India, or the goods alone (FOB) in the US. Everything else is a flat amount for the shipment.",
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
                    description: "100 units at $25 is $2,500. Add $150 shipping and $50 insurance, and on a CIF basis 5% duty is charged on $2,700: $135. With $25 fees that's $2,860 in total, $28.60 per unit, 14.4% above the supplier's price. On a FOB basis the duty is $125 and the unit cost $28.50.",
                    icon: TrendingDown,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
            ]}
        />
    )
}
