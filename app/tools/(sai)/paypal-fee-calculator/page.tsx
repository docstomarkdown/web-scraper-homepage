import { Metadata } from "next"
import { PayPalFeeCalculator } from "./_components/PayPalFeeCalculator"
import { PayPalHowToUse } from "./_components/PayPalHowToUse"
import { PayPalGuide } from "./_components/PayPalGuide"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "PayPal Fee Calculator: Free Fee and Payout Check",
    description: "See the PayPal fee on a payment, what you receive after it, and what to charge to receive a set amount, at standard, international, micro and nonprofit rates.",
    alternates: { canonical: "/tools/paypal-fee-calculator" },
}

const faqs = [
    {
        question: "How much does PayPal charge?",
        answer: "For a standard US commercial payment, 2.9% of the amount plus $0.30. International, micropayment and nonprofit rates differ; the calculator has each.",
    },
    {
        question: "What is the friends and family rate?",
        answer: "Personal payments funded from a bank or balance carry no fee, but PayPal's rules don't allow them for sales, and they have no buyer protection.",
    },
    {
        question: "How do I receive exactly $100?",
        answer: "Ask for ($100 + $0.30) ÷ 0.971, which is $103.40 at the standard rate. The calculator's \"ask for\" figure does this for any amount.",
    },
    {
        question: "Did PayPal's fees change recently?",
        answer: "PayPal revises its schedule periodically. The rates here are the published US rates at the time of writing; confirm them in your account.",
    },
]

export default function PaypalFeeCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="PayPal Fee Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <PayPalFeeCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <PayPalHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <PayPalGuide />
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
