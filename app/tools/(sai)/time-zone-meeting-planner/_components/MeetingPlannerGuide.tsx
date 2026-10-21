"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BookOpen, Globe, ShieldCheck, Sun, Users } from "lucide-react"

export function MeetingPlannerGuide() {
    return (
        <ToolGuide
            title="Finding a time that works"
            icon={BookOpen}
            items={[
                {
                    title: "What the labels mean",
                    description: "Business hours are 9 am to 5 pm local time. Anything else shows as off hours, so you can see at a glance who would be taking the call at night.",
                    icon: Sun,
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                },
                {
                    title: "US and China",
                    description: "Early evening in the eastern US is the next morning in China. 8 pm to 10 pm Eastern is 8 am to 10 am in Beijing, the usual window for supplier calls.",
                    icon: Globe,
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                },
                {
                    title: "Daylight saving",
                    description: "The planner uses each city's current offset, including daylight saving where it applies. Check again near the dates clocks change, since countries switch on different days.",
                    icon: ShieldCheck,
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                },
                {
                    title: "When there is no overlap",
                    description: "If no hour suits everyone, take turns: one call in their morning, the next in yours. Share the agenda in writing so each side can prepare at its own pace.",
                    icon: Users,
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                },
            ]}
        />
    )
}
