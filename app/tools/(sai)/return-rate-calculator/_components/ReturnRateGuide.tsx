"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BarChart3, BookOpen, Calculator, Receipt, TrendingUp } from "lucide-react"

export function ReturnRateGuide() {
    return (
        <ToolGuide
            title="What a return rate tells you"
            icon={BookOpen}
            items={[
                {
                    title: "The formulas",
                    description: "Return rate = units returned ÷ units sold × 100. Lost revenue = units returned × selling price. Return cost = units returned × cost per return. Profit leakage adds the last two.",
                    icon: Calculator,
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                },
                {
                    title: "What is normal",
                    description: "Rates differ by category: electronics often 5% to 8%, clothing and shoes 20% to 30%. Compare against your own history before comparing against anyone else.",
                    icon: BarChart3,
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                },
                {
                    title: "A return costs more than the refund",
                    description: "Shipping both ways, the time to inspect and repack, and payment fees that aren't refunded all add up. Enter a realistic cost per return.",
                    icon: Receipt,
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                },
                {
                    title: "A worked example",
                    description: "1,000 units sold and 50 returned is a 5% return rate. At a $25 price and $5 per return, that is $1,250 refunded and $250 of handling: $1,500 of profit leakage.",
                    icon: TrendingUp,
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                },
            ]}
        />
    )
}
