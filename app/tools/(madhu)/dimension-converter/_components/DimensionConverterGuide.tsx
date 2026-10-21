"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { ArrowRightLeft, Box, Globe, Calculator, BookOpen } from "lucide-react"
export function DimensionConverterGuide() {
    return (
        <ToolGuide
            title="About Dimension Converter"
            icon={BookOpen}
            items={[
                {
                    title: "Bidirectional Unit Conversion",
                    description: "Convert dimensions seamlessly between Inches (in) and Centimeters (cm). Enter measurements in either unit and instantly see the converted values. Perfect for international shipping, product specifications, and design work where unit precision matters.",
                    icon: ArrowRightLeft,
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-600 dark:text-blue-400",
                    stat: "2 Units",
                    statLabel: "in ↔ cm",
                    statColor: "text-blue-700 dark:text-blue-400",
                    tooltip: "Convert between Inches and Centimeters with precision"
                },
                {
                    title: "Three-Dimension Conversion",
                    description: "Enter Length, Width, and Height simultaneously. The converter processes all three dimensions at once, showing converted values for each axis. Results update in real-time as you type, making it easy to verify measurements across different unit systems.",
                    icon: Box,
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-600 dark:text-emerald-400",
                    stat: "3 Axes",
                    statLabel: "L × W × H",
                    statColor: "text-emerald-700 dark:text-emerald-400",
                    tooltip: "Convert Length, Width, and Height dimensions together"
                },
                {
                    title: "International Standards Support",
                    description: "Essential for e-commerce sellers, manufacturers, and logistics professionals working with global markets. US-based sellers often need 'cm' conversions for international listings, while international sellers need 'in' conversions for US marketplaces. This tool bridges the gap instantly.",
                    icon: Globe,
                    iconBg: "bg-purple-50 dark:bg-purple-950/40",
                    iconColor: "text-purple-600 dark:text-purple-400",
                    stat: "Worldwide",
                    statLabel: "Compatible",
                    statColor: "text-purple-700 dark:text-purple-400",
                    tooltip: "Perfect for international e-commerce and shipping"
                },
                {
                    title: "Precise Conversion Formula",
                    description: "Uses the standard conversion factor: 1 inch = 2.54 centimeters. All calculations maintain decimal precision, ensuring accurate conversions for product dimensions, packaging specifications, and shipping requirements. Results display with appropriate decimal places for clarity.",
                    icon: Calculator,
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-600 dark:text-amber-400",
                    stat: "2.54",
                    statLabel: "IN to CM factor",
                    statColor: "text-amber-700 dark:text-amber-400",
                    tooltip: "Accurate conversion using standard 1 inch = 2.54 cm formula"
                }
            ]}
        />
    )
}
