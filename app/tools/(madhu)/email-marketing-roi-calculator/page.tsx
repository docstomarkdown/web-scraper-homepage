import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { EmailROICalculator } from "./_components/EmailROICalculator"
import { EmailROIOverview } from "./_components/EmailROIOverview"
import { EmailROIHowToUse } from "./_components/EmailROIHowToUse"
import { EmailROIGuide } from "./_components/EmailROIGuide"
import { CTA } from "@/components/sections/CTA"
import { Metadata } from "next"
import { BookOpen } from "lucide-react"
export const metadata: Metadata = {
    title: "Email Marketing ROI Calculator: Free Campaign Return",
    description: "From list size, open rate, click rate, conversion rate and order value to revenue, profit and return on investment for one email campaign.",
    alternates: { canonical: "/tools/email-marketing-roi-calculator" },
}
export default function EmailROICalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                {/* Page Title */}
                <ToolPageTitle title="Email Marketing ROI Calculator" direction="down" duration={0.6} />
                {/* Calculator Tool */}
                <div className="mb-20">
                    <EmailROICalculator />
                </div>
                {/* Supporting Sections */}
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.1}>
                        <ToolSectionHeader 
                            title="What this calculator does"
                            icon={BookOpen}
                        />
                        <EmailROIOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <EmailROIHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <EmailROIGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How do you calculate email marketing ROI?",
                                    answer: "Profit divided by campaign cost, as a percentage. Profit is the revenue from orders the email produced minus what the campaign cost.",
                                },
                                {
                                    question: "What is a good open rate?",
                                    answer: "Around 20% is typical across industries; a clean, engaged list can see 30% or more. Use your own last few campaigns rather than an average.",
                                },
                                {
                                    question: "Why is the conversion rate so important?",
                                    answer: "It's applied last, to the smallest number. Moving it from 2% to 3% raises orders by half without touching the list.",
                                },
                                {
                                    question: "What should I include in the campaign cost?",
                                    answer: "Platform fees for the send, time spent writing and designing, and any discount or gift the email offers.",
                                },
                                {
                                    question: "Why can ROI be negative?",
                                    answer: "When revenue is below cost. Small lists with average rates often lose money on a single send; the calculator shows the list size where that changes.",
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
