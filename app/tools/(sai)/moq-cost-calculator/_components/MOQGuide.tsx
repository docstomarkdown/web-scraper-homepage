"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BookOpen, Calculator, Coins, Scale, Timer } from "lucide-react"

export function MOQGuide() {
    return (
        <ToolGuide
            title="How to read the result"
            icon={BookOpen}
            items={[
                {
                    title: "Total investment",
                    description: "Total investment = cost per unit × MOQ + shipping + other costs. This is the cash you commit before the first sale.",
                    icon: Coins,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Landed cost per unit",
                    description: "Total investment ÷ MOQ. It is always higher than the supplier's unit price because the shipping and other costs are spread across the units.",
                    icon: Calculator,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Months of inventory",
                    description: "MOQ ÷ monthly sales. Three to four months is comfortable for most sellers; more than six ties up cash and adds storage fees, fewer than two risks running out.",
                    icon: Timer,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "A worked example",
                    description: "500 units at $10 is $5,000. Add $400 shipping and $100 other costs: $5,500 in total, or $11.00 per unit. At 150 sales a month the order lasts about 3.3 months.",
                    icon: Scale,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
            ]}
        />
    )
}
