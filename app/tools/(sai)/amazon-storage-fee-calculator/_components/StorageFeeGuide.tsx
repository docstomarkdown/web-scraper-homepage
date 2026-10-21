"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { Warehouse, Calculator, Calendar, Boxes, AlertTriangle } from "lucide-react"

/** What the calculator computes, the formula in words, where the inputs come from, and one worked example. */
export function StorageFeeGuide() {
    return (
        <ToolGuide
            title="How the fee is worked out"
            icon={Warehouse}
            items={[
                { title: "The formula in words", description: "Cubic feet per unit equals length × width × height in inches divided by 1,728. Multiply by the units stored for the total volume, then by the monthly rate for the season and size tier: $0.87 per cubic foot for standard-size items January to September and $2.40 October to December; $0.56 and $1.40 for oversize.", icon: Calculator, iconBg: "bg-blue-50 dark:bg-blue-950/40", iconColor: "text-blue-700 dark:text-blue-300" },
                { title: "Long-term storage", description: "Units that stay more than six months pay an extra $1.50 per cubic foot for each month beyond the sixth, on top of the monthly fee. The calculator adds it when you enter a duration over six months.", icon: Calendar, iconBg: "bg-amber-50 dark:bg-amber-950/40", iconColor: "text-amber-700 dark:text-amber-300" },
                { title: "A worked example", description: "A 10 × 8 × 6 in box is 480 cubic inches, 0.278 cubic feet. 100 units are 27.8 cubic feet. January to September that's $24.17 a month, or $72.50 over three months. The same stock in October to December costs $66.67 a month.", icon: Boxes, iconBg: "bg-emerald-50 dark:bg-emerald-950/40", iconColor: "text-emerald-700 dark:text-emerald-300" },
                { title: "Why the number is an estimate", description: "Amazon's rates change yearly and add utilisation and aged-inventory surcharges that depend on your whole account, not one product. Treat the result as the floor, and check the storage fee report in Seller Central.", icon: AlertTriangle, iconBg: "bg-violet-50 dark:bg-violet-950/40", iconColor: "text-violet-700 dark:text-violet-300" }
            ]}
        />
    )
}
