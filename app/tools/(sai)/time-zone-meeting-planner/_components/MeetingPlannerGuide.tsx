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
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "US and China",
                    description: "Early evening in the eastern US is the next morning in China. 8 pm to 10 pm Eastern is 8 am to 10 am in Beijing, the usual window for supplier calls.",
                    icon: Globe,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "Daylight saving",
                    description: "The planner uses each country's offset on the date you pick, including daylight saving where it applies. Countries change their clocks on different days, so pick the real meeting date. Each country uses one time zone, its capital's or main business hub's, so countries with several zones show only that one.",
                    icon: ShieldCheck,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
                {
                    title: "When there is no overlap",
                    description: "If no hour suits everyone, take turns: one call in their morning, the next in yours. Share the agenda in writing so each side can prepare at its own pace.",
                    icon: Users,
                    iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20",
                    iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]",
                },
            ]}
        />
    )
}
