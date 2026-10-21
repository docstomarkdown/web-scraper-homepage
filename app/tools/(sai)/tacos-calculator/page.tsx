import { Metadata } from "next"
import { TACoSCalculator } from "./_components/TACoSCalculator"
import { TACoSHowToUse } from "./_components/TACoSHowToUse"
import { TACoSGuide } from "./_components/TACoSGuide"
import { TACoSOverview } from "./_components/TACoSOverview"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "TACoS Calculator: Free Ad Spend to Total Sales",
    description: "Divide your ad spend by all your sales, organic and paid, to get TACoS, and see the margin left after ads from your gross margin.",
    alternates: { canonical: "/tools/tacos-calculator" },
}

const faqs = [
    {
        question: "What is TACoS?",
        answer: "Total advertising cost of sales: ad spend as a share of all your revenue, paid and organic. It shows how dependent the whole business is on ads.",
    },
    {
        question: "What is a good TACoS?",
        answer: "It depends on your margin. A TACoS below 30% of your gross margin leaves most of the profit; many established brands run 5% to 15%.",
    },
    {
        question: "How does TACoS differ from ACoS?",
        answer: "ACoS measures one campaign's efficiency against the sales it produced. TACoS measures ad spend against everything you sold.",
    },
    {
        question: "Why is my TACoS rising?",
        answer: "Either ad spend grew faster than sales, or organic sales fell. Check the two separately before cutting the budget.",
    },
    {
        question: "How often should I check it?",
        answer: "Monthly, and after any big change in ad budget or ranking. Day-to-day swings say little.",
    },
]

export default function TacosCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Total Advertising Cost of Sales (TACoS) Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <TACoSCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <TACoSOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <TACoSHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <TACoSGuide />
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
