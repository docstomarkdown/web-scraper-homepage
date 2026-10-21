"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Barcode, CheckCircle2, Table } from "lucide-react"

export function GTINHowToUse() {
    return (
        <ToolSteps
            title="How to use this converter"
            steps={[
                { title: "Type or scan the number", description: "Enter 8, 12, 13 or 14 digits without spaces, or upload an image of the barcode label.", icon: Barcode },
                { title: "Read the check", description: "The converter recalculates the last digit. Valid means the number is well formed; invalid shows the digit it expected.", icon: CheckCircle2 },
                { title: "Copy the form you need", description: "Each format has a copy button. Amazon and most marketplaces take GTIN-12 or GTIN-13; cases and pallets use GTIN-14.", icon: Table },
            ]}
        />
    )
}
