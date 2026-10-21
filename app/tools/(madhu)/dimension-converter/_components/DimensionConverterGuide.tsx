"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { AlertTriangle, BookOpen, Boxes, Calculator, Table } from "lucide-react"

/** The formula in words, where the inputs come from, a worked example, and what the result leaves out. */
export function DimensionConverterGuide() {
    return (
        <ToolGuide
            title="How the numbers are worked out"
            icon={BookOpen}
            items={[
                {
                    title: "The conversion factors",
                    description: "One inch is 2.54 centimetres exactly. One foot is 12 inches, one metre is 100 centimetres. The converter turns your sizes into inches first and then into each other unit, so every result comes from the same base.",
                    icon: Calculator,
                    stat: "2.54",
                    statLabel: "cm per inch",
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "Volume in each unit",
                    description: "Volume is length multiplied by width multiplied by height. The converter shows it in cubic inches, cubic centimetres, cubic feet and cubic metres, which freight and storage forms ask for.",
                    icon: Boxes,
                    stat: "L × W × H",
                    statLabel: "in every unit",
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                    statColor: "text-emerald-700 dark:text-emerald-300",
                },                {
                    title: "A worked example",
                    description: "A box 12 by 10 by 8 inches is 30.48 by 25.4 by 20.32 cm, 1 by 0.83 by 0.67 feet, and 0.3 by 0.25 by 0.2 metres. Its volume is 960 cubic inches, or 0.556 cubic feet.",
                    icon: Table,
                    stat: "960 in³",
                    statLabel: "from 12 × 10 × 8",
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                    statColor: "text-violet-700 dark:text-violet-300",
                },                {
                    title: "Measure the packed size",
                    description: "Carriers and marketplaces use the outside of the packed carton, longest side first. Measure after packing, and round up to the next whole unit if the form asks for whole numbers.",
                    icon: AlertTriangle,
                    stat: "Packed",
                    statLabel: "outside edges",
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                    statColor: "text-amber-700 dark:text-amber-300",
                }
            ]}
        />
    )
}
