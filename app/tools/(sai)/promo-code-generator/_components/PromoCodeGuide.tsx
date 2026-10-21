"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { BookOpen, ShieldCheck, Zap, Target, MousePointer2 } from "lucide-react"
export function PromoCodeGuide() {
    return (
        <ToolGuide
            title="Promo Code Best Practices"
            icon={BookOpen}
            items={[
                {
                    title: "Optimize Length for Mobile",
                    description: "Keep codes between 8-12 characters. Mobile users find it easier to copy and paste or manually type shorter codes during checkout.",
                    icon: Zap,
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-500 dark:text-amber-400",
                    stat: "12 chars",
                    statLabel: "Ideal Max",
                },
                {
                    title: "Ensure Uniqueness",
                    description: "Avoid generic codes like 'SAVE10' for high-value promotions. Use randomized strings to prevent code leakage and unauthorized sharing.",
                    icon: ShieldCheck,
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-500 dark:text-blue-400",
                    tooltip: "Randomized codes are harder to leak",
                    stat: "Unique",
                    statLabel: "Anti-Leakage"
                },
                {
                    title: "Strategic Prefixing",
                    description: "Use prefixes that identify the campaign (e.g., 'SUMMER-') or the influencer (e.g., 'VIP-') to track attribution accurately.",
                    icon: Target,
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-500 dark:text-blue-400",
                    stat: "Prefix",
                    statLabel: "Attribution"
                },
                {
                    title: "Avoid Ambiguous Characters",
                    description: "Consider excluding characters like '0', 'O', '1', and 'I' if users need to type them manually to avoid friction.",
                    icon: MousePointer2,
                    iconBg: "bg-indigo-50 dark:bg-indigo-950/40",
                    iconColor: "text-indigo-500 dark:text-indigo-400",
                    stat: "Clear",
                    statLabel: "No 'O' or '0'"
                },
            ]}
        />
    )
}