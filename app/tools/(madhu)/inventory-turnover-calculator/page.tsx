import { Lightbulb } from "lucide-react"
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { InventoryTurnoverCalculator } from "./_components/InventoryTurnoverCalculator"
import { InventoryTurnoverOverview } from "./_components/InventoryTurnoverOverview"
import { InventoryTurnoverHowToUse } from "./_components/InventoryTurnoverHowToUse"
import { InventoryTurnoverGuide } from "./_components/InventoryTurnoverGuide"
import { CTA } from "@/components/sections/CTA"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Inventory Turnover Calculator: Turnover Ratio and DSI",
    description: "Divide cost of goods sold by average inventory to get the turnover ratio and days sales of inventory for any period, or see how many days of inventory your current stock covers.",
    alternates: { canonical: "/tools/inventory-turnover-calculator" },
}

export default function InventoryTurnoverCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle
                    title="Inventory turnover calculator"
                />
                <div className="mb-20">
                    <InventoryTurnoverCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.15}>
                        <ToolSectionHeader title="What this calculator does" icon={Lightbulb} />
                        <InventoryTurnoverOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <InventoryTurnoverHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <InventoryTurnoverGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How do you calculate inventory turnover?",
                                    answer: "Cost of goods sold divided by average inventory, where average inventory is opening plus closing divided by two.",
                                },
                                {
                                    question: "What is a good inventory turnover ratio?",
                                    answer: "It depends on the category. Fast-moving goods turn 10 times or more a year; slow, high-value goods may turn 2 to 4. Watch your own trend.",
                                },
                                {
                                    question: "What is days sales of inventory?",
                                    answer: "The average days it takes to sell your stock: the period's days divided by the turnover ratio.",
                                },
                                {
                                    question: "How do I work out days of inventory remaining?",
                                    answer: "Switch to Days of stock left and divide the units in stock by the units sold a day. 5,000 units at 150 a day is 33 days. With a 500-unit buffer, the usable runway is 30 days.",
                                },
                                {
                                    question: "What's the difference between days of inventory remaining and days sales of inventory?",
                                    answer: "Days sales of inventory (DSI) is an accounting ratio over a past period. Days of stock left uses current stock and your current sales rate, so it looks forward.",
                                },
                                {
                                    question: "Can I use weekly or monthly sales?",
                                    answer: "Yes. Enter the units sold and the number of days they cover, such as 7 for a week or 31 for a 31-day month. The calculator turns it into a daily rate.",
                                },
                                {
                                    question: "Should I use sales or cost of goods sold?",
                                    answer: "Cost of goods sold, because inventory is valued at cost. Using sales inflates the ratio.",
                                },
                                {
                                    question: "Why is my ratio lower than last quarter?",
                                    answer: "Either sales slowed or stock grew. Check closing inventory first; a big purchase near the end of the period lowers the ratio.",
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
