"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Hash, Tag, Ticket } from "lucide-react"

export function PromoCodeHowToUse() {
    return (
        <ToolSteps
            title="How to use this tool"
            steps={[
                {
                    title: "Choose the length and how many",
                    description: "Type how many random characters each code should have (8 is a good default) and how many codes you need, up to 50.",
                    icon: Hash,
                },
                {
                    title: "Add a prefix or suffix",
                    description: "Open the advanced options to add text such as SAVE- at the start or -2026 at the end, and choose whether to include numbers or symbols.",
                    icon: Tag,
                },
                {
                    title: "Copy the codes",
                    description: "Click Generate, then copy one code or the whole list and paste it into your store's discount settings.",
                    icon: Ticket,
                },
            ]}
        />
    )
}
