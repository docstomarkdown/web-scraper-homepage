"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** What this converter does, in plain words. Copy rules: docs/writing-style.md. */
export function GTINInfo() {
    return (
        <div id="overview">
            <ToolOverview
                heading="What the GTIN Converter does"
                headingAccent="GTIN Converter"
                definition="Every retail barcode is a Global Trade Item Number. The same product number can be written with 8, 12, 13 or 14 digits depending on where it's used, and marketplaces ask for one form while suppliers send another. Type the number you have, or scan the label, and the converter checks it and shows every form."
                facts={[
                    { stat: "Check digit", label: "verified", detail: "The last digit is recalculated from the others; a mismatch means a typo or a bad scan." },
                    { stat: "4 forms", label: "shown", detail: "GTIN-8, GTIN-12 (UPC-A), GTIN-13 (EAN-13) and GTIN-14, where the number allows." },
                    { stat: "Scan", label: "or type", detail: "Upload a photo of the barcode and the digits are read for you." },
                ]}
            />
        </div>
    )
}
