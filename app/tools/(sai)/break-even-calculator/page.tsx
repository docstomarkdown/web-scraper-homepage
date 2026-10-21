import { Metadata } from "next"
import { BreakEvenCalculator } from "./_components/BreakEvenCalculator"
import { BreakEvenGuide } from "./_components/BreakEvenGuide"
import { BreakEvenHowToUse } from "./_components/BreakEvenHowToUse"
import { BreakEvenOverview } from "./_components/BreakEvenOverview"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "Break-Even Calculator: Free Units and Revenue to Break Even",
    description: "Enter fixed costs, price per unit and variable cost per unit to see how many units you must sell, and the revenue that is, before any profit.",
    alternates: { canonical: "/tools/break-even-calculator" },
}

export default function BreakEvenCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Break-Even Calculator" direction="down" duration={0.6} />
                <div className="text-center mb-10 -mt-6">
                    <FadeIn direction="down" duration={0.6} delay={0.1}>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto dark:text-slate-300">
                            Determine exactly how many units you need to sell to cover your costs and start generating profit.
                        </p>
                    </FadeIn>
                </div>
                
                <div className="mb-20">
                    <BreakEvenCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <BreakEvenOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <BreakEvenHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <BreakEvenGuide />
                    </FadeIn>
                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                    {
                                        question: "How do I calculate the break-even point?",
                                        answer: "Subtract the variable cost per unit from the price to get the contribution margin, then divide fixed costs by it. $10,000 of fixed costs with a $20 margin is 500 units; at $50 each that's $25,000 of revenue."
                                    },
                                    {
                                        question: "What counts as a fixed cost?",
                                        answer: "Anything you pay regardless of sales in the period: rent, salaries, software subscriptions, insurance, loan payments. Pick a period, usually a month, and use the costs for that period."
                                    },
                                    {
                                        question: "What counts as a variable cost?",
                                        answer: "What one more unit costs you: the product or materials, packaging, payment processing, shipping you pay and any per-unit marketplace fee."
                                    },
                                    {
                                        question: "Why is the result rounded up?",
                                        answer: "You can't sell part of a unit, so the calculator rounds the units up. The revenue figure uses the rounded units."
                                    },
                                    {
                                        question: "How do I lower my break-even point?",
                                        answer: "Raise the price, lower the variable cost or cut fixed costs. Because fixed costs are divided by the margin, a small margin gain often does more than a big cut in overheads."
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

