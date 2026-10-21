import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { DimensionConverterContent } from "./_components/DimensionConverter"
import { DimensionConverterHowToUse } from "./_components/DimensionConverterHowToUse"
import { DimensionConverterGuide } from "./_components/DimensionConverterGuide"
import { DimensionConverterOverview } from "./_components/DimensionConverterOverview"
import { CTA } from "@/components/sections/CTA"
import { BookOpen } from "lucide-react"

export const metadata: Metadata = {
    title: "Dimension Converter: Free Inches, cm, Feet and Metres",
    description: "Convert a product's length, width and height between inches, centimetres, feet and metres in one go, with the volume for each unit.",
    alternates: { canonical: "/tools/dimension-converter" },
}

export default function DimensionConverterPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Dimension Converter" direction="down" duration={0.6} />
                <DimensionConverterContent />
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.1}>
                        <ToolSectionHeader
                            title="What this converter does"
                            icon={BookOpen}
                        />
                        <DimensionConverterOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <DimensionConverterHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <DimensionConverterGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How do I convert inches to centimetres?",
                                    answer: "Multiply by 2.54. 12 inches is 30.48 centimetres. The converter does all three sizes at once.",
                                },
                                {
                                    question: "Which side is the length?",
                                    answer: "Carriers take the longest side as length, then width, then height. Enter them in that order if a form checks for it.",
                                },
                                {
                                    question: "Why do I need all three sizes?",
                                    answer: "Because the volume needs all three, and most forms ask for the set. The converter waits until all three are in.",
                                },
                                {
                                    question: "Does it convert weight too?",
                                    answer: "No. Use the weight converter for pounds, ounces, kilograms and grams.",
                                },
                                {
                                    question: "How precise is it?",
                                    answer: "Two decimal places from exact factors. If a form wants whole numbers, round up.",
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
