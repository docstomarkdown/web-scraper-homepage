import { Metadata } from "next";
import { FadeIn } from "@/app/tools/_shared/components/FadeIn";
import { ToolFAQ } from "@/app/tools/_shared/components/ToolFAQ";
import { ToolPageTitle } from "@/app/tools/_shared/components/ToolPageTitle";
import { CTA } from "@/components/sections/CTA";
import { DimWeightCalculator } from "./_components/DimWeightCalculator";
import { DimWeightHowToUse } from "./_components/DimWeightHowToUse";
import { DimWeightGuide } from "./_components/DimWeightGuide";
import { DimWeightOverview } from "./_components/DimWeightOverview";

export const metadata: Metadata = {
    title: "Dimensional Weight Calculator: Free Billable Shipping Weight",
    description: "Enter a parcel's length, width, height and weight to get its dimensional weight at your carrier's divisor and the billable weight you pay for.",
    alternates: { canonical: "/tools/dimensional-weight-calculator" },
};

export default function Page() {
    const faqs = [
    {
        question: "How is dimensional weight calculated?",
        answer: "Multiply the box's length, width and height, then divide by the carrier's divisor and round up. 20 × 16 × 12 inches is 3,840 cubic inches; divided by 139 that's 28 lb."
    },
    {
        question: "What is billable weight?",
        answer: "The higher of the actual weight and the dimensional weight. If a 10 lb parcel has a 28 lb dimensional weight, you pay for 28 lb."
    },
    {
        question: "What divisor should I use?",
        answer: "139 for UPS and FedEx daily rates in the US, 166 for USPS and some retail rates, 5,000 for most carriers that use centimetres and kilograms. Your carrier's rate sheet states it."
    },
    {
        question: "Why do carriers use dimensional weight?",
        answer: "A truck fills up by volume before it reaches its weight limit, so a big light box costs the carrier as much space as a heavy one."
    },
    {
        question: "How do I avoid paying for air?",
        answer: "Pack in the smallest box that protects the item, and keep box sizes under the carrier's thresholds. Halving the volume halves the dimensional weight."
    },
    {
        question: "Is this calculator free?",
        answer: "Yes. It runs in your browser, needs no sign-up and stores nothing you type."
    }
];

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Dimensional Weight Calculator" direction="down" duration={0.6} />
                
                <div className="mb-20">
                    <FadeIn delay={0.1}>
                        <DimWeightCalculator />
                    </FadeIn>
                </div>
                
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.1}>
                        <DimWeightOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <DimWeightHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <DimWeightGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ faqs={faqs} />
                    </FadeIn>
                </div>
                <FadeIn delay={0.5}>
                    <div className="mt-20">
                        <CTA />
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
