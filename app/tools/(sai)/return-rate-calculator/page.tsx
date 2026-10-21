import { Metadata } from "next"
import { ReturnRateCalculator } from "./_components/ReturnRateCalculator"
import { ReturnRateHowToUse } from "./_components/ReturnRateHowToUse"
import { ReturnRateGuide } from "./_components/ReturnRateGuide"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "Return Rate Calculator: Free Returns and Lost Revenue",
    description: "Divide units returned by units sold to get your return rate, and see the revenue refunded and the handling cost those returns add up to.",
    alternates: { canonical: "/tools/return-rate-calculator" },
}

const faqs = [
    {
        question: "What is a good return rate?",
        answer: "Lower than your category's norm and falling. For clothing 20% can be ordinary; for electronics, 5% to 8%.",
    },
    {
        question: "Are returns always bad?",
        answer: "No. A generous returns policy raises conversion. The aim is to stop avoidable returns: wrong sizes, unclear photos, descriptions that over-promise.",
    },
    {
        question: "How do I lower my return rate?",
        answer: "Fix the top reasons in your return data: better size guides, more photos, accurate descriptions, and sturdier packaging for damage returns.",
    },
    {
        question: "What should I count as the cost of a return?",
        answer: "Return shipping, inspection and repackaging time, any non-refundable payment fees, and the loss if the item can't be resold as new.",
    },
]

export default function ReturnRateCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Return Rate Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <ReturnRateCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <ReturnRateHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <ReturnRateGuide />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <ToolFAQ title="Questions, answered" faqs={faqs} />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
