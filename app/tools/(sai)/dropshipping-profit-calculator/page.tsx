import { Metadata } from "next"
import { DropshippingCalculator } from "./_components/DropshippingCalculator"
import { DropshippingHowToUse } from "./_components/DropshippingHowToUse"
import { ProfitGuide } from "./_components/ProfitGuide"
import { FadeIn, RelatedProduct, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: "Dropshipping Profit Calculator: Net Profit After RTO",
    description: "Enter purchase and selling price, orders, cancellations, RTO rate, ad, shipping and other costs to see delivered orders and the real net profit.",
    alternates: { canonical: "/tools/dropshipping-profit-calculator" },
}
export default function DropshippingCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Dropshipping profit calculator" direction="down" duration={0.6} />
                <DropshippingCalculator />
                <div className="mt-8">
                    <RelatedProduct before="To price against competitors, collect their listings and prices into a spreadsheet with" linkText="Web Scraper Pro's product details and reviews" href="/product-scraper" after="." />
                </div>
                <div className="max-w-4xl mx-auto mt-20 space-y-16">
                    <FadeIn delay={0.1}>
                        <DropshippingHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <ProfitGuide />
                    </FadeIn>
                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                    {
                                        question: "How do I calculate dropshipping profit?",
                                        answer: "Take the revenue from delivered orders, then subtract the goods for those orders, the ad and other costs for every order, shipping on delivered orders and shipping both ways on returns. The calculator does each step and shows the result."
                                    },
                                    {
                                        question: "What is RTO in dropshipping?",
                                        answer: "Return to origin: the customer refuses or misses the delivery and the parcel comes back. You pay shipping both ways and the ad cost that produced the order, with no sale."
                                    },
                                    {
                                        question: "Why are ads counted on every order?",
                                        answer: "Because you pay for the ad before the order is placed, whether or not it's delivered. Cancelled and returned orders still carry their ad cost."
                                    },
                                    {
                                        question: "What is a good margin for dropshipping?",
                                        answer: "There's no single figure. The net margin shown here is after ads, returns and shipping, so a thin one can disappear in a week of high returns. Work it out per product rather than guessing from the gross markup."
                                    },
                                    {
                                        question: "How do I calculate ads cost per product?",
                                        answer: "Divide your ad spend by the orders it produced. $15,000 of ads for 100 orders is $150 per order, which is also your cost per acquisition."
                                    },
                                    {
                                        question: "Does it work for other currencies?",
                                        answer: "Yes. Pick the currency at the top of the calculator; the formulas are the same."
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
