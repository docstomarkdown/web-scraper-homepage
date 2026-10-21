"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BookOpen, Calculator, Scale, Target, TrendingUp } from "lucide-react"

export function TACoSGuide() {
    return (
        <ToolGuide
            title="How to read TACoS"
            icon={BookOpen}
            items={[
                {
                    title: "The formula",
                    description: "TACoS = ad spend ÷ total revenue × 100. Net margin after ads = gross margin − TACoS.",
                    icon: Calculator,
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                },
                {
                    title: "TACoS and ACoS",
                    description: "ACoS divides ad spend by the sales the ads produced; TACoS divides it by all sales. TACoS falling while sales grow means organic sales are carrying more of the business.",
                    icon: Scale,
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                },
                {
                    title: "What a healthy figure looks like",
                    description: "The meter compares TACoS with your gross margin. Under 30% of the margin is healthy, under 60% needs watching, and above that the ads are eating most of the profit.",
                    icon: Target,
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                },
                {
                    title: "A worked example",
                    description: "$50,000 of revenue, $5,000 of ads and a 40% gross margin: TACoS is 10% and the margin after ads is 30%. TACoS sits at a quarter of the margin, in the healthy range.",
                    icon: TrendingUp,
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                },
            ]}
        />
    )
}
