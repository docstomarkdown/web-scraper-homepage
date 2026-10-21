import { Lightbulb } from "lucide-react"
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { AffiliateCommissionCalculator } from "./_components/AffiliateCommissionCalculator"
import { AffiliateOverview } from "./_components/AffiliateOverview"
import { AffiliateHowToUse } from "./_components/AffiliateHowToUse"
import { AffiliateGuide } from "./_components/AffiliateGuide"
import { CTA } from "@/components/sections/CTA"
import { Metadata } from "next"
export const metadata: Metadata = {
    title: "Affiliate Commission Calculator: Free Payout and Profit",
    description: "Work out what you'll pay affiliates and what you keep: clicks, conversion rate, order value and commission rate in, payout, revenue and net profit out.",
    alternates: { canonical: "/tools/affiliate-commission-calculator" },
}
export default function AffiliateCommissionCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Affiliate Commission Calculator" />
                <div className="mb-20">
                    <AffiliateCommissionCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <ToolSectionHeader title="What this calculator does" icon={Lightbulb} />
                        <AffiliateOverview />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <AffiliateHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <AffiliateGuide />
                    </FadeIn>
                    <FadeIn delay={0.5}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How is affiliate commission calculated?",
                                    answer: "Commission is the order revenue multiplied by the commission rate. The calculator first works out revenue from clicks, conversion rate and average order value, then applies the rate.",
                                },
                                {
                                    question: "What is a typical affiliate commission rate?",
                                    answer: "Physical products usually pay 5% to 15%; software and digital products pay 20% to 50%. Try a few rates here and read the net profit line before you decide.",
                                },
                                {
                                    question: "What does the product cost field do?",
                                    answer: "It's optional. Enter your cost of goods as a percentage of revenue and the calculator subtracts it, along with the payout, to show net profit.",
                                },
                                {
                                    question: "Why is the conversion rate set to 2.5%?",
                                    answer: "It's a common starting point for affiliate traffic. Replace it with the rate your own platform reports; a small change here moves every result.",
                                },
                                {
                                    question: "Does it include refunds and fees?",
                                    answer: "No. Returns, chargebacks and payment processing fees aren't in the formula, so the real profit is a little lower than the estimate.",
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
