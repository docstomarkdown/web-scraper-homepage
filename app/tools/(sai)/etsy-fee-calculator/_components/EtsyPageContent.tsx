"use client"
import React from "react"
import { EtsyFeeCalculator } from "./EtsyFeeCalculator"
import { EtsyFeeGuide } from "./EtsyFeeGuide"
import { EtsyFeeHowToUse } from "./EtsyFeeHowToUse"
import { EtsyOverview } from "./EtsyOverview"
import { FadeIn, ToolPageTitle, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export default function EtsyPageContent() {
    return (
        <div className="container mx-auto px-4">
            <ToolPageTitle title="Etsy Fee Calculator" direction="down" duration={0.6} />

            <div className="mb-20">
                <EtsyFeeCalculator />
            </div>

            <div className="max-w-5xl mx-auto space-y-16" id="etsy-fee-guide">
                <FadeIn delay={0.2}>
                    <EtsyOverview />
                </FadeIn>

                <FadeIn delay={0.2}>
                    <EtsyFeeHowToUse />
                </FadeIn>

                <FadeIn delay={0.2}>
                    <EtsyFeeGuide />
                </FadeIn>

                <FadeIn delay={0.2}>
                    <div className="pt-10">
                        <div className="mt-8 space-y-4">
                            <ToolFAQ
                                faqs={[
                                    {
                                        question: "How much does Etsy charge per sale?",
                                        answer: "A $0.20 listing fee, a 6.5% transaction fee on the price plus shipping, payment processing of 3% plus $0.25 in the US, and 12% or 15% offsite ads when an ad brought the buyer. On a $45 order with no ad that's $4.73."
                                    },
                                    {
                                        question: "Is the Etsy transaction fee charged on shipping?",
                                        answer: "Yes. Since 2022 the 6.5% applies to the item price and the shipping you charge, which is why the calculator adds them."
                                    },
                                    {
                                        question: "What is the Etsy offsite ads fee?",
                                        answer: "A 15% fee on orders that come from Etsy's ads on Google, Facebook and other sites within 30 days of the click, 12% for shops that sold over $10,000 in the past year. Shops under that threshold can opt out."
                                    },
                                    {
                                        question: "When is the listing fee charged?",
                                        answer: "When you list or renew an item, every four months, and again automatically after each sale of a multi-quantity listing. It's charged whether or not the item sells."
                                    },
                                    {
                                        question: "Are payment processing fees the same everywhere?",
                                        answer: "No. 3% plus $0.25 is the US rate; other countries have their own percentage and fixed fee. Change the two payment fields to match your country."
                                    },
                                    {
                                        question: "Is this calculator free?",
                                        answer: "Yes. It runs in your browser, needs no sign-up and stores nothing you type."
                                    }
                                ]}
                            />
                        </div>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <CTA />
                </FadeIn>
            </div>
        </div>
    )
}
