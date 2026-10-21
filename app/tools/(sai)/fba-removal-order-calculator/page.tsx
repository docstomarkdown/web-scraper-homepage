import { Metadata } from "next"
import { FBARemovalCalculator } from "./_components/FBARemovalCalculator"
import { FBARemovalGuide } from "./_components/FBARemovalGuide"
import { FBARemovalHowToUse } from "./_components/FBARemovalHowToUse"
import { FBARemovalOverview } from "./_components/FBARemovalOverview"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "FBA Removal vs Disposal Calculator: Free Stock Check",
    description: "Compare removing stranded Amazon stock with disposing of it: units, per-unit fees, resale price and costs show which option loses less or earns more.",
    alternates: { canonical: "/tools/fba-removal-order-calculator" },
}

export default function FBARemovalOrderPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="FBA Removal vs Disposal Calculator" direction="down" duration={0.6} />

                <div className="mb-20">
                    <FBARemovalCalculator />
                </div>

                <div className="max-w-5xl mx-auto space-y-16" id="fba-removal-guide">
                    <FadeIn delay={0.2}>
                        <FBARemovalOverview />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <FBARemovalHowToUse />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <FBARemovalGuide />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                    {
                                        question: "When are Amazon removal fees charged?",
                                        answer: "When you place a removal order and Amazon ships the units back to you. The fee per unit depends on the size tier and shipping weight; the current table is in Seller Central under FBA fees."
                                    },
                                    {
                                        question: "Are disposal fees cheaper than removal fees?",
                                        answer: "Not in the current US schedule; the per-unit fee is the same. The choice comes down to whether you can sell the returned units for more than the fee and the cost of selling them."
                                    },
                                    {
                                        question: "What should I enter as the expected selling price?",
                                        answer: "What a returned unit will really fetch on another channel after discounts: your own site, eBay, a wholesale buyer. Be conservative; stock that didn't sell on Amazon rarely sells at full price elsewhere."
                                    },
                                    {
                                        question: "What goes into other costs?",
                                        answer: "Shipping from your location to the buyer, packaging, relisting fees and your time. Enter them per unit."
                                    },
                                    {
                                        question: "Is FBA liquidation better than removal?",
                                        answer: "Sometimes. Liquidation pays a small share of the estimated value with no removal fee, which beats disposal and can beat removal when resale is slow or costly."
                                    },
                                    {
                                        question: "Is this calculator free?",
                                        answer: "Yes. It runs in your browser, needs no sign-up and stores nothing you type."
                                    }
                                ]}
                        />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}