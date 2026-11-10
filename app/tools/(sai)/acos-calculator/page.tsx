import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { ACoSCalculator } from "./_components/ACoSCalculator"
import { ACoSHowToUse } from "./_components/ACoSHowToUse"
import { ACoSGuide } from "./_components/ACoSGuide"
import { ACoSOverview } from "./_components/ACoSOverview"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "ACoS Calculator: Advertising Cost of Sales and Profit",
    description: "Enter ad spend, ad revenue and your profit margin to get ACoS, ROAS, net profit after ads and break-even ACoS. Add total sales to get TACoS.",
    alternates: { canonical: "/tools/acos-calculator" },
}

export default function ACoSCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="ACoS calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <ACoSCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16" id="tool-guide">
                    <FadeIn delay={0.2}>

                        <ACoSOverview />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <ACoSHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ACoSGuide />
                    </FadeIn>
                    <FadeIn delay={0.5}>
                        <ToolFAQ
                            faqs={[
                                    {
                                        question: "What is ACoS?",
                                        answer: "Advertising cost of sales: ad spend divided by the revenue those ads produced, as a percentage. A $500 spend that brought $2,000 in sales is a 25% ACoS."
                                    },
                                    {
                                        question: "What is a good ACoS?",
                                        answer: "Anything below your profit margin before ads. If your margin is 30%, a 25% ACoS leaves 5% of each ad sale as profit; a 35% ACoS loses money on every ad sale. There's no universal number."
                                    },
                                    {
                                        question: "How is ACoS different from ROAS?",
                                        answer: "They're the same ratio turned around. ACoS is spend ÷ revenue; ROAS is revenue ÷ spend. A 20% ACoS is a 5× ROAS."
                                    },
                                    {
                                        question: "What is break-even ACoS?",
                                        answer: "Your profit margin before ads. At that ACoS, the ads cost exactly what they earn; the calculator shows it next to your actual ACoS when you enter a margin."
                                    },
                                    {
                                        question: "What is TACoS?",
                                        answer: "Total advertising cost of sales: ad spend divided by all your sales for the period, from ads and organic. Enter Total Revenue and the calculator shows TACoS and the margin left after ads across all sales."
                                    },
                                    {
                                        question: "How does TACoS differ from ACoS?",
                                        answer: "ACoS divides ad spend by the sales the ads produced. TACoS divides it by everything you sold. TACoS falling while sales grow means organic sales are carrying more of the business."
                                    },
                                    {
                                        question: "Why is my TACoS rising?",
                                        answer: "Either ad spend grew faster than sales, or organic sales fell. Check the two separately before cutting the budget."
                                    },
                                    {
                                        question: "Does this work for Amazon PPC only?",
                                        answer: "The formula is the same for any platform that reports spend and attributed revenue: Amazon, Google, Meta or Shopify's own ads."
                                    },
                                    {
                                        question: "Is this calculator free?",
                                        answer: "Yes. It runs in your browser, needs no sign-up and stores nothing you type."
                                    }
                                ]}
                        />
                    </FadeIn>
                    <FadeIn delay={0.6}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
