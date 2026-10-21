import { Metadata } from "next"
import { ReorderCalculator } from "./_components/ReorderCalculator"
import { ReorderHowToUse } from "./_components/ReorderHowToUse"
import { ReorderGuide } from "./_components/ReorderGuide"
import { ReorderOverview } from "./_components/ReorderOverview"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "Reorder Point Calculator: Free Restock Trigger",
    description: "Work out the stock level at which to reorder, from your daily sales, supplier lead time and safety buffer, and see how many days you have left.",
    alternates: { canonical: "/tools/inventory-reorder-calculator" },
}

const faqs = [
    {
        question: "What is a reorder point?",
        answer: "The reorder point is the stock level at which you place a new order so the shipment arrives before you run out. It covers the units you sell during the supplier's lead time, plus a safety buffer.",
    },
    {
        question: "How many days of safety stock should I hold?",
        answer: "Hold more when your supplier is late often or your sales swing. Seven to fourteen days is a common range for a steady seller; use the Safety Stock Calculator for a figure based on your worst-case numbers.",
    },
    {
        question: "What do I enter as daily sales?",
        answer: "Your average units sold per day over the last 30 to 90 days. For a seasonal product, use the average for the season you're ordering for.",
    },
    {
        question: "What does Days until reorder mean?",
        answer: "It is (current stock − reorder point) ÷ daily sales. Zero or a negative number means you should order today.",
    },
    {
        question: "Does the calculator work for every product?",
        answer: "Yes, for any physical product with a lead time. It assumes sales stay close to the average you enter, so recheck the numbers after a promotion or a price change.",
    },
]

export default function InventoryReorderCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Inventory Reorder Point Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <ReorderCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <ReorderOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <ReorderHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <ReorderGuide />
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
