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
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Why averages leave you exposed",
                    description: "Plan on averages and you run out whenever demand or delivery is worse than average, which is about half the time. The buffer covers the other half.",
                    icon: ShieldAlert,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Use it with the reorder point",
                    description: "Reorder point = average daily sales × average lead time + safety stock. Reorder when stock falls to that level, and the buffer is still there if the order is late.",
                    icon: Timer,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "A worked example",
                    description: "Max 20 units a day over a 21-day lead time is 420; average 10 a day over 14 days is 140. Safety stock is 280 units.",
                    icon: Package,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
            ]}
        />
    )
}
