"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { AlertTriangle, BookOpen, Calculator, Table } from "lucide-react"

/** The formula in words, where the inputs come from, a worked example, and what the result leaves out. */
export function EOQGuide() {
    return (
        <ToolGuide
            title="How the numbers are worked out"
            icon={BookOpen}
            items={[
                {
                    title: "The formula, in words",
                    description: "EOQ is the square root of two times annual demand times the cost per order, divided by the holding cost per unit. Orders a year is demand divided by EOQ. Annual ordering cost is orders times cost per order; annual holding cost is half the EOQ times the holding cost per unit.",
                    icon: Calculator,
                    stat: "√(2DS/H)",
                    statLabel: "the classic formula",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "Where the inputs come from",
                    description: "Demand is in your sales report. Cost per order comes from adding up what one purchase order costs your team and your forwarder. Holding cost per unit is your storage rate plus a share of insurance and capital cost.",
                    icon: BookOpen,
                    stat: "3 inputs",
                    statLabel: "sales, ops, finance",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-emerald-700 dark:text-emerald-300",
                },                {
                    title: "A worked example",
                    description: "10,000 units a year, $50 an order and $2.50 a unit to hold gives an EOQ of 632 units. That's about 16 orders a year, one every 23 days, with ordering and holding costs of about $791 each, $1,581 in total.",
                    icon: Table,
                    stat: "632",
                    statLabel: "units per order",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "What it leaves out",
                    description: "The formula assumes steady demand, a fixed price and instant delivery. Volume discounts, minimum order quantities and seasonal peaks all pull the right order size away from the EOQ. Use it as the starting point, then adjust.",
                    icon: AlertTriangle,
                    stat: "Steady",
                    statLabel: "demand assumed",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-amber-700 dark:text-amber-300",
                }
            ]}
        />
    )
}
