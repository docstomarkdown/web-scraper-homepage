import { Lightbulb } from "lucide-react"
import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { CubicFeetCalculator } from "./_components/CubicFeetCalculator"
import { CubicFeetInfo } from "./_components/CubicFeetInfo"
import { CubicFeetHowToUse } from "./_components/CubicFeetHowToUse"
import { CubicFeetGuide } from "./_components/CubicFeetGuide"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: "Cubic Feet Calculator: Volume for Freight and Storage",
    description: "Turn length, width and height into cubic feet, cubic metres, cubic inches and litres, convert the sizes between inches, centimetres, feet and metres, and add an optional cost per cubic foot.",
    alternates: { canonical: "/tools/cubic-feet-calculator" },
}
export default function CubicFeetCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Cubic feet calculator and dimension converter" />
                <div className="mb-20">
                    <CubicFeetCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.15}>
                        <ToolSectionHeader title="What this calculator does" icon={Lightbulb} />
                        <CubicFeetInfo />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <CubicFeetHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <CubicFeetGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How do I calculate cubic feet from inches?",
                                    answer: "Multiply length, width and height in inches, then divide by 1,728. A 12 by 10 by 8 inch box is 960 cubic inches, or 0.56 cubic feet.",
                                },
                                {
                                    question: "What's the difference between cubic feet, CBM and cubic inches?",
                                    answer: "They measure the same volume in different units. One cubic metre (CBM) is about 35.31 cubic feet, one cubic foot is 1,728 cubic inches, and one litre is 1,000 cubic centimetres.",
                                },
                                {
                                    question: "How do I convert dimensions between inches, centimetres, feet and metres?",
                                    answer: "Type the three sizes in the unit you have. The Dimensions row shows them in all four units: 1 inch is exactly 2.54 centimetres, 1 foot is 12 inches and 1 metre is 100 centimetres. A 12 by 10 by 8 inch box is 30.48 by 25.4 by 20.32 centimetres.",
                                },
                                {
                                    question: "How does the quantity field work?",
                                    answer: "It multiplies the single-item volume. 1 is the default; enter the number of identical cartons for a batch total.",
                                },
                                {
                                    question: "How do I get a cost estimate?",
                                    answer: "Enter your provider's rate per cubic foot. The calculator multiplies it by the total cubic feet.",
                                },
                                {
                                    question: "Why does a large result show as 518.15K?",
                                    answer: "Results over 100,000 are shortened to keep the number readable. Point at the number to see the full figure.",
                                },
                                {
                                    question: "How precise is the result?",
                                    answer: "To two decimal places (four for cubic metres), from exact conversion factors. Providers usually round up, so expect their bill to be a little higher.",
                                },
                            ]}
                        />
                    </FadeIn>
                    <FadeIn delay={0.5}>
                        <CTA withSectionWrapper={false} />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
