"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { Package, Calculator, Truck, Box, AlertTriangle } from "lucide-react"

/** What the calculator computes, the formula in words, where the inputs come from, and one worked example. */
export function DimWeightGuide() {
    return (
        <ToolGuide
            title="How dimensional weight is worked out"
            icon={Package}
            items={[
                { title: "The formula in words", description: "Dimensional weight equals length × width × height divided by the carrier's divisor, rounded up to the next whole unit. Billable weight is whichever is higher, the dimensional weight or the actual weight rounded up.", icon: Calculator, iconBg: "bg-blue-50 dark:bg-blue-950/40", iconColor: "text-blue-700 dark:text-blue-300" },
                { title: "A worked example", description: "A 20 × 16 × 12 in box is 3,840 cubic inches. At a divisor of 139 the dimensional weight is 27.6, rounded up to 28 lb. If the parcel really weighs 10 lb, the carrier bills 28 lb: the box, not the contents, sets the price.", icon: Truck, iconBg: "bg-amber-50 dark:bg-amber-950/40", iconColor: "text-amber-700 dark:text-amber-300" },
                { title: "Which divisor to use", description: "UPS and FedEx use 139 for daily rates in the US and 166 for some retail rates; USPS uses 166 for large parcels; DHL and most carriers outside the US use 5,000 with centimetres and kilograms. Check your rate sheet, because the divisor changes the bill directly.", icon: Box, iconBg: "bg-emerald-50 dark:bg-emerald-950/40", iconColor: "text-emerald-700 dark:text-emerald-300" },
                { title: "How to pay less", description: "Use the smallest box the item fits in, and ask your packaging supplier for sizes that sit under the carrier's thresholds. In the example, a 16 × 12 × 10 in box would bill 14 lb instead of 28.", icon: AlertTriangle, iconBg: "bg-violet-50 dark:bg-violet-950/40", iconColor: "text-violet-700 dark:text-violet-300" }
            ]}
        />
    )
}
