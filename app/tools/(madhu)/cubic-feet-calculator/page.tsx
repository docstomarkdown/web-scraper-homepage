import { Lightbulb } from "lucide-react"
import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { CubicFeetCalculator } from "./_components/CubicFeetCalculator"
import { CubicFeetInfo } from "./_components/CubicFeetInfo"
import { CubicFeetHowToUse } from "./_components/CubicFeetHowToUse"
import { CubicFeetGuide } from "./_components/CubicFeetGuide"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: "Cubic Feet Calculator: Free Volume for Freight and Storage",
    description: "Turn length, width and height into cubic feet, cubic metres and cubic inches, for one unit or a batch, with an optional cost per cubic foot.",
    alternates: { canonical: "/tools/cubic-feet-calculator" },
}
export default function CubicFeetCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Cubic Feet Calculator" />
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
                                    answer: "Multiply length, width and height in inches, then divide by 1,728. A 12 by 10 by 8 inch box is 960 cubic inches, or 0.556 cubic feet.",
                                },
                                {
                                    question: "What's the difference between cubic feet, CBM and cubic inches?",
                                    answer: "They measure the same volume in different units. One cubic metre (CBM) is about 35.3 cubic feet, and one cubic foot is 1,728 cubic inches.",
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
                                    answer: "Results over 100,000 are shortened to keep the number readable. Hover or copy for the full figure.",
                                },
                                {
                                    question: "How precise is the result?",
                                    answer: "To two decimal places. Providers usually round up, so expect their bill to be a little higher.",
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
