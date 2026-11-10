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
                    description: "One pound is 16 ounces and exactly 453.59237 grams, so one ounce is 28.349523125 grams. One kilogram is 1,000 grams and about 2.2046 pounds. The converter turns your weight into grams first, then into each other unit, so the four results always agree.",
                    icon: Calculator,
                    stat: "453.59237 g",
                    statLabel: "per pound",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "Why the exact weight matters",
                    description: "Carriers charge by weight steps, not by the gram, and one gram over a step moves the parcel up a price. Convert the packed weight, then find the step on your carrier's current rate card.",
                    icon: Coins,
                    stat: "Steps",
                    statLabel: "not a smooth line",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-emerald-700 dark:text-emerald-300",
                },                {
                    title: "A worked example",
                    description: "12 ounces is 0.75 pounds, 340.1943 grams and 0.3402 kilograms. If your carrier's next price step is at 1 pound, that leaves 4 ounces for the box and packing.",
                    icon: Table,
                    stat: "4 oz",
                    statLabel: "of headroom",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "What it leaves out",
                    description: "It converts weight only. Carrier prices, dimensional weight, surcharges and zones aren't included. Check the carrier's own calculator before you quote a customer.",
                    icon: AlertTriangle,
                    stat: "Weight",
                    statLabel: "not price",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-amber-700 dark:text-amber-300",
                }
            ]}
        />
    )
}
