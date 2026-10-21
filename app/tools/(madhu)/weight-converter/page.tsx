import { Lightbulb } from "lucide-react"
import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { WeightConverter } from "./_components/WeightConverter"
import { WeightConverterInfo } from "./_components/WeightConverterInfo"
import { WeightConverterHowToUse } from "./_components/WeightConverterHowToUse"
import { WeightConverterGuide } from "./_components/WeightConverterGuide"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: "Product Weight Converter: Free lb, oz, kg and g for Shipping",
    description: "Convert a product's weight between pounds, ounces, kilograms and grams, see its carrier price band, and how much room is left before the next one.",
    alternates: { canonical: "/tools/weight-converter" },
}
export default function WeightConverterPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Product Weight Converter" />
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
                                    question: "Which carriers are included?",
                                    answer: "The main US and international carriers, each with their standard and faster service levels. Pick the pair you ship with.",
                                },
                                {
                                    question: "How accurate are the shipping bands?",
                                    answer: "They follow published rate cards at the time the converter was built. Carriers update them yearly, so confirm with the carrier before quoting.",
                                },
                                {
                                    question: "What does the cost breakdown show?",
                                    answer: "The band your item sits in, the bands above and below, and the weight you can add before the price steps up.",
                                },
                                {
                                    question: "Why does it say contact carrier or freight?",
                                    answer: "The weight is above the carrier's parcel limit, usually 70 pounds. Those shipments are priced as freight.",
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
