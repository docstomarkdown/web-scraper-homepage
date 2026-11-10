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
                { title: "The formula in words", description: "Cubic feet per unit equals length × width × height in inches divided by 1,728. Multiply by the units stored for the total volume, then by each month's rate for its season and size tier. The estimated rates this calculator uses are $0.87 per cubic foot for standard-size items January to September and $2.40 October to December, and $0.56 and $1.40 for oversize. A period that runs into October is charged month by month.", icon: Calculator, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "Long-term storage", description: "Units that stay more than six months pay an aged-inventory surcharge on top of the monthly fee. Amazon's surcharge rises in tiers with age; the calculator uses a flat estimate of $1.50 per cubic foot for each month beyond the sixth.", icon: Calendar, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "A worked example", description: "A 10 × 8 × 6 in box is 480 cubic inches, 0.278 cubic feet. 100 units are 27.8 cubic feet. Starting in January, that's $24.17 a month, or $72.50 over three months. The same stock in October to December costs $66.67 a month.", icon: Boxes, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "Why the number is an estimate", description: "Amazon's rates change yearly and add utilisation and aged-inventory surcharges that depend on your whole account, not one product. Treat the result as an estimate, and check the storage fees in Seller Central.", icon: AlertTriangle, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" }
            ]}
        />
    )
}
