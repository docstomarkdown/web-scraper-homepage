import { Metadata } from "next"
import EtsyPageContent from "./_components/EtsyPageContent"

export const metadata: Metadata = {
    title: "Etsy Fee Calculator: Free Listing, Transaction and Ads Fees",
    description: "Enter the item price, shipping charged and your costs to see Etsy's listing, transaction, payment and offsite ads fees, plus profit and margin.",
    alternates: { canonical: "/tools/etsy-fee-calculator" },
}

export default function EtsyFeeCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <EtsyPageContent />
        </div>
    )
}