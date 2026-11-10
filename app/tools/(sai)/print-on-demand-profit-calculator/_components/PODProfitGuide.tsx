"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BookOpen, Calculator, Receipt, TrendingUp, Truck } from "lucide-react"

export function PODProfitGuide() {
    return (
        <ToolGuide
            title="Where a print-on-demand sale goes"
            icon={BookOpen}
            items={[
                {
                    title: "The formula",
                    description: "Net profit = (item price + shipping charged) − product cost − shipping cost − fees. Fees are percentages of the total the customer pays, plus a fixed processing fee and any listing fee per order.",
                    icon: Calculator,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Shipping twice",
                    description: "You pay the provider's shipping and decide what to charge the customer. Free shipping is popular, but it means the provider's charge comes out of your margin.",
                    icon: Truck,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Fees on the whole order",
                    description: "Marketplaces such as Etsy charge their transaction fee on item price plus shipping, and payment processing adds a percentage and a fixed fee. Enter the rates from your marketplace's fee page.",
                    icon: Receipt,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "A worked example",
                    description: "A $25 shirt with $5 shipping charged, a $10 base cost and $4.50 provider shipping. With a 6.5% transaction fee, 3% + $0.25 processing and Etsy's $0.20 listing fee, the fees total $3.30 and net profit is $12.20, a 40.7% margin on the $30 order.",
                    icon: TrendingUp,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
            ]}
        />
    )
}
