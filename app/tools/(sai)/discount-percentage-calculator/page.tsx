import { Metadata } from "next"
import { DiscountCalculator } from "./_components/DiscountCalculator"
import { DiscountGuide } from "./_components/DiscountGuide"
import { DiscountHowToUse } from "./_components/DiscountHowToUse"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: "Discount Calculator: Free Final Price and Percentage Off",
    description: "Find the final price and saving from a price and a percentage off, or the percentage off from two prices, for one item or several.",
    alternates: { canonical: "/tools/discount-percentage-calculator" },
}
export default function DiscountCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Discount Percentage Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <DiscountCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <DiscountHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <DiscountGuide />
                    </FadeIn>
                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                    {
                                        question: "How do I calculate a discount?",
                                        answer: "Multiply the original price by the percentage off and divide by 100 for the saving, then subtract it from the price. 25% off $80 saves $20 and costs $60."
                                    },
                                    {
                                        question: "How do I find the percentage off from two prices?",
                                        answer: "Subtract the sale price from the original, divide by the original and multiply by 100. $80 down to $60 is a 25% discount."
                                    },
                                    {
                                        question: "Do two discounts add up?",
                                        answer: "No. Each applies to what's left after the previous one, so 20% then 10% is 28% off in total, not 30%."
                                    },
                                    {
                                        question: "How do I work out a discount for several items?",
                                        answer: "Enter the quantity and the calculator multiplies the per-item saving. Three $80 items at 25% off save $60."
                                    },
                                    {
                                        question: "What's the difference between a discount and a markdown?",
                                        answer: "Nothing in the maths. Shops say markdown for a permanent price cut and discount for a temporary one or a coupon."
                                    },
                                    {
                                        question: "Is this calculator free?",
                                        answer: "Yes. It runs in your browser, needs no sign-up and stores nothing you type."
                                    }
                                ]}
                        />
                    </FadeIn>
                    {/* CTA Section */}
                    <FadeIn delay={0.2}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
