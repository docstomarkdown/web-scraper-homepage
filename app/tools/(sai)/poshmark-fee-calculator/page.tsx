import { Metadata } from "next"
import { PoshmarkFeeCalculator } from "./_components/PoshmarkFeeCalculator"
import { PoshmarkFeeHowToUse } from "./_components/PoshmarkFeeHowToUse"
import { PoshmarkFeeGuide } from "./_components/PoshmarkFeeGuide"
import { PoshmarkOverview } from "./_components/PoshmarkOverview"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "Poshmark Fee Calculator: Free Seller Fee and Profit",
    description: "See Poshmark's fee on a sale, flat $2.95 under $15 or 20% above, and your net profit after the item cost and any shipping discount you offer.",
    alternates: { canonical: "/tools/poshmark-fee-calculator" },
}

const faqs = [
    {
        question: "What is Poshmark's fee?",
        answer: "A flat $2.95 on sales under $15 and 20% on sales of $15 or more. There are no listing fees.",
    },
    {
        question: "Who pays shipping on Poshmark?",
        answer: "The buyer, at Poshmark's flat rate, unless you offer a shipping discount. The discount is deducted from your earnings.",
    },
    {
        question: "Do I pay card or PayPal fees on top?",
        answer: "No. Payment processing is included in Poshmark's fee.",
    },
    {
        question: "How do shipping discounts affect profit?",
        answer: "A $7.97 discount on a $25 sale cuts net profit from $15.00 to $7.03. Enter the discount to see the effect before you send an offer.",
    },
    {
        question: "Are these fees current?",
        answer: "They match Poshmark's published US fee structure at the time of writing. Check Poshmark's fee page for changes.",
    },
]

export default function PoshmarkFeeCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Poshmark Fee Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <PoshmarkFeeCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <PoshmarkOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <PoshmarkFeeHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <PoshmarkFeeGuide />
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
