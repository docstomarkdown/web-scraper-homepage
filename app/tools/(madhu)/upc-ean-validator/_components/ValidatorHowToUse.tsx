"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Barcode, CheckCircle2, ClipboardList, Table } from "lucide-react"

export function ValidatorHowToUse() {
    return (
        <ToolSteps
            title="How to use this validator"
            steps={[
                { title: "Type or scan the number", description: "Enter 8, 12, 13 or 14 digits, or upload a photo of the barcode label. Spaces and dashes are removed.", icon: Barcode },
                { title: "Read the verdict", description: "Valid means the check digit matches. Invalid shows the digit the number should end with, which is usually the one that was mistyped.", icon: CheckCircle2 },
                { title: "Open the breakdown", description: "The calculation panel lists the digits, the weights, the sum and the check digit, step by step.", icon: ClipboardList },
                { title: "Validate a file", description: "Switch to bulk mode, upload a CSV with one code per row, and download the same file with a valid or invalid column added.", icon: Table },
            ]}
        />
    )
}
