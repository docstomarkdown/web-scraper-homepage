import { Metadata } from "next"
import { PPCBidCalculator } from "./_components/PPCBidCalculator"
import { PPCBidHowToUse } from "./_components/PPCBidHowToUse"
import { PPCBidGuide } from "./_components/PPCBidGuide"
import { PPCBidOverview } from "./_components/PPCBidOverview"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "PPC Bid Calculator: Free Max Cost per Click",
    description: "Find the most you can pay per click without losing money, from your product price, conversion rate and profit margin, with an optional target ACoS.",
    alternates: { canonical: "/tools/ppc-bid-calculator" },
}

const faqs = [
    {
        question: "How is the recommended bid calculated?",
        answer: "Price × conversion rate × target ACoS. If you enter no target, the calculator uses 75% of your profit margin as the ACoS.",
    },
    {
        question: "What is a good target ACoS?",
        answer: "Anything below your profit margin makes money. New listings often run a higher ACoS to gain reviews and rank, then bring it down.",
    },
    {
        question: "What is the difference between the recommended and break-even bids?",
        answer: "The break-even bid spends your whole margin on the click. The recommended bid spends only the target ACoS share, so the rest is profit.",
    },
    {
        question: "Should I bid the full recommended amount?",
        answer: "Treat it as a ceiling. Start lower, watch the actual cost per click and conversion rate, and raise the bid only where the keyword converts.",
    },
    {
        question: "Where do I find my conversion rate?",
        answer: "In your ad platform's campaign reports: orders divided by clicks for the listing. On Amazon it is the unit session percentage in Business Reports.",
    },
]

export default function PpcBidCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Pay-Per-Click (PPC) Bid Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <PPCBidCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <PPCBidOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <PPCBidHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <PPCBidGuide />
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
