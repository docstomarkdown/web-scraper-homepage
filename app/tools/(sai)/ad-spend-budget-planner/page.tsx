import { Metadata } from "next";
import { AdBudgetCalculator } from "./_components/AdBudgetCalculator";
import { AdBudgetHowToUse } from "./_components/AdBudgetHowToUse";
import { AdBudgetGuide } from "./_components/AdBudgetGuide";
import { AdBudgetOverview } from "./_components/AdBudgetOverview";
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
    title: "Ad Budget Calculator: Free Spend Plan from a Revenue Goal",
    description: "Turn a monthly revenue goal and a target ROAS into the ad budget and daily spend you need, plus the clicks and orders it should bring.",
    alternates: { canonical: "/tools/ad-spend-budget-planner" },
};

export default function AdBudgetPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Ad Spend Budget Planner" direction="down" duration={0.6} />

                <div className="mb-20">
                    <AdBudgetCalculator />
                </div>

                <div className="max-w-5xl mx-auto space-y-16" id="tool-guide">
                    <FadeIn delay={0.2}>
                        <AdBudgetOverview />
                    </FadeIn>

                    <div id="how-to-use">
                        <FadeIn delay={0.2}>
                            <AdBudgetHowToUse />
                        </FadeIn>
                    </div>

                    <FadeIn delay={0.2}>
                        <AdBudgetGuide />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                    {
                                        question: "How do I calculate an ad budget from a revenue goal?",
                                        answer: "Divide the revenue you want by the ROAS you expect. A $20,000 goal at a 4× ROAS needs $5,000 of ad spend. Divide by 30 for a daily figure."
                                    },
                                    {
                                        question: "What ROAS should I target?",
                                        answer: "At least 1 divided by your profit margin before ads. With a 25% margin you need a 4× ROAS to break even, so target more than that to make money."
                                    },
                                    {
                                        question: "Where do I find my cost per click and conversion rate?",
                                        answer: "In your ad console's reports for the last 30 days: Google Ads, Amazon Ads, Meta Ads Manager and Shopify's marketing reports all show both. Use the campaign type you'll run."
                                    },
                                    {
                                        question: "Why are the estimated orders lower than I expected?",
                                        answer: "Orders equal clicks times the conversion rate, and the clicks are limited by the budget and the cost per click. A higher CPC or a lower conversion rate cuts the orders directly."
                                    },
                                    {
                                        question: "Does the planner include organic sales?",
                                        answer: "No. It plans paid traffic only. Organic and repeat sales come on top, which is why a plan that only breaks even on ads can still be worth running."
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

