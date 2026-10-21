import { Metadata } from "next"
import { PODProfitCalculator } from "./_components/PODProfitCalculator"
import { PODProfitHowToUse } from "./_components/PODProfitHowToUse"
import { PODProfitGuide } from "./_components/PODProfitGuide"
import { PODProfitOverview } from "./_components/PODProfitOverview"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "Print on Demand Profit Calculator: Free Margin Check",
    description: "See what you keep on a print-on-demand sale after the base product cost, shipping both ways, marketplace fees and payment processing.",
    alternates: { canonical: "/tools/print-on-demand-profit-calculator" },
}

const faqs = [
    {
        question: "What is a good margin for print on demand?",
        answer: "A net margin of 20% to 30% is a common target. Below that, one fee change or a shipping increase can wipe out the profit.",
    },
    {
        question: "Should I offer free shipping?",
        answer: "If your buyers expect it, build the provider's shipping charge into the item price. Run both versions in the calculator and compare net profit, not the headline price.",
    },
    {
        question: "Do marketplace fees apply to the shipping I charge?",
        answer: "On most marketplaces, yes. Transaction and payment fees are charged on the total the customer pays, including shipping.",
    },
    {
        question: "Where do I find the fee rates?",
        answer: "On your marketplace's seller fee page and your payment processor's pricing page. Enter them as percentages; the fixed processing fee is usually $0.25 to $0.30.",
    },
    {
        question: "Does the calculator include my ad spend?",
        answer: "Only if you enter it as an offsite-ads or platform percentage. Ads you run yourself are a separate cost.",
    },
]

export default function PrintOnDemandProfitCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Print on Demand Profit Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <PODProfitCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <PODProfitOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <PODProfitHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <PODProfitGuide />
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
