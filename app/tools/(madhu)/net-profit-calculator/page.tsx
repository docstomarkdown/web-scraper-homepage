import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { NetProfitCalculator } from "./_components/NetProfitCalculator"
import { NetProfitOverview } from "./_components/NetProfitOverview"
import { NetProfitHowToUse } from "./_components/NetProfitHowToUse"
import { NetProfitGuide } from "./_components/NetProfitGuide"
import { CTA } from "@/components/sections/CTA"
import { Lightbulb } from "lucide-react"

export const metadata: Metadata = {
    title: "Net Profit Calculator: Free Profit After Costs and Tax",
    description: "From revenue, cost of goods, advertising, overheads and a tax rate to gross profit, operating profit, net profit and the margins.",
    alternates: { canonical: "/tools/net-profit-calculator" },
}

export default function NetProfitCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Net Profit Calculator" />
                <div className="mb-20">
                    <NetProfitCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <ToolSectionHeader 
                            title="What this calculator does"
                            icon={Lightbulb}
                        />
                        <NetProfitOverview />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <NetProfitHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <NetProfitGuide />
                    </FadeIn>
                    <FadeIn delay={0.5}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How do you calculate net profit?",
                                    answer: "Revenue minus cost of goods sold, minus advertising and overheads, minus tax on what's left. The calculator shows each step.",
                                },
                                {
                                    question: "What's the difference between gross, operating and net profit?",
                                    answer: "Gross takes off the goods, operating takes off the running costs, net takes off tax. Each is a smaller number than the last.",
                                },
                                {
                                    question: "What is a good net profit margin for an online store?",
                                    answer: "Many stores land between 5% and 20%. The number depends on the category and how much advertising the sales need.",
                                },
                                {
                                    question: "Where do Amazon or Shopify fees go?",
                                    answer: "Put referral and payment fees in cost of goods if they vary per sale, or in overheads if they're fixed. Either way, don't leave them out.",
                                },
                                {
                                    question: "Why is tax zero?",
                                    answer: "Tax only applies when operating profit is positive. A loss produces no tax in this calculator.",
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
