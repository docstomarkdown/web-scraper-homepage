"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { AlertTriangle, BookOpen, Calculator, Table } from "lucide-react"

/** The formula in words, where the inputs come from, a worked example, and what the result leaves out. */
export function COGSGuide() {
    return (
        <ToolGuide
            title="How the numbers are worked out"
            icon={BookOpen}
            items={[
                {
                    title: "The formula, in words",
                    description: "COGS per unit is product cost plus shipping plus packaging plus fulfilment. Total COGS is the per-unit figure multiplied by the quantity.",
                    icon: Calculator,
                    stat: "4 parts",
                    statLabel: "added up",
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "Where the inputs come from",
                    description: "Product cost is on the supplier's invoice. Inbound shipping is on the freight invoice; divide it by the units shipped. Packaging and fulfilment come from your packaging supplier and your fulfilment provider's rate card.",
                    icon: BookOpen,
                    stat: "3 invoices",
                    statLabel: "supplier, freight, 3PL",
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                    statColor: "text-emerald-700 dark:text-emerald-300",
                },                {
                    title: "A worked example",
                    description: "A product at $15.00 with $4.50 shipping, $0.75 packaging and $3.50 fulfilment costs $23.75 a unit. 100 units cost $2,375. At a $49 selling price, the gross margin is about 52%.",
                    icon: Table,
                    stat: "$23.75",
                    statLabel: "per unit",
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                    statColor: "text-violet-700 dark:text-violet-300",
                },                {
                    title: "What it leaves out",
                    description: "Marketplace fees, advertising, returns and storage aren't cost of goods; they come later in a net profit calculation. Keep them out of COGS so your margin stays comparable over time.",
                    icon: AlertTriangle,
                    stat: "Not fees",
                    statLabel: "those come later",
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                    statColor: "text-amber-700 dark:text-amber-300",
                }
            ]}
        />
    )
}
