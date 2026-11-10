import { Lightbulb } from "lucide-react"
import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { WeightConverter } from "./_components/WeightConverter"
import { WeightConverterInfo } from "./_components/WeightConverterInfo"
import { WeightConverterHowToUse } from "./_components/WeightConverterHowToUse"
import { WeightConverterGuide } from "./_components/WeightConverterGuide"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: "Product Weight Converter: lb, oz, kg and g for Shipping",
    description: "Convert a product's weight between pounds, ounces, kilograms and grams from exact factors, for shipping labels, listings and supplier specs.",
    alternates: { canonical: "/tools/weight-converter" },
}
export default function WeightConverterPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Product weight converter" />
                <div className="mb-20">
                    <WeightConverter />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.15}>
                        <ToolSectionHeader title="What this converter does" icon={Lightbulb} />
                        <WeightConverterInfo />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <WeightConverterHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <WeightConverterGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How do I convert ounces to pounds?",
                                    answer: "Divide by 16. 12 ounces is 0.75 pounds. The converter shows kilograms and grams at the same time.",
                                },
                                {
                                    question: "How do I convert kilograms to pounds?",
                                    answer: "Multiply by 2.2046, or divide by 0.45359237. 5 kilograms is 11.0231 pounds.",
                                },
                                {
                                    question: "Which conversion factors does it use?",
                                    answer: "The exact definitions: 1 pound is 453.59237 grams and 1 ounce is 28.349523125 grams. Results show up to 4 decimal places.",
                                },
                                {
                                    question: "Does it show carrier prices?",
                                    answer: "No. Carrier rates and weight steps change every year and differ by zone and service, so check the carrier's own rate card with the converted weight.",
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
