import { Metadata } from "next"
import { FreeShippingCalculator } from "./_components/FreeShippingCalculator"
import { FreeShippingGuide } from "./_components/FreeShippingGuide"
import { FreeShippingHowToUse } from "./_components/FreeShippingHowToUse"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: "Free Shipping Threshold Calculator: Free Break-Even Check",
    description: "Enter average order value, gross margin and shipping cost to see the profit per order with free shipping and the sales increase that pays for it.",
    alternates: { canonical: "/tools/free-shipping-calculator" },
}
export default function FreeShippingCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Free Shipping Threshold Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <FreeShippingCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16" id="how-to-use">
                    <FadeIn delay={0.2}>
                        <FreeShippingHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <FreeShippingGuide />
                    </FadeIn>
                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                    {
                                        question: "How do I calculate a free shipping threshold?",
                                        answer: "Start a little above your average order value so customers add one item to qualify, then check with this calculator that the profit per order after absorbing shipping is still positive and that the sales increase needed is realistic."
                                    },
                                    {
                                        question: "Does free shipping increase average order value?",
                                        answer: "Usually, when the threshold sits a little above the current average. Shoppers add a small item to reach it, and the extra margin on that item helps pay for the shipping."
                                    },
                                    {
                                        question: "How much do sales need to rise to pay for free shipping?",
                                        answer: "Gross profit per order divided by profit after shipping, minus one. At $24 of gross profit and $7 of shipping that's 41% more orders to keep the same total profit."
                                    },
                                    {
                                        question: "Should I offer free shipping on everything?",
                                        answer: "Only if the shipping cost is well below the gross profit of your smallest common order. Heavy or low-margin items usually need a threshold or a shipping charge."
                                    },
                                    {
                                        question: "What margin should I enter?",
                                        answer: "Gross margin: the share of the price left after the cost of the goods, before shipping and overheads. A $60 order with $36 of goods has a 40% margin."
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
