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
                    description: "Net profit = (item price + shipping charged) − product cost − shipping cost − fees. Fees are percentages of the total the customer pays, plus a fixed amount per order.",
                    icon: Calculator,
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                },
                {
                    title: "Shipping twice",
                    description: "You pay the provider's shipping and decide what to charge the customer. Free shipping is popular, but it means the provider's charge comes out of your margin.",
                    icon: Truck,
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                },
                {
                    title: "Fees on the whole order",
                    description: "Marketplaces such as Etsy charge their transaction fee on item price plus shipping, and payment processing adds a percentage and a fixed fee. Enter the rates from your marketplace's fee page.",
                    icon: Receipt,
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                },
                {
                    title: "A worked example",
                    description: "A $25 shirt with $5 shipping charged, a $10 base cost and $4.50 provider shipping. With a 6.5% transaction fee, 3% + $0.25 processing and no other fees, the fees total $3.10 and net profit is $12.40, a 41% margin on the $30 order.",
                    icon: TrendingUp,
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                },
            ]}
        />
    )
}
