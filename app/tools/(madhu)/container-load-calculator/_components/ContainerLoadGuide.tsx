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
                    description: "Along each container edge, the calculator divides the container length by the carton length and keeps the whole number. Length count times width count times height count is the units for that orientation. It repeats with the carton turned round and keeps the larger.",
                    icon: Calculator,
                    stat: "2 tries",
                    statLabel: "per carton",
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "Weight can be the limit",
                    description: "The container's weight limit divided by the carton weight is the most cartons it may carry. The final count is the smaller of the space count and the weight count.",
                    icon: Scale,
                    stat: "min()",
                    statLabel: "space or weight",
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                    statColor: "text-amber-700 dark:text-amber-300",
                },                {
                    title: "A worked example",
                    description: "A 20ft container is 5.9 m by 2.35 m by 2.39 m. A carton 50 cm by 40 cm by 30 cm fits 11 by 5 by 7, which is 385 cartons. At 20 kg each that's 7,700 kg, under the limit, filling about 69% of the space.",
                    icon: Table,
                    stat: "385",
                    statLabel: "cartons in a 20ft",
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                    statColor: "text-emerald-700 dark:text-emerald-300",
                },                {
                    title: "What it leaves out",
                    description: "Real loads need dunnage, airbags, access for a forklift and cartons that can't bear weight on top. Count the result as the ceiling, then plan with the loader.",
                    icon: AlertTriangle,
                    stat: "Ceiling",
                    statLabel: "not a load plan",
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                    statColor: "text-violet-700 dark:text-violet-300",
                }
            ]}
        />
    )
}
