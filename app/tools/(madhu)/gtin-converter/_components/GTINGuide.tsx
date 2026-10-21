"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { AlertTriangle, BookOpen, Calculator, Layers, Table } from "lucide-react"

/** The formula in words, where the inputs come from, a worked example, and what the result leaves out. */
export function GTINGuide() {
    return (
        <ToolGuide
            title="How the numbers are worked out"
            icon={BookOpen}
            items={[
                {
                    title: "How the check digit works",
                    description: "Reading from the right, every second digit is multiplied by 3 and the rest by 1. The sum is rounded up to the next multiple of 10, and the difference is the check digit. It catches single mistyped digits and most swapped pairs.",
                    icon: Calculator,
                    stat: "3, 1, 3, 1",
                    statLabel: "weights from the right",
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "How the forms relate",
                    description: "A 12-digit UPC becomes a 13-digit EAN with a leading zero. A 13-digit EAN becomes a GTIN-14 with a leading packaging indicator, usually 0 for a single unit. GTIN-8 is a separate short form for small packs and can't be made from the others.",
                    icon: Layers,
                    stat: "0 + UPC",
                    statLabel: "= EAN-13",
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                    statColor: "text-emerald-700 dark:text-emerald-300",
                },                {
                    title: "A worked example",
                    description: "036000291452 is a valid GTIN-12. Add a leading zero for the GTIN-13, 0036000291452, and another for the GTIN-14, 00036000291452. All three identify the same product.",
                    icon: Table,
                    stat: "3 forms",
                    statLabel: "one product",
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                    statColor: "text-violet-700 dark:text-violet-300",
                },                {
                    title: "What it can't tell you",
                    description: "A valid check digit doesn't prove the number is registered or belongs to your product. Only the GS1 registry does that. Use the converter to catch typing errors and to fill forms, not to verify ownership.",
                    icon: AlertTriangle,
                    stat: "Format",
                    statLabel: "not ownership",
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                    statColor: "text-amber-700 dark:text-amber-300",
                }
            ]}
        />
    )
}
