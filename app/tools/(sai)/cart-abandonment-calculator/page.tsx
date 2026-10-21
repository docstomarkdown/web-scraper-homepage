import { Metadata } from "next"
import { AbandonmentCalculator } from "./_components/AbandonmentCalculator"
import { AbandonmentGuide } from "./_components/AbandonmentGuide"
import { AbandonmentHowToUse } from "./_components/AbandonmentHowToUse"
import { AbandonmentOverview } from "./_components/AbandonmentOverview"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
import { Lightbulb } from "lucide-react"
export const metadata: Metadata = {
    title: "Cart Abandonment Rate Calculator: Free Checkout Drop-off",
    description: "Enter the carts created and the orders completed in the same period to get your cart abandonment rate, with the benchmarks and the fixes that bring it down.",
    alternates: { canonical: "/tools/cart-abandonment-calculator" },
}
export default function CartAbandonmentCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Cart Abandonment Rate Calculator" />
                <div className="text-center mb-10 -mt-6">
                    <FadeIn direction="down" duration={0.6} delay={0.1}>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto dark:text-slate-300">
                            Discover the percentage of shoppers who leave without buying and assess the health of your checkout process.
                        </p>
                    </FadeIn>
                </div>
                <div className="mb-20">
                    <AbandonmentCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16" id="abandonment-guide">
                    <FadeIn delay={0.2}>
                        <div className="mt-8">
                            <AbandonmentOverview />
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <AbandonmentHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <AbandonmentGuide />
                    </FadeIn>
                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                    {
                                        question: "How do I calculate cart abandonment rate?",
                                        answer: "Divide completed orders by carts created, subtract from one and multiply by 100. 150 orders from 500 carts is a 70% abandonment rate."
                                    },
                                    {
                                        question: "What is a good cart abandonment rate?",
                                        answer: "Below 65% is better than most stores; the average across published studies sits around 70%. The useful comparison is your own rate last month."
                                    },
                                    {
                                        question: "Why do people abandon carts?",
                                        answer: "Costs that appear late, being made to create an account, long or confusing checkouts, missing payment methods and slow delivery. Showing shipping and taxes early removes the largest cause."
                                    },
                                    {
                                        question: "Where do I find carts created?",
                                        answer: "Shopify: Analytics reports, sessions with cart additions. WooCommerce: an analytics plugin or Google Analytics add-to-cart events. Amazon doesn't share cart data with sellers."
                                    },
                                    {
                                        question: "Does a lower rate always mean more sales?",
                                        answer: "Not on its own. Fewer carts can lower the rate without adding orders. Track orders and the rate together."
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
