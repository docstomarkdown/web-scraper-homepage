"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Clock, Globe, MapPin } from "lucide-react"

export function MeetingPlannerHowToUse() {
    return (
        <ToolSteps
            title="How to use this tool"
            steps={[
                {
                    title: "Set your country, date and time",
                    description: "Choose your country, the meeting date and the time you have in mind.",
                    icon: MapPin,
                },
                {
                    title: "Add the other countries",
                    description: "Add the countries of the people you need: a supplier in China, an assistant in the Philippines, a customer in the United Kingdom.",
                    icon: Globe,
                },
                {
                    title: "Find the overlap",
                    description: "Each country shows its local time and whether it falls in business hours or off hours. Move your time until every country is in a workable slot.",
                    icon: Clock,
                },
            ]}
        />
    )
}
