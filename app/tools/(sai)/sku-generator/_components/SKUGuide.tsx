"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BookOpen, Hash, Info, Layers, ShieldCheck } from "lucide-react"

export function SKUGuide() {
    return (
        <ToolGuide
            title="What makes a good SKU"
            icon={BookOpen}
            items={[
                {
                    title: "What a SKU is",
                    description: "A stock keeping unit is your own code for one product variant. Unlike a UPC or barcode, you choose the format, so it can carry meaning.",
                    icon: Hash,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Go from broad to narrow",
                    description: "Brand, then category, then product, then attributes: NIKE-SHO-AF1-WHT-10-001. Sorting a list of SKUs then groups related items together.",
                    icon: Layers,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Keep it readable",
                    description: "Eight to sixteen characters, letters and numbers only, no spaces or symbols. A person should be able to read what it is at a glance.",
                    icon: ShieldCheck,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Never reuse a code",
                    description: "When a product is discontinued, retire its SKU. Reusing one mixes old and new sales in every report that references it.",
                    icon: Info,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
            ]}
        />
    )
}
