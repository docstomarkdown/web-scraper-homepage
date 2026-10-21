import { Metadata } from "next"
import { EbayFeeCalculator } from "./_components/EbayFeeCalculator"
import { EbayFeeGuide } from "./_components/EbayFeeGuide"
import { EbayFeeHowToUse } from "./_components/EbayFeeHowToUse"
import { EbayOverview } from "./_components/EbayOverview"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "eBay Fee Calculator: Free Final Value Fee and Profit",
    description: "Enter the item price, shipping charged, your costs and eBay's fee rates to see the final value fee, promoted listings fee, profit and margin.",
    alternates: { canonical: "/tools/ebay-fee-calculator" },
}

export default function EbayFeeCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="eBay Fee Calculator" direction="down" duration={0.6} />
                
                <div className="mb-20">
                    <EbayFeeCalculator />
                </div>
                
                <div className="max-w-5xl mx-auto space-y-16" id="ebay-fee-guide">
                    <FadeIn delay={0.2}>
                        <EbayOverview />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <EbayFeeHowToUse />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <EbayFeeGuide />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                    {
                                        question: "How much does eBay charge per sale?",
                                        answer: "A final value fee, 13.25% of the item price plus shipping in most categories, plus a fixed $0.30 per order in the US, plus a promoted listings fee if you use ads. Rates vary by category and store level."
                                    },
                                    {
                                        question: "Is the eBay fee charged on shipping?",
                                        answer: "Yes. The final value fee applies to the total the buyer pays, including shipping, which is why the calculator adds the two."
                                    },
                                    {
                                        question: "What is the promoted listings fee?",
                                        answer: "A percentage of the sale that you choose when you promote a listing, charged only when a promoted listing sells. Enter your rate or leave it at zero."
                                    },
                                    {
                                        question: "How do I find my category's fee rate?",
                                        answer: "eBay's selling fees page lists the final value fee by category. Enter that percentage in the eBay Fee field, and your store rate if you subscribe."
                                    },
                                    {
                                        question: "Why is my eBay invoice different from the estimate?",
                                        answer: "International fees, the higher rate above a category's price cap, tax collected on the order and payment disputes aren't in the estimate. Compare with one real order and adjust the rates."
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
