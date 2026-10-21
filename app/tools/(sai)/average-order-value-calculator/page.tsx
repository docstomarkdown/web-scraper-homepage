import { Metadata } from "next"
import { AOVCalculator } from "./_components/AOVCalculator"
import { AOVGuide } from "./_components/AOVGuide"
import { AOVHowToUse } from "./_components/AOVHowToUse"
import { AOVOverview } from "./_components/AOVOverview"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: "Average Order Value Calculator: Free AOV from Two Numbers",
    description: "Divide revenue by orders to get average order value, and see the three ways stores raise it: bundles, a free shipping threshold and add-ons.",
    alternates: { canonical: "/tools/average-order-value-calculator" },
}
export default function AOVCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Average Order Value Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <AOVCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16" id="aov-guide">
                    <FadeIn delay={0.2}>
                        <AOVOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <AOVHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <AOVGuide />
                    </FadeIn>
                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                    {
                                        question: "How do I calculate average order value?",
                                        answer: "Divide total revenue by the number of orders in the same period. $50,000 of sales from 1,250 orders is a $40 average order value."
                                    },
                                    {
                                        question: "What is a good average order value?",
                                        answer: "Whatever is higher than last month's. AOV depends on what you sell: $40 can be strong for consumables and weak for furniture, so compare against your own history and your margin."
                                    },
                                    {
                                        question: "How can I increase average order value?",
                                        answer: "Bundle products that go together, set a free shipping threshold a little above today's AOV, and offer an add-on at checkout. Each raises the value of orders you already get."
                                    },
                                    {
                                        question: "Should I count refunds and discounts?",
                                        answer: "Use the figure that matches your question. Net revenue after discounts and refunds tells you what orders are really worth; gross revenue tells you what customers intended to spend."
                                    },
                                    {
                                        question: "Is average order value the same as revenue per customer?",
                                        answer: "No. A customer who orders three times in a month contributes three orders. Revenue per customer is usually higher than AOV and matters more for lifetime value."
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
