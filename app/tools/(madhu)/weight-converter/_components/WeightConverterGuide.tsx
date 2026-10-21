"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { AlertTriangle, BookOpen, Calculator, Coins, Table } from "lucide-react"

/** The formula in words, where the inputs come from, a worked example, and what the result leaves out. */
export function WeightConverterGuide() {
    return (
        <ToolGuide
            title="How the numbers are worked out"
            icon={BookOpen}
            items={[
                {
                    title: "The conversion factors",
                    description: "One pound is 16 ounces and 453.59 grams. One kilogram is 1,000 grams and 2.2046 pounds. The converter turns your weight into grams first, then into each other unit, so the four results always agree.",
                    icon: Calculator,
                    stat: "453.59 g",
                    statLabel: "per pound",
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "Why the band matters",
                    description: "Carriers charge by steps, not by the gram. A product at the top of a band pays the same as one at the bottom; one gram over moves it up a step. Knowing the headroom tells you whether lighter packaging would save money.",
                    icon: Coins,
                    stat: "Steps",
                    statLabel: "not a smooth line",
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                    statColor: "text-emerald-700 dark:text-emerald-300",
                },                {
                    title: "A worked example",
                    description: "12 ounces is 0.75 pounds, 340 grams and 0.34 kilograms. On a carrier whose standard service steps at 1 pound, the item has 4 ounces of headroom: a heavier box is fine, a second unit in the parcel is not.",
                    icon: Table,
                    stat: "4 oz",
                    statLabel: "of headroom",
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                    statColor: "text-violet-700 dark:text-violet-300",
                },                {
                    title: "What it leaves out",
                    description: "The bands are a snapshot of published rate cards and change with each carrier's annual update. Dimensional weight, surcharges and zones aren't modelled. Check the carrier's own calculator before you quote a customer.",
                    icon: AlertTriangle,
                    stat: "Snapshot",
                    statLabel: "of rate cards",
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                    statColor: "text-amber-700 dark:text-amber-300",
                }
            ]}
        />
    )
}
