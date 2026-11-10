"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { AlertTriangle, BookOpen, Calculator, Table } from "lucide-react"

/** The formula in words, where the inputs come from, a worked example, and what the result leaves out. */
export function CubicFeetGuide() {
    return (
        <ToolGuide
            title="How the numbers are worked out"
            icon={BookOpen}
            items={[
                {
                    title: "The formula, in words",
                    description: "Volume is length multiplied by width multiplied by height. The calculator converts the three sizes to inches first, multiplies them, and divides by 1,728 for cubic feet. Cubic metres is cubic feet multiplied by 0.0283.",
                    icon: Calculator,
                    stat: "÷ 1,728",
                    statLabel: "inches to feet",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "Where the inputs come from",
                    description: "Measure the outside of the packed carton, not the product. Storage providers and freight forwarders charge on the packed size, including any protruding lid or strap.",
                    icon: BookOpen,
                    stat: "Packed size",
                    statLabel: "outside edges",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-emerald-700 dark:text-emerald-300",
                },                {
                    title: "A worked example",
                    description: "A carton 12 by 10 by 8 inches is 960 cubic inches, which is 0.556 cubic feet. 100 of them take 55.6 cubic feet. At $2.50 per cubic foot a month, storage is about $139.",
                    icon: Table,
                    stat: "0.556 ft³",
                    statLabel: "per carton",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "What it leaves out",
                    description: "Providers round up to the next unit or bill a minimum, and freight may use dimensional weight instead. Use the result to compare options, then check the provider's own rules.",
                    icon: AlertTriangle,
                    stat: "Rounding",
                    statLabel: "varies by provider",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-amber-700 dark:text-amber-300",
                }
            ]}
        />
    )
}
