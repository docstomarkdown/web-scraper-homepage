"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BookOpen, Calculator, Scale, Target, TrendingUp } from "lucide-react"

export function ROASGuide() {
    return (
        <ToolGuide
            title="How to read ROAS"
            icon={BookOpen}
            items={[
                {
                    title: "The formula",
                    description: "ROAS = revenue from ads ÷ ad spend. A ROAS of 4.0 means $4 of sales for every $1 of ads, or 400%.",
                    icon: Calculator,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "ROAS is not profit",
                    description: "ROAS ignores product cost, fees and shipping. A ROAS of 2.0 on a product with a 40% margin loses money: $2 of sales earns $0.80, and the click cost $1.",
                    icon: Scale,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "The break-even ROAS",
                    description: "Break-even ROAS = 1 ÷ profit margin. With a 40% margin you need a ROAS of 2.5 before the ads make anything. Set your target above it.",
                    icon: Target,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "A worked example",
                    description: "$100 of ads produced $500 of sales: ROAS 5.0, or 500%, and $400 of revenue above the ad cost. At a 40% margin that's $100 of profit after product costs and ads. In Revenue goal mode, $100 at a target of 4.0 needs $400 of sales.",
                    icon: TrendingUp,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
            ]}
        />
    )
}
