import { Metadata } from "next"
import { MercariFeeCalculator } from "./_components/MercariFeeCalculator"
import { MercariFeeHowToUse } from "./_components/MercariFeeHowToUse"
import { MercariFeeGuide } from "./_components/MercariFeeGuide"
import { MercariFeeOverview } from "./_components/MercariFeeOverview"
import { FadeIn, RelatedProduct, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "Mercari Fee Calculator: Profit After Fees",
    description: "See what you keep from a Mercari sale after the 10% selling fee on the item price and buyer-paid shipping, with your item cost and shipping taken out.",
    alternates: { canonical: "/tools/mercari-fee-calculator" },
}

const faqs = [
    {
        question: "What do I need to enter?",
        answer: "At least the sale price and the item cost. Add shipping and packaging for an exact figure. Items sold multiplies the result for a batch of identical items.",
    },
    {
        question: "Does Mercari charge a listing fee?",
        answer: "No. Listing is free; you pay fees only when an item sells.",
    },
    {
        question: "Does Mercari still charge a payment processing fee?",
        answer: "Not to sellers. Since 6 January 2025 Mercari charges a 10% selling fee on the item price plus buyer-paid shipping, and no separate payment fee.",
    },
    {
        question: "Should I include shipping?",
        answer: "Enter the label cost if you pay it. If the buyer pays shipping, enter that amount under Shipping the Buyer Pays, because Mercari's 10% applies to it too.",
    },
    {
        question: "What is a good margin on Mercari?",
        answer: "There's no single figure. It depends on how much time each listing takes and how fast the item sells. Compare the profit shown here with the time you spend sourcing, listing and shipping the item.",
    },
    {
        question: "Are these fees exact?",
        answer: "They follow Mercari's published rates for US sellers at the time of writing. Check Mercari's fee page before you rely on a figure, because rates change.",
    },
]

export default function MercariFeeCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Mercari fee calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <MercariFeeCalculator />
                </div>
                <div className="mb-16">
                    <RelatedProduct before="To price against competitors, collect their listings and prices into a spreadsheet with" linkText="Web Scraper Pro's product details and reviews" href="/product-scraper" after="." />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <MercariFeeOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <MercariFeeHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <MercariFeeGuide />
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
