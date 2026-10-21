import { Lightbulb } from "lucide-react"
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { InventoryTurnoverCalculator } from "./_components/InventoryTurnoverCalculator"
import { InventoryTurnoverOverview } from "./_components/InventoryTurnoverOverview"
import { InventoryTurnoverHowToUse } from "./_components/InventoryTurnoverHowToUse"
import { InventoryTurnoverGuide } from "./_components/InventoryTurnoverGuide"
import { CTA } from "@/components/sections/CTA"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Inventory Turnover Calculator: Free Turnover Ratio and DSI",
    description: "Divide cost of goods sold by average inventory to get the turnover ratio, and the days it takes to sell through stock, for any period.",
    alternates: { canonical: "/tools/inventory-turnover-calculator" },
}

export default function InventoryTurnoverCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle
                    title="Inventory Turnover Ratio Calculator"
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
