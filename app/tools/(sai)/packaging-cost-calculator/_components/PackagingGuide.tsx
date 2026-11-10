"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BookOpen, Calculator, Clock, Receipt, Scale } from "lucide-react"

export function PackagingGuide() {
    return (
        <ToolGuide
            title="What packaging really costs"
            icon={BookOpen}
            items={[
                {
                    title: "The formula",
                    description: "Cost per order = box + padding + tape + label + inserts + (minutes to pack ÷ 60 × hourly wage). Total = cost per order × number of orders.",
                    icon: Calculator,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Your time counts",
                    description: "Three minutes at $15 an hour is $0.75 per order. If you pack your own orders, that is still time you could spend elsewhere, so include it.",
                    icon: Clock,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Where the savings are",
                    description: "Poly mailers cost less than boxes for anything that won't break. Buying tape and labels in bulk and standardising on two box sizes cuts the per-order figure.",
                    icon: Scale,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "A worked example",
                    description: "A $0.85 mailer, $0.25 padding, $0.05 tape, $0.03 label and $0.15 insert is $1.33 in materials. Three minutes at $15 an hour adds $0.75, so each order costs $2.08 to pack, or $208 for 100 orders.",
                    icon: Receipt,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
            ]}
        />
    )
}
