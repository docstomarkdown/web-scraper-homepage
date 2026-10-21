import { Metadata } from "next"
import { ABDurationCalculator } from "./_components/ABDurationCalculator"
import { ABDurationGuide } from "./_components/ABDurationGuide"
import { ABDurationHowToUse } from "./_components/ABDurationHowToUse"
import { ABDurationOverview } from "./_components/ABDurationOverview"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "A/B Test Duration Calculator: Free Sample Size and Days",
    description: "Enter your conversion rate, the lift you want to detect and your daily visitors to see how many visitors each variant needs and how many days the test runs.",
    alternates: { canonical: "/tools/ab-test-duration-calculator" },
}

export default function ABDurationCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle
                    title="A/B Test Duration Calculator"
                    direction="down"
                    duration={0.6}
                />

                <div className="mb-20">
                    <ABDurationCalculator />
                </div>

                <div className="max-w-5xl mx-auto space-y-20" id="ab-guide">

                    {/* Tool overview */}
                    <FadeIn delay={0.2}>
                        <ABDurationOverview />
                    </FadeIn>

                    {/* How to Use — ToolSteps renders its own section header, no duplicate needed */}
                    <FadeIn delay={0.2}>
                        <ABDurationHowToUse />
                    </FadeIn>

                    {/* Tool Guide */}
                    <FadeIn delay={0.2}>
                        <ABDurationGuide />
                    </FadeIn>

                    {/* FAQ — 5 high-impact questions focusing on A/B testing strategy and common pitfalls */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                    {
                                        question: "How long should an A/B test run?",
                                        answer: "Until each variant has the sample size the calculator shows, and for at least one full week so weekday and weekend behaviour are both in the data. Stopping early because one version is ahead is the most common way to get a false winner."
                                    },
                                    {
                                        question: "What is a minimum detectable effect?",
                                        answer: "The smallest improvement you want the test to be able to prove, as a percentage of today's rate. A 10% improvement on a 5% conversion rate means the new rate must reach 5.5%. Halving the effect roughly quadruples the sample size."
                                    },
                                    {
                                        question: "Why does a small improvement need so many visitors?",
                                        answer: "The difference between the two rates is squared in the denominator of the formula, so a smaller difference makes the required sample much larger. Proving a 2% lift takes about 25 times the visitors of proving a 10% lift."
                                    },
                                    {
                                        question: "Can I run more than two variants?",
                                        answer: "The calculator works out one variant against one control. For three or more variants, each extra variant needs the same sample size, so the total visitors and days go up in proportion."
                                    },
                                    {
                                        question: "Does the traffic split change the duration?",
                                        answer: "Yes. The days are driven by the variant that gets the least traffic. A 50/50 split finishes fastest; a 90/10 split takes about five times as long for the same sample size."
                                    },
                                    {
                                        question: "Is this calculator free?",
                                        answer: "Yes. It runs in your browser, needs no sign-up and stores nothing you type."
                                    }
                                ]}
                        />
                    </FadeIn>

                    {/* CTA */}
                    <FadeIn delay={0.2}>
                        <CTA withSectionWrapper={false} />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}