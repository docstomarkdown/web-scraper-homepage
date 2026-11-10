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
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "How the forms relate",
                    description: "Every form is the same number padded to 14 digits with leading zeros, so the check digit stays the same. A 12-digit UPC becomes a 13-digit EAN with a leading zero, and an EAN becomes a UPC only if it starts with 0. GTIN-8 is a separate number GS1 assigns to small packs and can't be made from the others.",
                    icon: Layers,
                    stat: "0 + UPC",
                    statLabel: "= EAN-13",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-emerald-700 dark:text-emerald-300",
                },                {
                    title: "A worked example",
                    description: "036000291452 is a valid GTIN-12. Add a leading zero for the GTIN-13, 0036000291452, and another for the GTIN-14, 00036000291452. All three identify the same product.",
                    icon: Table,
                    stat: "3 forms",
                    statLabel: "one product",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "What it can't tell you",
                    description: "A valid check digit doesn't prove the number is registered or belongs to your product. Only the GS1 registry does that. Use the converter to catch typing errors and to fill forms, not to verify ownership.",
                    icon: AlertTriangle,
                    stat: "Format",
                    statLabel: "not ownership",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-amber-700 dark:text-amber-300",
                }
            ]}
        />
    )
}
