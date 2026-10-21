import { Metadata } from "next"
import { WholesalePriceCalculator } from "./_components/WholesalePriceCalculator"
import { WholesalePriceHowToUse } from "./_components/WholesalePriceHowToUse"
import { WholesalePriceGuide } from "./_components/WholesalePriceGuide"
import { WholesalePriceOverview } from "./_components/WholesalePriceOverview"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "Wholesale Price Calculator: Free Price from Margin",
    description: "Enter your cost per unit, any tax or duty, and the margin you need, and get the wholesale price, the markup it implies and the profit per unit.",
    alternates: { canonical: "/tools/wholesale-price-calculator" },
}

const faqs = [
    {
        question: "How is the wholesale price calculated?",
        answer: "Effective cost ÷ (1 − margin). A $10 cost and a 40% margin give $16.67.",
    },
    {
        question: "Should I include shipping in the cost per unit?",
        answer: "Yes, include inbound shipping and anything else you pay to have the unit ready to sell. Use the landed cost if you import.",
    },
    {
        question: "How much lower should wholesale be than retail?",
        answer: "Retailers usually mark wholesale up by 80% to 120%, so a $16.67 wholesale price supports a retail price around $30 to $35.",
    },
    {
        question: "What if the price comes out too high?",
        answer: "Lower the cost, accept a smaller margin, or sell in larger quantities so fixed costs are spread thinner. The calculator shows the effect of each.",
    },
    {
        question: "Do I charge sales tax on wholesale sales?",
        answer: "Usually not when the buyer provides a resale certificate, but rules differ by state and country. Check with your accountant.",
    },
]

export default function WholesalePriceCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Wholesale Price Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <WholesalePriceCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <WholesalePriceOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <WholesalePriceHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <WholesalePriceGuide />
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
