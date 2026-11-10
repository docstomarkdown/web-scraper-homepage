import { Lightbulb } from "lucide-react"
import { Metadata } from "next"
import { Validator } from "./_components/Validator"
import { ValidatorGuide } from "./_components/ValidatorGuide"
import { ValidatorHowToUse } from "./_components/ValidatorHowToUse"
import { ValidatorInfo } from "./_components/ValidatorInfo"
import { FadeIn, RelatedProduct, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: "UPC and EAN Validator: Check Digit Checker",
    description: "Check whether a UPC or EAN barcode number is valid, see the check digit calculation step by step, and validate a whole CSV of codes at once.",
    alternates: { canonical: "/tools/upc-ean-validator" },
}
export default function UPCEANValidatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="UPC and EAN validator" />
                <div className="mb-20 space-y-8">
                    <Validator />
                    <RelatedProduct
                        before="To export a Shopify store's products with their barcodes, use"
                        linkText="Web Scraper Pro's Shopify store export"
                        href="/shopify-scraper"
                        after="."
                    />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.15}>
                        <ToolSectionHeader title="What this validator does" icon={Lightbulb} />
                        <ValidatorInfo />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <ValidatorHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.25}>
                        <ValidatorGuide />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What barcode formats does the validator support?",
                                    answer: "UPC-A, EAN-13, EAN-8 and GTIN-14: 8, 12, 13 or 14 digits. All use the same check-digit rule. An 8-digit number is checked as EAN-8; UPC-E codes aren't supported, because they have to be expanded to UPC-A first.",
                                },
                                {
                                    question: "What is a check digit?",
                                    answer: "The last digit of a barcode number, calculated from the others. It lets a scanner or a marketplace catch a mistyped or misread number.",
                                },
                                {
                                    question: "Why does my barcode show as invalid?",
                                    answer: "The last digit doesn't match the calculation. Compare the number with the label; a swapped or mistyped digit is the usual cause.",
                                },
                                {
                                    question: "Can I upload a barcode image instead of typing?",
                                    answer: "Yes. Upload a photo of the label and the digits are read from it and checked. There's no live camera scanning.",
                                },
                                {
                                    question: "Does it validate a whole spreadsheet?",
                                    answer: "Yes. Upload a CSV with one code per row, in the first column or a column named barcode, UPC, EAN or GTIN, then download the results as a CSV with a result column. The sample CSV shows the layout.",
                                },
                                {
                                    question: "Does valid mean the barcode belongs to my product?",
                                    answer: "No. It means the number is well formed. Registration is checked against GS1 by the marketplace, not here.",
                                },
                            ]}
                        />
                    </FadeIn>
                    <FadeIn delay={0.35}>
                        <CTA withSectionWrapper={false} />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
