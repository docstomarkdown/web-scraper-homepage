import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { InfluencerROICalculator } from "./_components/CalculatorComponent"
import { InfluencerHowToUse } from "./_components/InfluencerHowToUse"
import { InfluencerGuide } from "./_components/InfluencerGuide"
import { InfluencerOverview } from "./_components/InfluencerOverview"
import { CTA } from "@/components/sections/CTA"
import { Lightbulb } from "lucide-react"


export const metadata: Metadata = {
    title: "Influencer Marketing ROI Calculator: Free Campaign Return",
    description: "Put the influencer fee, ad spend, product and shipping costs against the revenue a campaign brought, and get profit and return on investment.",
    alternates: { canonical: "/tools/influencer-marketing-roi-calculator" },
}

export default function InfluencerROICalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Influencer Marketing ROI Calculator" />
                <div className="mb-20">
                    <InfluencerROICalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.1}>
                        <ToolSectionHeader 
                            title="What this calculator does"
                            icon={Lightbulb}
                        />
                        <InfluencerOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <InfluencerHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <InfluencerGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How do you calculate influencer marketing ROI?",
                                    answer: "Profit divided by cost, as a percentage, where profit is attributed revenue minus every cost of the campaign.",
                                },
                                {
                                    question: "What counts as campaign cost?",
                                    answer: "The influencer's fee, any ads you run on the content, the products you send and their shipping. Enter them separately or as one total.",
                                },
                                {
                                    question: "How do I attribute revenue to an influencer?",
                                    answer: "Give them a unique discount code or tracked link and read the sales against it in your store's reports.",
                                },
                                {
                                    question: "What is a good influencer ROI?",
                                    answer: "Many brands aim for at least 100%, meaning the campaign returns twice its cost. Awareness campaigns often accept less.",
                                },
                                {
                                    question: "Should I use revenue or profit for the revenue field?",
                                    answer: "Use revenue, which is what the calculator expects. If you want ROI on margin, enter revenue minus the cost of the goods sold instead.",
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
