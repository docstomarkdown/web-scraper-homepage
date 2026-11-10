import { Metadata } from "next"
import { FBACalculator } from "./_components/FBACalculator"
import { FBAGuide } from "./_components/FBAGuide"
import { FBAHowToUse } from "./_components/FBAHowToUse"
import { ToolPageTitle, FadeIn, RelatedProduct, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: "Amazon FBA Fee Calculator: Fee and Profit Estimate",
    description: "Estimate Amazon's FBA fulfilment and referral fees from price, weight, size and category in the US, UK, EU, Canada and India, and see what's left.",
    alternates: { canonical: "/tools/amazon-fba-fee-calculator" },
    // Out of search until the rates are checked in Seller Central (config/site.ts).
    robots: { index: false, follow: true },
}
export default function FbaCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Amazon FBA fee calculator" />
                <FBACalculator />
                <div className="mt-8">
                    <RelatedProduct before="To price against competitors, collect their listings and prices into a spreadsheet with" linkText="Web Scraper Pro's product details and reviews" href="/product-scraper" after="." />
                </div>
                <div className="max-w-4xl mx-auto mt-20 space-y-16">
                    <FadeIn delay={0.1}>
                        <FBAHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <FBAGuide />
                    </FadeIn>
                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                    {
                                        question: "Are these Amazon FBA fees exact?",
                                        answer: "No. They're estimates from simplified rate cards for the main size tiers and categories. Amazon's own fee preview in Seller Central is the figure to rely on; use this to compare products and prices quickly."
                                    },
                                    {
                                        question: "What is the Amazon referral fee?",
                                        answer: "Amazon's commission on each sale: a percentage of the price that depends on the category, 15% for most, with a small minimum. It applies whether or not you use FBA."
                                    },
                                    {
                                        question: "What is dimensional weight?",
                                        answer: "A weight worked out from the box's volume. For bulky, light items Amazon charges the fulfilment fee on the dimensional weight when it's higher than the real weight. The US estimate here does the same, with length × width × height in inches ÷ 139."
                                    },
                                    {
                                        question: "Does this include storage fees?",
                                        answer: "Only if you add it. Open the advanced options and enter Storage Duration (Months), and a storage estimate at one flat monthly rate per cubic foot is added to the total. The Amazon storage fee calculator on this site splits it by season."
                                    },
                                    {
                                        question: "Which marketplaces does it cover?",
                                        answer: "US, UK, EU (a pan-EU average), Canada and India, each with its own units and rate card. Pick the marketplace from the currency control. Other currencies show no result, because there's no rate card for them."
                                    },
                                    {
                                        question: "Is this calculator free?",
                                        answer: "Yes. It runs in your browser, needs no sign-up and stores nothing you type."
                                    }
                                ]}
                        />
                    </FadeIn>
                </div>
                {/* CTA Section */}
                <FadeIn delay={0.2}>
                    <CTA />
                </FadeIn>
            </div >
        </div >
    )
}
