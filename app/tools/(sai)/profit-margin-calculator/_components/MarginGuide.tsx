"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BookOpen, Calculator, CircleDollarSign, Info, Percent } from "lucide-react"

export function MarginGuide() {
    return (
        <ToolGuide
            title="Margin, markup and profit"
            icon={BookOpen}
            items={[
                {
                    title: "Gross margin",
                    description: "Margin = (price − cost) ÷ price. It is the share of each sale you keep after the cost of the item. A higher margin leaves more for overheads and profit.",
                    icon: CircleDollarSign,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Markup",
                    description: "Markup = (price − cost) ÷ cost. It is the share you add to the cost to reach the price. A 100% markup doubles the cost.",
                    icon: Percent,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Profit per unit",
                    description: "Price − cost, in money. It is the figure to multiply by units sold to see what a product earns. If your price includes VAT or sales tax, enter the rate under advanced settings and the tax comes out of the price first.",
                    icon: Calculator,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "A worked example",
                    description: "You buy for $50 and sell for $100. Profit per unit is $50, markup is 100%, and margin is 50%. For a target, price = cost ÷ (1 − margin): to keep 40% on goods that cost $7,500, charge $12,500. At $10,000 and a 40% target, the goods can cost at most $6,000.",
                    icon: Info,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
            ]}
        />
    )
}
