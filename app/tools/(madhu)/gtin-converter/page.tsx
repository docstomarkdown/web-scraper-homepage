import { Lightbulb } from "lucide-react"
import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { Converter } from "./_components/Converter"
import { GTINInfo } from "./_components/GTINInfo"
import { GTINHowToUse } from "./_components/GTINHowToUse"
import { GTINGuide } from "./_components/GTINGuide"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: "GTIN Converter: Free UPC, EAN and GTIN-14 Formats",
    description: "Check a barcode number's check digit and see it in GTIN-8, GTIN-12 (UPC), GTIN-13 (EAN) and GTIN-14 form, by typing it or scanning the label.",
    alternates: { canonical: "/tools/gtin-converter" },
}
export default function GTINConverterPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Global Trade Item Number (GTIN) Converter" />
                <div className="mb-20">
                    <Converter />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.1}>
                        <ToolSectionHeader title="What this converter does" icon={Lightbulb} />
                        <GTINInfo />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <GTINHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <GTINGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is a GTIN?",
                                    answer: "A Global Trade Item Number, the number behind every retail barcode. UPC and EAN codes are GTINs of different lengths.",
                                },
                                {
                                    question: "What's the difference between UPC, EAN and GTIN?",
                                    answer: "UPC is the 12-digit form used in North America, EAN the 13-digit form used elsewhere, and GTIN the family name for both plus the 8- and 14-digit forms.",
                                },
                                {
                                    question: "How do I convert a UPC to an EAN?",
                                    answer: "Add a zero at the front. The converter does it and recomputes nothing else, because the check digit stays the same.",
                                },
                                {
                                    question: "Why does it say my number is invalid?",
                                    answer: "The last digit doesn't match the other digits. Check for a typo or a misread scan; the converter shows the digit it expected.",
                                },
                                {
                                    question: "Does a valid number mean I can list the product?",
                                    answer: "No. Validity only means the number is well formed. Marketplaces check it against the GS1 registry, which this tool can't see.",
                                },
                            ]}
                        />
                    </FadeIn>
                    <FadeIn delay={0.5} className="mt-24 pb-12">
                        <CTA withSectionWrapper={false} />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
