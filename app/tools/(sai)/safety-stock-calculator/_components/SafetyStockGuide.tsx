"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BookOpen, Calculator, Package, ShieldAlert, Timer } from "lucide-react"

export function SafetyStockGuide() {
    return (
        <ToolGuide
            title="How safety stock works"
            icon={BookOpen}
            items={[
                {
                    title: "The formula",
                    description: "Safety stock = (max daily sales × max lead time) − (average daily sales × average lead time). It is the gap between what could happen and what usually happens.",
                    icon: Calculator,
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                },
                {
                    title: "Why averages leave you exposed",
                    description: "Plan on averages and you run out whenever demand or delivery is worse than average, which is about half the time. The buffer covers the other half.",
                    icon: ShieldAlert,
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                },
                {
                    title: "Use it with the reorder point",
                    description: "Reorder point = average daily sales × average lead time + safety stock. Reorder when stock falls to that level, and the buffer is still there if the order is late.",
                    icon: Timer,
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                },
                {
                    title: "A worked example",
                    description: "Max 20 units a day over a 21-day lead time is 420; average 10 a day over 14 days is 140. Safety stock is 280 units.",
                    icon: Package,
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                },
            ]}
        />
    )
}
