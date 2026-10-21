import { Metadata } from "next"
import { SafetyStockCalculator } from "./_components/SafetyStockCalculator"
import { SafetyStockHowToUse } from "./_components/SafetyStockHowToUse"
import { SafetyStockGuide } from "./_components/SafetyStockGuide"
import { SafetyStockOverview } from "./_components/SafetyStockOverview"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "Safety Stock Calculator: Free Buffer Stock Formula",
    description: "Work out how many extra units to hold so a late supplier or a strong week doesn't leave you out of stock, from your worst-case and average sales and lead times.",
    alternates: { canonical: "/tools/safety-stock-calculator" },
}

const faqs = [
    {
        question: "How do I use safety stock in my reorder point?",
        answer: "Add it to average daily sales × average lead time. With the example above, the reorder point is 140 + 280 = 420 units.",
    },
    {
        question: "Where do I find the worst-case numbers?",
        answer: "Your best sales day and your slowest delivery in the last year. Use peak-season figures if you are ordering for a peak.",
    },
    {
        question: "How often should I recalculate?",
        answer: "Every quarter, and after any change in supplier, lead time or sales pattern.",
    },
    {
        question: "Is safety stock different for seasonal products?",
        answer: "Yes. Use the season's own maximum and average sales, not the yearly figures, or the buffer will be too small when it matters.",
    },
    {
        question: "What if a delay lasts longer than my buffer?",
        answer: "You run out. A buffer covers the worst case you entered, not a worse one; keep a second supplier for items you can't afford to lose.",
    },
]

export default function SafetyStockCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Safety Stock Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <SafetyStockCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <SafetyStockOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <SafetyStockHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <SafetyStockGuide />
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
