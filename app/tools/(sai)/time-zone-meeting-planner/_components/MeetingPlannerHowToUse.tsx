"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Clock, Globe, MapPin } from "lucide-react"

export function MeetingPlannerHowToUse() {
    return (
        <ToolSteps
            title="How to use this tool"
            steps={[
                {
                    title: "Set your own city and time",
                    description: "Choose your time zone and the time you have in mind.",
                    icon: MapPin,
                },
                {
                    title: "Add the other cities",
                    description: "Add the time zones of the people you need: a supplier in Shenzhen, an assistant in Manila, a customer in London.",
                    icon: Globe,
                },
                {
                    title: "Find the overlap",
                    description: "Each city shows its local time and whether it falls in business hours or off hours. Move your time until every city is in a workable slot.",
                    icon: Clock,
                },
            ]}
        />
    )
}
