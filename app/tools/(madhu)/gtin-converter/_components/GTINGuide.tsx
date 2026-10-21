"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { Globe, MapPin, ShieldCheck, Boxes, BookOpen } from "lucide-react"
export function GTINGuide() {
    return (
        <ToolGuide
            title="Understanding GTIN Conversion"
            icon={BookOpen}
            items={[
                {
                    title: "UPC to EAN (GTIN-12 to 13)",
                    description: "The primary conversion for US/Canada retail. Our tool automatically prepends the required zero prefix to transition your UPC-A codes into the 13-digit EAN-13 (GTIN-13) international standard.",
                    icon: Globe,
                    stat: "UPC→EAN",
                    statLabel: "USA to Global",
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-500 dark:text-blue-400",
                    statColor: "text-blue-600 dark:text-blue-400"
                },
                {
                    title: "EAN to UPC (GTIN-13 to 12)",
                    description: "When converting for North American marketplaces like Amazon, Walmart, or Target, our tool strips the zero-padding from your EAN-13 to return the standard 12-digit UPC format.",
                    icon: MapPin,
                    stat: "EAN→UPC",
                    statLabel: "Global to USA",
                    iconBg: "bg-indigo-50 dark:bg-indigo-950/40",
                    iconColor: "text-indigo-500 dark:text-indigo-400",
                    statColor: "text-indigo-600 dark:text-indigo-400"
                },
                {
                    title: "Logistics GTIN-14 Levels",
                    description: "Commonly used for cartons, cases, and pallet configurations. We convert your consumer-level barcode (UPC/EAN) to the shipper-level GTIN-14 format essential for warehouse and supply chain management.",
                    icon: Boxes,
                    stat: "Shipper",
                    statLabel: "Case/Pack Level",
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-500 dark:text-emerald-400",
                    statColor: "text-emerald-600 dark:text-emerald-400"
                },
                {
                    title: "Instant Image Scanning",
                    description: "New scanning technology: upload a photo from your warehouse. Our tool automatically reads the numerical data from the image for instant validation and conversion — no more manual entry errors.",
                    icon: ShieldCheck,
                    stat: "Scan-ID",
                    statLabel: "Auto-Read",
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-500 dark:text-violet-400",
                    statColor: "text-violet-600 dark:text-violet-400"
                }
            ]}
        />
    )
}
