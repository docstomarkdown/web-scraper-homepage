"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BookOpen, Calculator, Globe, Info, Percent } from "lucide-react"

export function PayPalGuide() {
    return (
        <ToolGuide
            title="How PayPal fees are calculated"
            icon={BookOpen}
            items={[
                {
                    title: "The checkout rate",
                    description: "A percentage of the amount plus a fixed fee: 3.49% + $0.49 for a US PayPal Checkout payment. On $100 the fee is $3.98 and you receive $96.02.",
                    icon: Percent,
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                },
                {
                    title: "Other rates",
                    description: "Card payments are 2.99% + $0.49, micropayments 4.99% + $0.09, and approved charities 1.99% + $0.49. A payment from outside the US adds 1.5%. The right rate depends on your account and the buyer's location.",
                    icon: Globe,
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                },
                {
                    title: "Charging to receive a set amount",
                    description: "Amount to ask for = (amount you want + fixed fee) ÷ (1 − rate). To receive $100 at the checkout rate, ask for $104.12.",
                    icon: Calculator,
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                },
                {
                    title: "Rates change",
                    description: "PayPal updates its fee schedule from time to time, and your account may have a different rate. Check the fee page in your PayPal account before you quote a customer.",
                    icon: Info,
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                },
            ]}
        />
    )
}
