import { CPACalculator } from "./_components/CPACalculator"
import { CPAHowToUse } from "./_components/CPAHowToUse"
import { CPAGuide } from "./_components/CPAGuide"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
import { Metadata } from "next"
export const metadata: Metadata = {
    title: "CPA Calculator: Free Cost Per Acquisition from Spend or CPC",
    description: "Work out cost per acquisition from ad spend and conversions, or estimate it from CPC and conversion rate, and compare it with a target CPA.",
    alternates: { canonical: "/tools/cpa-calculator" },
}
export default function CPACalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Cost Per Acquisition Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <CPACalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16" id="cpa-guide">
                    <FadeIn delay={0.2}>
                        <CPAHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <CPAGuide />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                    {
                                        question: "What is cost per acquisition?",
                                        answer: "What you pay, in ad spend, for one conversion: an order, a sign-up or a lead. $1,000 of spend that produced 40 orders is a $25 CPA."
                                    },
                                    {
                                        question: "How is CPA different from CPC?",
                                        answer: "CPC is the price of one click; CPA is the price of one result. CPA is CPC divided by the conversion rate, so at a 2.5% conversion rate the CPA is 40 times the CPC."
                                    },
                                    {
                                        question: "How do I lower my CPA?",
                                        answer: "Pay less per click (tighter keywords, better ad relevance) or convert more of the clicks (a faster page, clearer offer, fewer form fields). Halving either halves the CPA."
                                    },
                                    {
                                        question: "What is a good CPA?",
                                        answer: "One below the profit a customer brings. If a first order makes $30 of profit, a $25 CPA works and a $50 CPA doesn't, unless customers reorder."
                                    },
                                    {
                                        question: "Does CPA include overheads?",
                                        answer: "Not on ad platforms. Add agency fees, creative and tool costs to the spend to see the true cost per customer."
                                    },
                                    {
                                        question: "Is this calculator free?",
                                        answer: "Yes. It runs in your browser, needs no sign-up and stores nothing you type."
                                    }
                                ]}
                        />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
