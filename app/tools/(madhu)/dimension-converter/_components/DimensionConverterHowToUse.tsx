"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { ClipboardList, Ruler, Table } from "lucide-react"

export function DimensionConverterHowToUse() {
    return (
        <ToolSteps
            title="How to use this converter"
            steps={[
                { title: "Pick the unit you have", description: "Choose inches, centimetres, feet or metres, whichever your measurements are in.", icon: Ruler },
                { title: "Type length, width and height", description: "Enter the three sizes. The progress bar shows when all three are in; results appear as soon as they are.", icon: ClipboardList },
                { title: "Read the other units", description: "Every unit shows the three sizes and the volume. Copy the row the form you're filling asks for.", icon: Table },
            ]}
        />
    )
}
