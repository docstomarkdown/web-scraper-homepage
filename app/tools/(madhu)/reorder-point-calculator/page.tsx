import { Lightbulb } from "lucide-react"
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { ReorderPointCalculator } from "./_components/ReorderPointCalculator"
import { ReorderPointHowToUse } from "./_components/ReorderPointHowToUse"
import { ReorderPointGuide } from "./_components/ReorderPointGuide"
import { ReorderPointOverview } from "./_components/ReorderPointOverview"
import { CTA } from "@/components/sections/CTA"
import { Metadata } from "next"
export const metadata: Metadata = {
    title: "Reorder Point Calculator: Free Stock Level to Reorder At",
    description: "Multiply daily sales by lead time and add safety stock to find the stock level at which to place the next order, and the days it covers.",
    alternates: { canonical: "/tools/reorder-point-calculator" },
}
export default function ReorderPointCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <div className="mb-12">
                    <ToolPageTitle
                        title="Reorder Point Calculator"
                        direction="up"
                        duration={0.6}
                    />
                </div>
                <div className="mb-20">
                    <ReorderPointCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.15}>
                        <ToolSectionHeader title="What this calculator does" icon={Lightbulb} />
                        <ReorderPointOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <ReorderPointHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <ReorderPointGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How do you calculate a reorder point?",
                                    answer: "Daily sales multiplied by lead time in days, plus safety stock. 25 a day, 14 days and 50 safety units is a reorder point of 400.",
                                },
                                {
                                    question: "What is safety stock?",
                                    answer: "Extra units kept for late deliveries and demand spikes. The reorder point includes it so the buffer is still there when the order lands.",
                                },
                                {
                                    question: "How much safety stock should I keep?",
                                    answer: "Enough to cover your usual delivery overrun. For steady products, one to two weeks of sales; more for seasonal or long-lead items.",
                                },
                                {
                                    question: "What if my daily sales change?",
                                    answer: "Rerun the calculator with the new rate. A reorder point set in a quiet month is too low for a peak.",
                                },
                                {
                                    question: "How is this different from days of inventory?",
                                    answer: "Days of inventory tells you how long your current stock lasts. The reorder point tells you the stock level at which to order so it never runs out.",
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
