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
                { title: "The formula in words", description: "Dimensional weight equals length × width × height divided by the carrier's divisor, rounded up to the next whole unit. Billable weight is whichever is higher, the dimensional weight or the actual weight rounded up.", icon: Calculator, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "A worked example", description: "A 20 × 16 × 12 in box is 3,840 cubic inches. At a divisor of 139 the dimensional weight is 27.6, rounded up to 28 lb. If the parcel really weighs 10 lb, the carrier bills 28 lb: the box, not the contents, sets the price.", icon: Truck, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "Which divisor to use", description: "UPS and FedEx use 139 for daily rates in the US and 166 for some retail rates; USPS uses 166 for large parcels; DHL and most carriers outside the US use 5,000 with centimetres and kilograms. Check your rate sheet, because the divisor changes the bill directly.", icon: Box, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "How to pay less", description: "Use the smallest box the item fits in, and ask your packaging supplier for sizes that sit under the carrier's thresholds. In the example, a 16 × 12 × 10 in box would bill 14 lb instead of 28.", icon: AlertTriangle, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" }
            ]}
        />
    )
}
