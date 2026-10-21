import { Metadata } from "next"
import { MOQCalculator } from "./_components/MOQCalculator"
import { MOQHowToUse } from "./_components/MOQHowToUse"
import { MOQGuide } from "./_components/MOQGuide"
import { MOQOverview } from "./_components/MOQOverview"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "MOQ Cost Calculator: Free Order Investment Check",
    description: "Work out what a supplier's minimum order costs in total, the landed cost per unit, and how many months of stock it gives you at your sales rate.",
    alternates: { canonical: "/tools/moq-cost-calculator" },
}

const faqs = [
    {
        question: "What is a minimum order quantity?",
        answer: "The smallest number of units a supplier will sell in one order. It covers their setup costs, so it is often negotiable.",
    },
    {
        question: "How is landed cost per unit different from cost per unit?",
        answer: "Cost per unit is the supplier's price. Landed cost per unit adds the shipping and other costs for the order, divided by the number of units.",
    },
    {
        question: "What should I include in other costs?",
        answer: "Anything tied to the order that isn't the product or the freight: customs duties, inspection fees, bank wire charges, and samples.",
    },
    {
        question: "Should I order more to get a lower unit price?",
        answer: "Only if you can sell it in a reasonable time. A lower unit price is lost to storage fees and tied-up cash when the order covers more than six months of sales.",
    },
    {
        question: "What is a healthy inventory coverage?",
        answer: "Three to four months for most products. It leaves room for a late shipment or a strong month without paying to store stock for half a year.",
    },
]

export default function MoqCostCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Minimum Order Quantity (MOQ) Cost Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <MOQCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <MOQOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <MOQHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <MOQGuide />
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
