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
                    description: "Sales of $15 and under pay a flat $2.95. Sales over $15 pay 20% of the price. A $10 item loses nearly 30% to the fee; a $50 item loses 20%.",
                    icon: Receipt,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Shipping discounts come out of your side",
                    description: "Buyers pay Poshmark's flat shipping unless you discount it. Any discount you offer is taken from your earnings, so enter it here.",
                    icon: Truck,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Bundles and sourcing",
                    description: "Bundling low-priced items into one sale moves them above $15, where the fee is 20% rather than $2.95 each. Many clothing resellers list at three times what they paid.",
                    icon: Scale,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "A worked example",
                    description: "A $25 sale with a $5 item cost and no shipping discount: the fee is $5.00, net earnings $20.00, net profit $15.00, a 60% margin.",
                    icon: Calculator,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
            ]}
        />
    )
}
