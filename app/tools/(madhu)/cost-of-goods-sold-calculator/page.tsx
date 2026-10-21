import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolSectionHeader, ToolPageTitle } from "@/app/tools/_shared/components"
import { COGSCalculator } from "./_components/COGSCalculator"
import { COGSOverview } from "./_components/COGSOverview"
import { COGSHowToUse } from "./_components/COGSHowToUse"
import { COGSGuide } from "./_components/COGSGuide"
import { CTA } from "@/components/sections/CTA"
import { Lightbulb } from "lucide-react"

export const metadata: Metadata = {
    title: "COGS Calculator: Free Cost of Goods Sold per Unit",
    description: "Add product, shipping, packaging and fulfilment costs to get the cost of goods sold per unit and for a whole order quantity.",
    alternates: { canonical: "/tools/cost-of-goods-sold-calculator" },
}

export default function COGSCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Cost of Goods Sold (COGS) Calculator" />
                <div className="mb-20">
                    <COGSCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.1}>
                        <ToolSectionHeader 
                            title="What this calculator does"
                            icon={Lightbulb}
                        />
                        <COGSOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <COGSHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <COGSGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How do you calculate cost of goods sold per unit?",
                                    answer: "Add what you pay for the unit, its share of inbound shipping, its packaging and the fee to fulfil it. That sum is the per-unit COGS; multiply by the quantity for the order.",
                                },
                                {
                                    question: "Does COGS include Amazon or marketplace fees?",
                                    answer: "No. Referral and advertising fees are selling costs. Keep them out of COGS and take them off later when you work out net profit.",
                                },
                                {
                                    question: "How do I turn a freight invoice into a per-unit shipping cost?",
                                    answer: "Divide the invoice total by the number of units in the shipment. If a shipment carries several products, split the cost by volume or weight first.",
                                },
                                {
                                    question: "What if I don't know the fulfilment cost yet?",
                                    answer: "Leave it at zero and add it when you have the rate card. The per-unit figure will rise by that amount.",
                                },
                                {
                                    question: "Why does the total matter?",
                                    answer: "It's the cash you spend before a single unit sells. It tells you how much an order ties up and for how long.",
                                },
                            ]}
                        />
                    </FadeIn>
                    <FadeIn delay={0.5}>
                        <CTA withSectionWrapper={false} />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
