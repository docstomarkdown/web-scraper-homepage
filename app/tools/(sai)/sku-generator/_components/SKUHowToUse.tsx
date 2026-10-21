"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { FileText, Layers, Tag } from "lucide-react"

export function SKUHowToUse() {
    return (
        <ToolSteps
            title="How to use this tool"
            steps={[
                {
                    title: "Enter the parts",
                    description: "Type a brand prefix, a category code and a short product name, for example NIKE, SHO and AF1.",
                    icon: Tag,
                },
                {
                    title: "Add attributes and a number",
                    description: "Add a colour and a size part if the product has variants, pick the separator and the case, and set where the running number starts.",
                    icon: Layers,
                },
                {
                    title: "Copy or export",
                    description: "The SKU appears as you type. Add it to the list, repeat for other products, and download the list as a CSV for your inventory system.",
                    icon: FileText,
                },
            ]}
        />
    )
}
