"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { ShoppingCart, Calculator, Gift, Truck, AlertTriangle } from "lucide-react"

/** What the calculator computes, the formula in words, where the inputs come from, and one worked example. */
export function AOVGuide() {
    return (
        <ToolGuide
            title="What AOV tells you"
            icon={ShoppingCart}
            items={[
                { title: "The formula in words", description: "Average order value equals total revenue divided by the number of orders in the same period. It's the amount a typical order is worth to you, before costs.", icon: Calculator, iconBg: "bg-blue-50 dark:bg-blue-950/40", iconColor: "text-blue-700 dark:text-blue-300" },
                { title: "A worked example", description: "$50,000 of revenue from 1,250 orders is an AOV of $40. If next month brings $54,000 from 1,250 orders, the AOV rose to $43.20 without a single extra customer.", icon: Gift, iconBg: "bg-amber-50 dark:bg-amber-950/40", iconColor: "text-amber-700 dark:text-amber-300" },
                { title: "Three ways stores raise it", description: "Bundle products that go together, set a free shipping threshold a little above today's AOV, and offer a small add-on at checkout. Each works because it raises the value of orders you're already getting.", icon: Truck, iconBg: "bg-emerald-50 dark:bg-emerald-950/40", iconColor: "text-emerald-700 dark:text-emerald-300" },
                { title: "What it doesn't tell you", description: "AOV says nothing about profit or about how often people come back. A high AOV with a low margin can earn less than a modest AOV with repeat orders; use the customer lifetime value calculator for that side.", icon: AlertTriangle, iconBg: "bg-violet-50 dark:bg-violet-950/40", iconColor: "text-violet-700 dark:text-violet-300" }
            ]}
        />
    )
}
