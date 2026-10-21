import { Metadata } from 'next';
import { BundleProfitCalculator } from './_components/BundleProfitCalculator';
import { BundleHowToUse } from './_components/BundleHowToUse';
import { BundleGuide } from './_components/BundleGuide';
import { FadeIn, ToolFAQ, ToolPageTitle } from '@/app/tools/_shared/components';
import { CTA } from '@/components/sections/CTA';
export const metadata: Metadata = {
    title: "Bundle Profit Calculator: Free Margin for a Product Bundle",
    description: "Add the products in a bundle with their cost and selling price, apply a percentage discount or set a fixed bundle price, and see the bundle's profit and margin.",
    alternates: { canonical: "/tools/bundle-profit-calculator" },
};
const faqs = [
    {
        question: "How do I calculate the profit of a product bundle?",
        answer: "Add up the products' costs and the bundle's selling price, then subtract. A bundle that sells for $28 and costs $13 to supply makes $15, a 53.6% margin."
    },
    {
        question: "Should I bundle with a percentage discount or a fixed price?",
        answer: "A percentage reads well in promotions (\"20% off the set\"); a fixed price is simpler to show (\"3 for $50\"). The calculator takes either, so set the one you'd advertise and check the margin."
    },
    {
        question: "How much discount can a bundle take?",
        answer: "As much as leaves the margin you need. Compare the bundle's margin with the products' own margins, and remember the bundle also saves on shipping and marketing per item."
    },
    {
        question: "Does bundling raise average order value?",
        answer: "Usually, because a customer who would have bought one item buys the set. That's the main reason to bundle, together with moving slow stock alongside a popular item."
    },
    {
        question: "Can I include more than two products?",
        answer: "Yes. Add Another Product adds a row; remove one with the bin icon next to it."
    },
    {
        question: "Is this calculator free?",
        answer: "Yes. It runs in your browser, needs no sign-up and stores nothing you type."
    }
];
export default function BundleCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Bundle Profit Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <BundleProfitCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}><BundleHowToUse /></FadeIn>
                    <FadeIn delay={0.2}><BundleGuide /></FadeIn>
                    <FadeIn delay={0.2}><ToolFAQ faqs={faqs} /></FadeIn>
                    <FadeIn delay={0.2}><CTA /></FadeIn>
                </div>
            </div>
        </div>
    );
}
