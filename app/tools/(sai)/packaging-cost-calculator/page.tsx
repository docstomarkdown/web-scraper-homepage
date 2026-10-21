import { Metadata } from "next"
import { PackagingCostCalculator } from "./_components/PackagingCostCalculator"
import { PackagingHowToUse } from "./_components/PackagingHowToUse"
import { PackagingGuide } from "./_components/PackagingGuide"
import { PackagingCostOverview } from "./_components/PackagingCostOverview"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "Packaging Cost Calculator: Free Cost per Order",
    description: "Add up the box, padding, tape, label, inserts and the minutes it takes to pack, and see what packaging costs per order and per batch.",
    alternates: { canonical: "/tools/packaging-cost-calculator" },
}

const faqs = [
    {
        question: "What does cost per unit mean here?",
        answer: "The packaging cost of one order: all materials plus the labour to pack it. It does not include the shipping postage.",
    },
    {
        question: "How is the labour cost worked out?",
        answer: "Minutes to pack ÷ 60 × hourly wage. Three minutes at $20 an hour is $1.00 per order.",
    },
    {
        question: "Should I track labour if I pack orders myself?",
        answer: "Yes. It shows what you would pay someone else to do it and whether a packing service would cost more or less.",
    },
    {
        question: "What is a typical packaging cost?",
        answer: "Often $1 to $3 per order for small items in mailers, and $3 to $8 for boxed or fragile goods. Your own numbers matter more than the range.",
    },
    {
        question: "How does this help me price products?",
        answer: "Add the cost per order to your product cost before you set a price. Packaging is one of the costs sellers most often forget.",
    },
]

export default function PackagingCostCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Packaging Cost Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <PackagingCostCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <PackagingCostOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <PackagingHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <PackagingGuide />
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
