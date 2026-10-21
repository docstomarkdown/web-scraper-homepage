import { Metadata } from "next";
import { CLVCalculator } from "./_components/CLVCalculator";
import { CLVHowToUse } from "./_components/CLVHowToUse";
import { CLVGuide } from "./_components/CLVGuide";
import { CLVOverview } from "./_components/CLVOverview";
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
    title: "Customer Lifetime Value Calculator: Free CLV and LTV to CAC",
    description: "Multiply order value, purchases a year and lifespan for lifetime revenue, then add margin and acquisition cost for profit and the LTV to CAC ratio.",
    alternates: { canonical: "/tools/customer-lifetime-value-calculator" },
};

export default function CLVPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Customer Lifetime Value Calculator" direction="down" duration={0.6} />

                <CLVCalculator />

                <div className="max-w-4xl mx-auto mt-20 space-y-16">

                    {/* Tool Overview */}
                    <FadeIn delay={0.1}>
                        <CLVOverview />
                    </FadeIn>

                    {/* How to Use */}
                    <div id="how-to-use">
                        <FadeIn delay={0.15}>
                            <CLVHowToUse />
                        </FadeIn>
                    </div>

                    {/* Strategy Guide */}
                    <FadeIn delay={0.2}>
                        <CLVGuide />
                    </FadeIn>

                    {/* FAQ — Ordered from foundational → strategic → advanced */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                    {
                                        question: "How do I calculate customer lifetime value?",
                                        answer: "Multiply the average order value by the number of orders a customer places a year and by the years they stay. $60 × 4 × 3 is $720. Multiply by your gross margin for lifetime profit."
                                    },
                                    {
                                        question: "What is a good LTV to CAC ratio?",
                                        answer: "Three to one or better: a customer should bring about three times the profit it cost to win them. Below one to one you lose money on every customer; far above three suggests you could spend more on growth."
                                    },
                                    {
                                        question: "How do I estimate customer lifespan?",
                                        answer: "Look at how long your repeat customers have been ordering, or divide one by your yearly churn rate: 25% churn is a four-year lifespan. If you don't know, start with one to three years."
                                    },
                                    {
                                        question: "Why does lifetime profit only appear with a margin?",
                                        answer: "Without a margin the calculator can only show revenue. The margin removes the cost of the goods and shows what you keep."
                                    },
                                    {
                                        question: "How do I increase customer lifetime value?",
                                        answer: "Raise order value with bundles and add-ons, raise frequency with email and loyalty programmes, and extend the lifespan with good service and products that need replacing or refilling."
                                    },
                                    {
                                        question: "What does the breakdown chart show?",
                                        answer: "Lifetime revenue split into the cost of goods, the acquisition cost if you entered one, and the profit left."
                                    },
                                    {
                                        question: "Is this calculator free?",
                                        answer: "Yes. It runs in your browser, needs no sign-up and stores nothing you type."
                                    }
                                ]}
                        />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}