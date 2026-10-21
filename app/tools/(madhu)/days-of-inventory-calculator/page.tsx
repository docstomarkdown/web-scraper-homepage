import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { DaysOfInventoryCalculator } from "./_components/DaysOfInventoryCalculator"
import { DaysOfInventoryHowToUse } from "./_components/DaysOfInventoryHowToUse"
import { DaysOfInventoryGuide } from "./_components/DaysOfInventoryGuide"
import { DaysOfInventoryOverview } from "./_components/DaysOfInventoryOverview"
import { CTA } from "@/components/sections/CTA"
import { Lightbulb } from "lucide-react"
import { Metadata } from "next"
export const metadata: Metadata = {
    title: "Days of Inventory Calculator: Free Stock Runway",
    description: "Divide the stock you hold by the units you sell a day to see how many days of inventory remain, with and without your safety buffer.",
    alternates: { canonical: "/tools/days-of-inventory-calculator" },
}
export default function DaysOfInventoryCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Days of Inventory Remaining Calculator" />
                <div className="mb-20">
                    <DaysOfInventoryCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.1}>
                        <ToolSectionHeader 
                            title="What this calculator does"
                            icon={Lightbulb}
                        />
                        <DaysOfInventoryOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <DaysOfInventoryHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <DaysOfInventoryGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How do you calculate days of inventory remaining?",
                                    answer: "Divide the units in stock by the units sold a day. 5,000 units at 150 a day is 33 days.",
                                },
                                {
                                    question: "What is a safety buffer?",
                                    answer: "Stock you keep back for a demand spike or a late delivery. The calculator shows the days you can sell before you reach it.",
                                },
                                {
                                    question: "How many days of inventory should I keep?",
                                    answer: "At least your supplier's lead time plus a buffer. If lead time is 21 days, fewer than 21 days of stock means an order is already late.",
                                },
                                {
                                    question: "What's the difference between this and days sales of inventory?",
                                    answer: "Days sales of inventory (DSI) is an accounting ratio over a period. This calculator uses current stock and current daily sales for a forward-looking runway.",
                                },
                                {
                                    question: "Can I use weekly or monthly sales?",
                                    answer: "Yes. Pick the period that matches your report; the calculator converts it to a daily rate.",
                                },
                            ]}
                        />
                    </FadeIn>
                    <FadeIn delay={0.5}>
                        <CTA withSectionWrapper={false} />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
