import { Metadata } from "next"
import { MarginCalculator } from "./_components/MarginCalculator"
import { MarginHowToUse } from "./_components/MarginHowToUse"
import { MarginGuide } from "./_components/MarginGuide"
import { MarginOverview } from "./_components/MarginOverview"
import { FadeIn, RelatedProduct, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "Profit Margin Calculator: Margin and Markup",
    description: "Enter a selling price and a cost to see gross margin, markup and profit per unit, or set a target margin to find the price to charge or the most you can pay.",
    alternates: { canonical: "/tools/profit-margin-calculator" },
}

const faqs = [
    {
        question: "How do I calculate profit margin?",
        answer: "(Selling price − cost) ÷ selling price × 100. Buy for $50, sell for $100, and the margin is 50%.",
    },
    {
        question: "What is the difference between margin and markup?",
        answer: "Margin is profit as a share of the price; markup is profit as a share of the cost. For the same sale, markup is the larger number: a 40% margin is a 67% markup.",
    },
    {
        question: "What should I include in the cost?",
        answer: "Everything you pay to get one unit sold: the product, inbound shipping, packaging, marketplace and payment fees. Leaving fees out overstates the margin.",
    },
    {
        question: "How do I calculate gross margin?",
        answer: "Revenue minus cost of goods sold, divided by revenue. $10,000 of sales on $6,000 of cost is a 40% gross margin. Enter the two figures as the selling price and the cost.",
    },
    {
        question: "How do I price for a target margin?",
        answer: "Choose Find price, enter the cost and the margin you want, and the calculator gives the price: cost ÷ (1 − margin). The margin must be below 100%.",
    },
    {
        question: "How is tax handled?",
        answer: "If your price includes VAT or sales tax, enter the rate under advanced settings; the tax is taken out of the price before the margin. If tax is added on top at checkout, leave it blank, because it never was your money.",
    },
    {
        question: "What is a good profit margin?",
        answer: "There's no single figure; it depends on the category and on what's left after ads and overheads. Compare products and price points against each other with the same costs included.",
    },
]

export default function ProfitMarginCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Profit margin calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <MarginCalculator />
                </div>
                <div className="mb-16">
                    <RelatedProduct before="To price against competitors, collect their listings and prices into a spreadsheet with" linkText="Web Scraper Pro's product details and reviews" href="/product-scraper" after="." />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <MarginOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <MarginHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <MarginGuide />
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
