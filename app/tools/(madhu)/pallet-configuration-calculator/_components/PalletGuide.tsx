"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { AlertTriangle, BookOpen, Boxes, Calculator, Table } from "lucide-react"

/** The formula in words, where the inputs come from, a worked example, and what the result leaves out. */
export function PalletGuide() {
    return (
        <ToolGuide
            title="How the numbers are worked out"
            icon={BookOpen}
            items={[
                {
                    title: "The formula, in words",
                    description: "Per layer, the pallet length divided by the carton length (whole number) times the pallet width divided by the carton width. The calculator tries the carton in all 6 orientations (upright only if rotation is off) and keeps the one with the most cartons. Layers are the usable height divided by the carton height. Total is per layer times layers.",
                    icon: Calculator,
                    stat: "6 orientations",
                    statLabel: "best total",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "Height and weight limits",
                    description: "The usable height is the maximum stack height minus 5.5 inches for the pallet itself. If a carton weight and a limit are set, the limit minus the empty pallet's weight, divided by the carton weight, caps the total in whole layers.",
                    icon: AlertTriangle,
                    stat: "− 5.5 in",
                    statLabel: "for the pallet",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-amber-700 dark:text-amber-300",
                },                {
                    title: "A worked example",
                    description: "A 12 by 8 by 6 inch carton on a 48 by 40 pallet fits 4 by 5, or 20 per layer. With a 72-inch stack limit, the usable 66.5 inches gives 11 layers, so 220 cartons at a load height of 71.5 inches, using 100% of the surface.",
                    icon: Table,
                    stat: "220",
                    statLabel: "cartons per pallet",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "What it leaves out",
                    description: "Overhang, interlocking patterns, stretch wrap and cartons that can't carry weight aren't modelled. The result is the geometric maximum; a warehouse may stack fewer for stability.",
                    icon: Boxes,
                    stat: "Maximum",
                    statLabel: "not a stacking plan",
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                    statColor: "text-emerald-700 dark:text-emerald-300",
                }
            ]}
        />
    )
}
