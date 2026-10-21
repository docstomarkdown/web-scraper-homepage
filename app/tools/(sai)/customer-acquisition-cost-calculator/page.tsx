import { Metadata } from "next"
import { CACCalculator } from "./_components/CACCalculator"
import { CACGuide } from "./_components/CACGuide"
import { CACHowToUse } from "./_components/CACHowToUse"
import { CACOverview } from "./_components/CACOverview"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
import { Target } from "lucide-react"

export const metadata: Metadata = {
    title: "Customer Acquisition Cost Calculator: Free CAC Estimate",
    description: "Divide your sales and marketing costs by the new customers they brought to get customer acquisition cost, and see how it compares with what a customer is worth.",
    alternates: { canonical: "/tools/customer-acquisition-cost-calculator" },
}

export default function CACCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <div className="mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <ToolPageTitle
                            title="Customer Acquisition Cost (CAC) Calculator"
                        />
                    </FadeIn>
                </div>
                <div className="mb-20">
                    <CACCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16" id="cac-guide">
                    <FadeIn delay={0.2}>
                        <CACOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <CACHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <CACGuide />
                    </FadeIn>
                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                    {
                                        question: "How do I calculate customer acquisition cost?",
                                        answer: "Add up what you spent on sales and marketing in a period and divide by the first-time customers won in that period. $12,000 and 300 new customers is a $40 CAC."
                                    },
                                    {
                                        question: "What costs go into CAC?",
                                        answer: "Ad spend, agency and tool fees, sales and marketing salaries and commissions, content, promotions and discounts given to win first orders. Leave out costs of serving existing customers."
                                    },
                                    {
                                        question: "What is a good customer acquisition cost?",
                                        answer: "One that's about a third of a customer's lifetime profit or less. A $40 CAC is fine when customers bring $120 of profit over time and poor when they bring $50."
                                    },
                                    {
                                        question: "How is CAC different from CPA?",
                                        answer: "CAC counts all sales and marketing costs per new customer. CPA usually counts ad spend per conversion, and a conversion can be a lead or a sign-up rather than a paying customer."
                                    },
                                    {
                                        question: "How do I lower CAC?",
                                        answer: "Improve conversion on the traffic you already pay for, get referrals from existing customers, and shift spend to the channels with the lowest CAC per customer value."
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