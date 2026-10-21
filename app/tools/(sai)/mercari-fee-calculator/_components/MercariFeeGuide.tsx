"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BookOpen, Calculator, Package, Receipt, TrendingUp } from "lucide-react"

export function MercariFeeGuide() {
    return (
        <ToolGuide
            title="How Mercari fees work"
            icon={BookOpen}
            items={[
                {
                    title: "Two fees on every sale",
                    description: "Mercari takes a 10% selling fee on the sale price, then a payment fee of 2.9% plus $0.50. Together they come to about 13% of the price on a typical item.",
                    icon: Receipt,
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                },
                {
                    title: "Who pays shipping",
                    description: "If you offer free shipping, the label comes out of your payout. If the buyer pays shipping, leave the shipping cost blank. Labels for small items usually cost $5 to $12.",
                    icon: Package,
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                },
                {
                    title: "Pricing to a target profit",
                    description: "List price = (item cost + shipping + other costs + profit you want) ÷ 0.869. The 0.869 accounts for the combined fees; add the $0.50 fixed part separately for low-priced items.",
                    icon: Calculator,
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                },
                {
                    title: "A worked example",
                    description: "A $50 sale with a $20 item cost and no shipping: selling fee $5.00, payment fee $1.95, net profit $23.05, a 46.1% margin. Ten of them is $230.50.",
                    icon: TrendingUp,
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                },
            ]}
        />
    )
}
