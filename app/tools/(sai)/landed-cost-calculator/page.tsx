import { Metadata } from "next"
import { LandedCostCalculator } from "./_components/LandedCostCalculator"
import { LandedCostHowToUse } from "./_components/LandedCostHowToUse"
import { LandedCostGuide } from "./_components/LandedCostGuide"
import { LandedCostOverview } from "./_components/LandedCostOverview"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "Landed Cost Calculator: Free Import Cost per Unit",
    description: "Add shipping, import duty, insurance and fees to your supplier's price and see what one unit really costs once it reaches your warehouse.",
    alternates: { canonical: "/tools/landed-cost-calculator" },
}

const faqs = [
    {
        question: "What is landed cost?",
        answer: "Landed cost is the full price of getting a product from your supplier to your warehouse: the product itself, shipping, duty, insurance and fees. Pricing from the supplier's quote alone overstates your margin.",
    },
    {
        question: "How do I find my import duty rate?",
        answer: "Search your product's HS (Harmonized System) code on your customs authority's website, or ask your freight forwarder. Enter the rate as a percentage.",
    },
    {
        question: "What does the cost increase percentage show?",
        answer: "How much the landed cost per unit is above the supplier's unit price. A 30% increase means a $10 product costs $13 by the time it arrives.",
    },
    {
        question: "How do I lower my landed cost?",
        answer: "Negotiate the unit price, ship by sea instead of air when time allows, and order enough units that flat fees are spread thinly. Compare quotes by landed cost per unit, not by freight alone.",
    },
    {
        question: "What is the difference between FOB and EXW?",
        answer: "FOB means the supplier pays to get the goods to the export port; EXW means you pay everything from the factory door. With EXW, add the origin charges to shipping.",
    },
]

export default function LandedCostCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Landed Cost Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <LandedCostCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <LandedCostOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <LandedCostHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <LandedCostGuide />
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
