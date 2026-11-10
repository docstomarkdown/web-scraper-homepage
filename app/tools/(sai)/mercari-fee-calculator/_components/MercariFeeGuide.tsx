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
                    title: "One fee on every sale",
                    description: "Mercari takes a 10% selling fee on the item price plus any shipping the buyer pays. Since 6 January 2025 there is no separate payment fee for sellers.",
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
                    description: "List price = (item cost + shipping + other costs + profit you want) ÷ 0.9. The 0.9 is what is left after the 10% fee.",
                    icon: Calculator,
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                },
                {
                    title: "A worked example",
                    description: "A $50 sale with a $20 item cost and no shipping: selling fee $5.00, net profit $25.00, a 50.0% margin. Ten of them is $250.00.",
                    icon: TrendingUp,
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                },
            ]}
        />
    )
}
