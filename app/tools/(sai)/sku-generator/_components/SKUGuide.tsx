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
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                },
                {
                    title: "Go from broad to narrow",
                    description: "Brand, then category, then product, then attributes: NIKE-SHO-AF1-WHT-10-001. Sorting a list of SKUs then groups related items together.",
                    icon: Layers,
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                },
                {
                    title: "Keep it readable",
                    description: "Eight to sixteen characters, letters and numbers only, no spaces or symbols. A person should be able to read what it is at a glance.",
                    icon: ShieldCheck,
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                },
                {
                    title: "Never reuse a code",
                    description: "When a product is discontinued, retire its SKU. Reusing one mixes old and new sales in every report that references it.",
                    icon: Info,
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                },
            ]}
        />
    )
}
