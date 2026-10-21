import { Metadata } from "next"
import { MarginCalculator } from "./_components/MarginCalculator"
import { MarginHowToUse } from "./_components/MarginHowToUse"
import { MarginGuide } from "./_components/MarginGuide"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "Profit Margin Calculator: Free Margin and Markup",
    description: "Enter a selling price and a cost to see gross margin, markup and profit per unit, and learn why a 50% markup is not a 50% margin.",
    alternates: { canonical: "/tools/profit-margin-calculator" },
}

const faqs = [
    {
        question: "How do I calculate profit margin?",
        answer: "(Selling price − cost) ÷ selling price × 100. Buy for $50, sell for $100, and the margin is 50%.",
    },
    {
        question: "What is the difference between margin and markup?",
        answer: "Margin is profit as a share of the price; markup is profit as a share of the cost. For the same sale, markup is always the larger number.",
    },
    {
        question: "What should I include in the cost?",
        answer: "Everything you pay to get one unit sold: the product, inbound shipping, packaging, marketplace and payment fees. Leaving fees out overstates the margin.",
    },
    {
        question: "What is a good profit margin?",
        answer: "It depends on the category. Many online sellers aim for a gross margin of 30% to 50%, with enough left after ads and overheads to make a net profit.",
    },
]

export default function ProfitMarginCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Profit Margin Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <MarginCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <MarginHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <MarginGuide />
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
