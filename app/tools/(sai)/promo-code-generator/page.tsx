import { Metadata } from "next"
import { PromoCodeCalculator } from "./_components/PromoCodeCalculator"
import { PromoCodeHowToUse } from "./_components/PromoCodeHowToUse"
import { PromoCodeGuide } from "./_components/PromoCodeGuide"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "Promo Code Generator: Random Discount Codes",
    description: "Make a batch of random discount codes with your own prefix or suffix, a length you choose, and letters, numbers or symbols, ready to paste into your store.",
    alternates: { canonical: "/tools/promo-code-generator" },
}

const faqs = [
    {
        question: "How many codes can I make at once?",
        answer: "Up to 50 per batch. Run it again for more; each batch is random, so check a new batch against codes you already use.",
    },
    {
        question: "Where can I use the codes?",
        answer: "In any store that accepts custom discount codes: Shopify, WooCommerce, Etsy, Amazon and most others. Paste them into the store's discount or coupon settings.",
    },
    {
        question: "Do the prefix and suffix affect the randomness?",
        answer: "No. The random part comes from your browser's cryptographic random generator; the prefix and suffix are added around it exactly as you typed them.",
    },
    {
        question: "Are the codes unique?",
        answer: "Yes, within a batch: the generator never repeats a code. If the length and characters you chose allow fewer codes than you asked for, such as 1 character, it makes every possible code once and tells you.",
    },
]

export default function PromoCodeGeneratorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Promo code generator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <PromoCodeCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <PromoCodeHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <PromoCodeGuide />
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
