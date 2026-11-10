"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BookOpen, Hash, Info, ShieldCheck, Tag } from "lucide-react"

export function PromoCodeGuide() {
    return (
        <ToolGuide
            title="Making codes that work"
            icon={BookOpen}
            items={[
                {
                    title: "Keep them short",
                    description: "Eight to twelve characters is enough. Shorter codes are easier to type on a phone and less likely to be mistyped at checkout.",
                    icon: Hash,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Random beats guessable",
                    description: "A code such as SAVE10 spreads on coupon sites within days. Random characters keep a promotion with the people you sent it to.",
                    icon: ShieldCheck,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Use the prefix to track",
                    description: "A prefix for the campaign or the partner, such as SUMMER- or VIP-, shows where each redemption came from in your store's reports.",
                    icon: Tag,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Avoid look-alike characters",
                    description: "If people will type the code, turn on Avoid look-alike characters to leave out 0 and O, and 1 and I. Turn off symbols unless your store requires them.",
                    icon: Info,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
            ]}
        />
    )
}
