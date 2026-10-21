import { Lightbulb } from "lucide-react"
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { LeadTimeCalculator } from "./_components/LeadTimeCalculator"
import { LeadTimeHowToUse } from "./_components/LeadTimeHowToUse"
import { LeadTimeGuide } from "./_components/LeadTimeGuide"
import { LeadTimeOverview } from "./_components/LeadTimeOverview"
import { CTA } from "@/components/sections/CTA"
import { Metadata } from "next"
export const metadata: Metadata = {
    title: "Lead Time Calculator: Free Order to Delivery Days",
    description: "Add supplier time, shipping time and a safety buffer to get the total lead time and the date stock arrives if you order today.",
    alternates: { canonical: "/tools/lead-time-calculator" },
}
export default function LeadTimeCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Lead Time Calculator" />
                <div className="mb-20">
                    <LeadTimeCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.15}>
                        <ToolSectionHeader title="What this calculator does" icon={Lightbulb} />
                        <LeadTimeOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <LeadTimeHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <LeadTimeGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How do you calculate lead time?",
                                    answer: "Add the supplier's production time, the shipping time and a safety buffer. 14 + 7 + 3 is a 24-day lead time.",
                                },
                                {
                                    question: "Why is my real lead time longer than the supplier's quote?",
                                    answer: "The quote is usually production only. Add order processing, transit, customs and the last leg, and a buffer for delays.",
                                },
                                {
                                    question: "How big should the safety buffer be?",
                                    answer: "Look at your last few orders and take the biggest overrun. A week covers most holiday and port delays on sea freight.",
                                },
                                {
                                    question: "Does lead time include my own processing time?",
                                    answer: "Add it to the supplier time if your purchase orders take days to approve. The calculator counts whatever you put in.",
                                },
                                {
                                    question: "How does lead time affect my reorder point?",
                                    answer: "The reorder point is daily sales multiplied by lead time, plus safety stock. A longer lead time means ordering earlier.",
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
