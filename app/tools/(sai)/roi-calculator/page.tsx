import { Metadata } from "next"
import { ROICalculator } from "./_components/ROICalculator"
import { ROIHowToUse } from "./_components/ROIHowToUse"
import { ROIGuide } from "./_components/ROIGuide"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "ROI Calculator: Free Return on Investment",
    description: "Enter what you put in and what you got back to see ROI as a percentage and a profit figure, with an annualised rate for a period you choose.",
    alternates: { canonical: "/tools/roi-calculator" },
}

const faqs = [
    {
        question: "What is ROI?",
        answer: "Return on investment: the profit from an investment as a share of what it cost. It lets you compare products, campaigns or projects on one scale.",
    },
    {
        question: "What costs should I include?",
        answer: "Everything the investment needed: stock, shipping, fees, ads, and tools. The more complete the cost, the more honest the ROI.",
    },
    {
        question: "What is a good ROI for an online seller?",
        answer: "It depends on the time the money is tied up. A 30% return in two months on a product beats a 50% return that took a year, which the annualised figure shows.",
    },
    {
        question: "How is the annualised ROI calculated?",
        answer: "It converts the total return into a yearly rate using the period you enter, so short and long investments can be compared.",
    },
    {
        question: "What does the profit ratio mean?",
        answer: "Amount returned divided by amount invested. A ratio of 2.0 means you got back twice what you put in.",
    },
]

export default function RoiCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Return on Investment (ROI) Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <ROICalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <ROIHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <ROIGuide />
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
