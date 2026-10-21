import { Metadata } from "next"
import EtsyPageContent from "./_components/EtsyPageContent"

export const metadata: Metadata = {
    title: 'Etsy Fee Calculator - Calculate Transaction & Listing Fees',
    description: 'Calculate your exact Etsy fees and net profit. Includes listing fees, transaction fees (6.5%), payment processing, and Offsite Ads calculations.',
    alternates: { canonical: "/tools/etsy-fee-calculator" },
}

export default function EtsyFeeCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <EtsyPageContent />
        </div>
    )
}