"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { AlertTriangle, BookOpen, Calculator, Scale, Table } from "lucide-react"

/** The formula in words, where the inputs come from, a worked example, and what the result leaves out. */
export function ContainerLoadGuide() {
    return (
        <ToolGuide
            title="How the numbers are worked out"
            icon={BookOpen}
            items={[
                {
                    title: "The formula, in words",
                    description: "Along each container edge, the calculator divides the container length by the carton length and keeps the whole number. Length count times width count times height count is the units for that orientation. It repeats for every way the carton can be turned and keeps the largest.",
                    icon: Calculator,
                    stat: "6 tries",
                    statLabel: "per carton",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "Weight can be the limit",
                    description: "The container's weight limit divided by the carton weight is the most cartons it may carry. On pallets, each pallet's own weight is added first. The final count is the smaller of the space count and the weight count.",
                    icon: Scale,
                    stat: "min()",
                    statLabel: "space or weight",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-amber-700 dark:text-amber-300",
                },                {
                    title: "A worked example",
                    description: "A 20ft container is 5.9 m by 2.352 m by 2.395 m inside, with a 28,130 kg weight limit. A carton 50 cm by 40 cm by 30 cm, turned so its 40 cm side runs along the length, fits 14 by 4 by 7, which is 392 cartons. At 20 kg each that's 7,840 kg, under the limit, filling 70.8% of the space.",
                    icon: Table,
                    stat: "392",
                    statLabel: "cartons in a 20ft",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-emerald-700 dark:text-emerald-300",
                },                {
                    title: "What it leaves out",
                    description: "Real loads need dunnage, airbags, access for a forklift and cartons that can't bear weight on top. Count the result as the ceiling, then plan with the loader.",
                    icon: AlertTriangle,
                    stat: "Ceiling",
                    statLabel: "not a load plan",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-blue-700 dark:text-blue-300",
                }
            ]}
        />
    )
}
