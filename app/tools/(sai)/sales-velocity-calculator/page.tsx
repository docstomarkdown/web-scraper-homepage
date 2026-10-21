import { Metadata } from "next"
import { SalesVelocityCalculator } from "./_components/SalesVelocityCalculator"
import { SalesVelocityHowToUse } from "./_components/SalesVelocityHowToUse"
import { SalesVelocityGuide } from "./_components/SalesVelocityGuide"
import { SalesVelocityOverview } from "./_components/SalesVelocityOverview"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "Sales Velocity Calculator: Free Units per Day",
    description: "Divide units sold by the days you were in stock to get your true daily sales rate, with the monthly units and revenue it implies.",
    alternates: { canonical: "/tools/sales-velocity-calculator" },
}

const faqs = [
    {
        question: "What is sales velocity?",
        answer: "How many units a product sells per day. The true figure counts only the days the product was available.",
    },
    {
        question: "Should I count days out of stock?",
        answer: "No. Enter them so the calculator removes them; those days had no sales because there was nothing to buy, not because demand fell.",
    },
    {
        question: "How does velocity help with restocking?",
        answer: "Multiply true velocity by your lead time to see how many units you need to cover the wait, then add a safety buffer.",
    },
    {
        question: "What is the difference between true and raw velocity?",
        answer: "Raw divides by every day in the period. True divides by the days you were in stock. They match only when you never ran out.",
    },
]

export default function SalesVelocityCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Sales Velocity Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <SalesVelocityCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <SalesVelocityOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <SalesVelocityHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <SalesVelocityGuide />
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
