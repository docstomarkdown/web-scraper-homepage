import { Metadata } from "next"
import { ConversionCalculator } from "./_components/ConversionCalculator"
import { ConversionGuide } from "./_components/ConversionGuide"
import { ConversionHowToUse } from "./_components/ConversionHowToUse"
import { ConversionOverview } from "./_components/ConversionOverview"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
import { Lightbulb } from "lucide-react"

export const metadata: Metadata = {
    title: "Conversion Rate Calculator: Free Rate from Visitors and Orders",
    description: "Divide conversions by visitors to get your conversion rate, see how it compares with typical store rates, and work out what a small lift is worth in orders.",
    alternates: { canonical: "/tools/conversion-rate-calculator" },
}

export default function ConversionCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Conversion Rate Calculator" />
                <div className="text-center mb-10 -mt-6">
                    <FadeIn direction="down" duration={0.6} delay={0.1}>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto dark:text-slate-300">
                            Divide conversions by visitors to see what share of your traffic becomes customers, and what a small change is worth.
                        </p>
                    </FadeIn>
                </div>

                <div className="mb-20">
                    <ConversionCalculator />
                </div>

                <div className="max-w-4xl mx-auto space-y-16" id="conversion-guide">
                    <FadeIn delay={0.2}>
                        <div className="mt-8">
                            <ConversionOverview />
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <ConversionHowToUse />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <ConversionGuide />
                    </FadeIn>

                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                    {
                                        question: "How do I calculate conversion rate?",
                                        answer: "Divide conversions by visitors and multiply by 100. 250 orders from 10,000 sessions is a 2.5% conversion rate."
                                    },
                                    {
                                        question: "What is a good conversion rate for an online store?",
                                        answer: "Between 1% and 3% is typical; above 3% is strong. It varies a lot by product, price and traffic source, so compare against your own history by channel."
                                    },
                                    {
                                        question: "Should I use sessions or users?",
                                        answer: "Sessions, because a visitor can come back and convert on a later visit. Most benchmarks are per session; be consistent from month to month."
                                    },
                                    {
                                        question: "Why did my conversion rate drop after a campaign?",
                                        answer: "Cold ad traffic converts at a fraction of the rate of returning visitors, so a campaign that brings many new sessions lowers the rate even when orders go up. Look at the rate per traffic source."
                                    },
                                    {
                                        question: "How do I raise my conversion rate?",
                                        answer: "Clear product photos and prices, visible shipping costs, a short checkout with guest payment, fast pages on mobile, and reviews. Test one change at a time; the A/B test duration calculator on this site tells you how long each test needs."
                                    },
                                    {
                                        question: "Is this calculator free?",
                                        answer: "Yes. It runs in your browser, needs no sign-up and stores nothing you type."
                                    }
                                ]}
                        />
                    </FadeIn>

                    {/* CTA Section */}
                    <FadeIn delay={0.2}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}