import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { GrossMarginCalculator } from "./_components/GrossMarginCalculator"
import { GrossMarginOverview } from "./_components/GrossMarginOverview"
import { GrossMarginHowToUse } from "./_components/GrossMarginHowToUse"
import { GrossMarginGuide } from "./_components/GrossMarginGuide"
import { CTA } from "@/components/sections/CTA"
import { Lightbulb } from "lucide-react"

export const metadata: Metadata = {
    title: "Gross Margin Calculator: Free Margin, Revenue or COGS",
    description: "Enter any two of revenue, cost of goods sold and gross margin, and get the third, with the gross profit in money.",
    alternates: { canonical: "/tools/gross-margin-calculator" },
}

export default function GrossMarginCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Gross Margin Calculator" />
                <div className="mb-20">
                    <GrossMarginCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <ToolSectionHeader 
                            title="What this calculator does"
                            icon={Lightbulb}
                        />
                        <GrossMarginOverview />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <GrossMarginHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <GrossMarginGuide />
                    </FadeIn>
                    <FadeIn delay={0.5}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How do you calculate gross margin?",
                                    answer: "Revenue minus cost of goods sold, divided by revenue. $10,000 of sales on $6,000 of cost is a 40% margin.",
                                },
                                {
                                    question: "What's the difference between gross margin and markup?",
                                    answer: "Margin is profit as a share of the selling price; markup is profit as a share of the cost. A 40% margin is a 67% markup.",
                                },
                                {
                                    question: "What is a good gross margin for an online store?",
                                    answer: "It varies by category. Many retailers work between 30% and 50%; handmade and digital goods can be higher, electronics lower.",
                                },
                                {
                                    question: "How do I price for a target margin?",
                                    answer: "Choose Find Revenue, enter the cost and the margin you want, and the calculator gives the price.",
                                },
                                {
                                    question: "Does gross margin include shipping and fees?",
                                    answer: "Only costs that are part of the goods. Marketplace fees, advertising and overheads come out later, in net profit.",
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
