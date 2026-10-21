"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BookOpen, Calculator, Clock, Receipt, Scale } from "lucide-react"

export function PackagingGuide() {
    return (
        <ToolGuide
            title="What packaging really costs"
            icon={BookOpen}
            items={[
                {
                    title: "The formula",
                    description: "Cost per order = box + padding + tape + label + inserts + (minutes to pack ÷ 60 × hourly wage). Total = cost per order × number of orders.",
                    icon: Calculator,
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                },
                {
                    title: "Your time counts",
                    description: "Three minutes at $15 an hour is $0.75 per order. If you pack your own orders, that is still time you could spend elsewhere, so include it.",
                    icon: Clock,
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                },
                {
                    title: "Where the savings are",
                    description: "Poly mailers cost less than boxes for anything that won't break. Buying tape and labels in bulk and standardising on two box sizes cuts the per-order figure.",
                    icon: Scale,
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                },
                {
                    title: "A worked example",
                    description: "A $0.85 mailer, $0.25 padding, $0.05 tape, $0.03 label and $0.15 insert is $1.33 in materials. Three minutes at $15 an hour adds $0.75, so each order costs $2.08 to pack, or $208 for 100 orders.",
                    icon: Receipt,
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                },
            ]}
        />
    )
}
