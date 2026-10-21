import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { EOQCalculator } from "./_components/EOQCalculator"
import { EOQHowToUse } from "./_components/EOQHowToUse"
import { EOQGuide } from "./_components/EOQGuide"
import { EOQOverview } from "./_components/EOQOverview"
import { CTA } from "@/components/sections/CTA"
import { Metadata } from "next"
import { Lightbulb } from "lucide-react"

export const metadata: Metadata = {
    title: "EOQ Calculator: Free Economic Order Quantity",
    description: "Find the order size that keeps ordering and holding costs lowest, plus how many orders a year that means and how far apart they fall.",
    alternates: { canonical: "/tools/economic-order-quantity-calculator" },
}

export default function EOQCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Economic Order Quantity (EOQ) Calculator" />
                <div className="mb-20">
                    <EOQCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <ToolSectionHeader 
                            title="What this calculator does"
                            icon={Lightbulb}
                        />
                        <EOQOverview />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <EOQHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <EOQGuide />
                    </FadeIn>
                    <FadeIn delay={0.5}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is economic order quantity?",
                                    answer: "The order size that minimises the sum of ordering costs and holding costs over a year. Order less and you order too often; order more and you hold too much stock.",
                                },
                                {
                                    question: "How is EOQ calculated?",
                                    answer: "The square root of (2 × annual demand × cost per order) ÷ holding cost per unit. For 10,000 units, $50 and $2.50 that's 632 units.",
                                },
                                {
                                    question: "What should I count as cost per order?",
                                    answer: "The fixed cost of placing and receiving one order: staff time, booking freight, customs filing, inspection. Not the price of the goods.",
                                },
                                {
                                    question: "How do I estimate holding cost per unit?",
                                    answer: "Storage rent per unit plus insurance, shrinkage and the cost of the money tied up. 20% to 30% of the unit's purchase cost a year is a common range.",
                                },
                                {
                                    question: "What if my supplier has a minimum order?",
                                    answer: "Order the larger of the EOQ and the minimum. The calculator shows what the extra stock costs you to hold.",
                                },
                            ]}
                        />
                    </FadeIn>
                    <FadeIn delay={0.6}>
                        <CTA withSectionWrapper={false} />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
