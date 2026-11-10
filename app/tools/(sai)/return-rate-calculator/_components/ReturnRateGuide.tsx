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
                    description: "Return rate = units returned ÷ units sold × 100. Lost revenue = units returned × selling price. Return cost = units returned × cost per return. Profit leakage is lost revenue minus the refunds on returns you resell, plus return cost.",
                    icon: Calculator,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "What is normal",
                    description: "Rates differ by category: electronics often 5% to 8%, clothing and shoes 20% to 30%. Compare against your own history before comparing against anyone else.",
                    icon: BarChart3,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "A return costs more than the refund",
                    description: "Shipping both ways, the time to inspect and repack, and payment fees that aren't refunded all add up. Enter a realistic cost per return.",
                    icon: Receipt,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "A worked example",
                    description: "1,000 units sold and 50 returned is a 5% return rate. At a $25 price and $5 per return, that is $1,250 refunded and $250 of handling: $1,500 of profit leakage. If you resell 60% of the returns, $750 of the refunds comes back and the leakage is $750.",
                    icon: TrendingUp,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
            ]}
        />
    )
}
