import { Metadata } from "next"
import { StorageFeeCalculator } from "./_components/StorageFeeCalculator"
import { StorageFeeOverview } from "./_components/StorageFeeOverview"
import { StorageFeeGuide } from "./_components/StorageFeeGuide"
import { StorageFeeHowToUse } from "./_components/StorageFeeHowToUse"
import { ToolPageTitle, FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: "Amazon Storage Fee Calculator: Free FBA Inventory Cost",
    description: "Estimate Amazon's monthly FBA storage fee from box size, units and months stored, with the peak-season rate and the long-term surcharge included.",
    alternates: { canonical: "/tools/amazon-storage-fee-calculator" },
}
export default function AmazonStorageFeeCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Amazon Storage Fee Calculator" />
                <div className="mb-20">
                    <StorageFeeCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16" id="storage-guide">
                    <FadeIn delay={0.2}>
                        <StorageFeeOverview />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <StorageFeeHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <StorageFeeGuide />
                    </FadeIn>
                    <FadeIn delay={0.5}>
                        <ToolFAQ
                            faqs={[
                                    {
                                        question: "How are Amazon FBA storage fees calculated?",
                                        answer: "By volume: the cubic feet your units take, times a monthly rate that depends on the season and whether the item is standard-size or oversize. Units that stay more than six months pay a long-term surcharge on top."
                                    },
                                    {
                                        question: "What is the peak-season rate?",
                                        answer: "From October to December, standard-size storage costs $2.40 per cubic foot a month instead of $0.87, and oversize $1.40 instead of $0.56, in the rate card this calculator uses."
                                    },
                                    {
                                        question: "What counts as oversize?",
                                        answer: "Anything that goes over the standard-size limits on any side or in weight. Leave the size tier on automatic and the calculator decides from the dimensions you enter."
                                    },
                                    {
                                        question: "How do I cut storage fees?",
                                        answer: "Keep fewer units in stock before the fourth quarter, send in smaller lots more often, and remove or discount units before they hit six months; the removal-versus-disposal calculator on this site helps with that choice."
                                    },
                                    {
                                        question: "Does this include the fulfilment fee?",
                                        answer: "No. This is storage only. The Amazon FBA fee calculator on this site estimates the per-order fulfilment and referral fees."
                                    },
                                    {
                                        question: "Is this calculator free?",
                                        answer: "Yes. It runs in your browser, needs no sign-up and stores nothing you type."
                                    }
                                ]}
                        />
                    </FadeIn>
                    <FadeIn delay={0.6}>
                        <CTA withSectionWrapper={false} />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}