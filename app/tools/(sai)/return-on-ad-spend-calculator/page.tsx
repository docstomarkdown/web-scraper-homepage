import { Metadata } from "next"
import { ReturnOnAdSpendCalculator } from "./_components/ReturnOnAdSpendCalculator"
import { ROASHowToUse } from "./_components/ROASHowToUse"
import { ROASGuide } from "./_components/ROASGuide"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "ROAS Calculator: Free Return on Ad Spend",
    description: "Divide the revenue your ads produced by what they cost to get your ROAS, or enter a target ROAS to see the revenue a budget needs to bring in.",
    alternates: { canonical: "/tools/return-on-ad-spend-calculator" },
}

const faqs = [
    {
        question: "What is ROAS?",
        answer: "Return on ad spend: the revenue your ads produced divided by what they cost. It measures ad efficiency, not overall profit.",
    },
    {
        question: "How is ROAS calculated?",
        answer: "Revenue from ads ÷ ad spend. $500 of attributed sales from $100 of ads is a ROAS of 5.0.",
    },
    {
        question: "What is a good ROAS?",
        answer: "Above your break-even ROAS, which is 1 ÷ your profit margin. Many sellers aim for 3.0 to 5.0; a thin-margin product needs more.",
    },
    {
        question: "What is the difference between ROAS and ACoS?",
        answer: "They are the same ratio upside down. ACoS = ad spend ÷ revenue, so a ROAS of 4.0 is an ACoS of 25%.",
    },
]

export default function ReturnOnAdSpendCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Return on Ad Spend (ROAS) Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <ReturnOnAdSpendCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <ROASHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <ROASGuide />
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
