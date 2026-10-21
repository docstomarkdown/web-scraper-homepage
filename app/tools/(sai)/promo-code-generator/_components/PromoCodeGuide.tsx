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
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                },
                {
                    title: "Random beats guessable",
                    description: "A code such as SAVE10 spreads on coupon sites within days. Random characters keep a promotion with the people you sent it to.",
                    icon: ShieldCheck,
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                },
                {
                    title: "Use the prefix to track",
                    description: "A prefix for the campaign or the partner, such as SUMMER- or VIP-, shows where each redemption came from in your store's reports.",
                    icon: Tag,
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                },
                {
                    title: "Avoid look-alike characters",
                    description: "If people will type the code, leave out 0 and O, and 1 and I. Turn off symbols unless your store requires them.",
                    icon: Info,
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                },
            ]}
        />
    )
}
