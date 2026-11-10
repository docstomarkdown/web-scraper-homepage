"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { AlertTriangle, BookOpen, Calculator, Layers, Table } from "lucide-react"

/** The formula in words, where the inputs come from, a worked example, and what the result leaves out. */
export function ValidatorGuide() {
    return (
        <ToolGuide
            title="How the numbers are worked out"
            icon={BookOpen}
            items={[
                {
                    title: "How the check digit works",
                    description: "Reading from the right, the digits in odd positions are multiplied by 3 and the rest by 1. The products are added, the sum is rounded up to the next multiple of 10, and the difference is the check digit.",
                    icon: Calculator,
                    stat: "× 3, × 1",
                    statLabel: "alternating from the right",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "Which formats it checks",
                    description: "UPC-A (12 digits), EAN-13 (13 digits), EAN-8 (8 digits) and GTIN-14 (14 digits) all use the same rule. An 8-digit number is checked as EAN-8. UPC-E, the short form printed on small packs, has to be expanded to UPC-A first and isn't checked here.",
                    icon: Layers,
                    stat: "4 lengths",
                    statLabel: "same rule",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-emerald-700 dark:text-emerald-300",
                },                {
                    title: "A worked example",
                    description: "For 036000291452, the digits 0 3 6 0 0 0 2 9 1 4 5 give a weighted sum of 58. The next multiple of 10 is 60, so the check digit is 2, which matches the last digit. The number is valid.",
                    icon: Table,
                    stat: "2",
                    statLabel: "the check digit",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "What valid doesn't mean",
                    description: "A number can be well formed and still not be registered to your product. Only the GS1 database answers that. Use the validator to catch typing errors before a listing is rejected.",
                    icon: AlertTriangle,
                    stat: "Format",
                    statLabel: "not registration",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-amber-700 dark:text-amber-300",
                }
            ]}
        />
    )
}
