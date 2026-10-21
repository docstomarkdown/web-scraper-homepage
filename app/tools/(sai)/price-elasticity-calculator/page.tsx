import { Metadata } from "next"
import { PriceElasticityCalculator } from "./_components/PriceElasticityCalculator"
import { PriceElasticityHowToUse } from "./_components/PriceElasticityHowToUse"
import { PriceElasticityGuide } from "./_components/PriceElasticityGuide"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "Price Elasticity Calculator: Free Demand Sensitivity",
    description: "Compare sales before and after a price change to see how sensitive demand is, and whether a cut or a rise would bring in more revenue.",
    alternates: { canonical: "/tools/price-elasticity-calculator" },
}

const faqs = [
    {
        question: "What is price elasticity of demand?",
        answer: "A measure of how much the quantity sold changes when the price changes. Above 1 in size is elastic, below 1 is inelastic, exactly 1 is unitary.",
    },
    {
        question: "What does elastic demand mean for pricing?",
        answer: "Lowering the price brings in more revenue, because sales grow by more than the price falls. Raising it loses revenue.",
    },
    {
        question: "What does inelastic demand mean for pricing?",
        answer: "You can raise the price with little loss of sales, so revenue goes up. Cutting the price mostly gives margin away.",
    },
    {
        question: "How accurate is this?",
        answer: "It assumes nothing else changed between the two periods. Seasonality, a competitor's move or an ad campaign can distort the result, so compare like with like.",
    },
]

export default function PriceElasticityCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Price Elasticity Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <PriceElasticityCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <PriceElasticityHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <PriceElasticityGuide />
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
