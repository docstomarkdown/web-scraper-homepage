"use client"
import React, { useState, useEffect } from "react"
import { podProfit } from "./calc"
import { Card, CardContent } from "@/components/ui/card"
import { Tag, DollarSign, Percent, Package } from "lucide-react"
import { CalculatorCardHeader, CalculatorInput, FadeIn, ResultSummaryCard } from "@/app/tools/_shared/components"
import { PODProfitBreakdown } from "./PODProfitBreakdown"

export function PODProfitCalculator() {
    const [currency, setCurrency] = useState("USD")
    
    // Revenue Inputs
    const [itemPrice, setItemPrice] = useState<number | "">("")
    const [shippingCharged, setShippingCharged] = useState<number | "">("")
    
    // Cost Inputs
    const [productCost, setProductCost] = useState<number | "">("") 
    const [shippingCost, setShippingCost] = useState<number | "">("") 
    
    // Fees
    const [transactionFeePercent, setTransactionFeePercent] = useState<number | "">("")
    const [paymentProcessingPercent, setPaymentProcessingPercent] = useState<number | "">("")
    const [fixedProcessingFee, setFixedProcessingFee] = useState<number | "">("")
    const [platformFeePercent, setPlatformFeePercent] = useState<number | "">("")
    const [offsiteAdsPercent, setOffsiteAdsPercent] = useState<number | "">("")
    const [listingFee, setListingFee] = useState<number | "">(0.2)

    useEffect(() => {
        if (transactionFeePercent === "") setTransactionFeePercent(6.5)
        if (paymentProcessingPercent === "") setPaymentProcessingPercent(3)
        if (fixedProcessingFee === "") setFixedProcessingFee(0.25)
    }, [])

    const handleReset = () => {
        setItemPrice("")
        setShippingCharged("")
        setProductCost("")
        setShippingCost("")
        setTransactionFeePercent(6.5)
        setPaymentProcessingPercent(3)
        setFixedProcessingFee(0.25)
        setPlatformFeePercent("")
        setOffsiteAdsPercent("")
        setListingFee(0.2)
    }

    const result = podProfit({
        itemPrice: Number(itemPrice) || 0,
        shippingCharged: Number(shippingCharged) || 0,
        productCost: Number(productCost) || 0,
        shippingCost: Number(shippingCost) || 0,
        transactionPercent: Number(transactionFeePercent) || 0,
        paymentPercent: Number(paymentProcessingPercent) || 0,
        paymentFixed: Number(fixedProcessingFee) || 0,
        listingFee: Number(listingFee) || 0,
        platformPercent: Number(platformFeePercent) || 0,
        offsiteAdsPercent: Number(offsiteAdsPercent) || 0,
    })
    const totalRevenue = result?.revenue ?? 0
    const totalCosts = result?.totalCosts ?? 0
    const totalFees = result?.totalFees ?? 0
    const netProfit = result?.netProfit ?? 0
    const margin = result?.margin ?? 0
    const isUSD = currency === "USD"

    // Shipping charged can stay blank (free shipping); the price, product cost and provider shipping are needed.
    const isValid = result !== null && productCost !== "" && shippingCost !== "" && transactionFeePercent !== "" && paymentProcessingPercent !== ""

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-3">
                    <Card className="border border-slate-200 shadow-sm bg-white dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            description="Enter your POD product costs, sale price, and platform fees."
                            onReset={handleReset}
                            guideId="pod-profit-guide"
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />

                        <CardContent className="p-4 md:p-6 pb-10 md:pb-14 space-y-3 flex flex-col">
                            <div className="space-y-6 max-w-[520px] mx-auto w-full">
                                {/* Revenue */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        hideSeparator={true}
                                        groupingTitle="Revenue"
                                        groupingIcon={Tag}
                                        label="Item Price"
                                        value={itemPrice}
                                        onChange={setItemPrice}
                                        placeholder="25.00"
                                        max={100000}
                                        step={0.01}
                                        tooltip="Your product's final selling price."
                                        isCurrency
                                        currency={currency}
                                        autoFocus
                                    />
                                    <CalculatorInput
                                        label="Shipping Charged to Customer"
                                        value={shippingCharged}
                                        onChange={setShippingCharged}
                                        placeholder="5.00"
                                        max={100000}
                                        step={0.01}
                                        tooltip="What the customer pays you for shipping. Leave it blank if you offer free shipping."
                                        isCurrency
                                        currency={currency}
                                        isOptional
                                    />
                                </div>

                                {/* Costs */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        groupingTitle="Costs"
                                        groupingIcon={Package}
                                        label="Product Cost"
                                        value={productCost}
                                        onChange={setProductCost}
                                        placeholder="10.00"
                                        max={100000}
                                        step={0.01}
                                        tooltip="The base cost to manufacture or print the product."
                                        isCurrency
                                        currency={currency}
                                    />
                                    <CalculatorInput
                                        label="Shipping Cost"
                                        value={shippingCost}
                                        onChange={setShippingCost}
                                        placeholder="4.50"
                                        max={100000}
                                        step={0.01}
                                        tooltip="What your POD supplier charges you to ship the item."
                                        isCurrency
                                        currency={currency}
                                    />
                                </div>

                                {/* Fees */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        groupingTitle="Fees"
                                        groupingIcon={Percent}
                                        label="Transaction Fee"
                                        value={transactionFeePercent}
                                        onChange={setTransactionFeePercent}
                                        placeholder="6.5"
                                        suffix="%"
                                        step={0.1}
                                        min={0}
                                        max={100}
                                        tooltip="Fee applied per transaction, common on Etsy (6.5%) or similar marketplace."
                                        hint={transactionFeePercent === 6.5 ? "Etsy's transaction fee" : undefined}
                                        ignoreChecklist={true}
                                    />
                                    <CalculatorInput
                                        label="Payment Processing"
                                        value={paymentProcessingPercent}
                                        onChange={setPaymentProcessingPercent}
                                        placeholder="3"
                                        suffix="%"
                                        step={0.1}
                                        min={0}
                                        max={100}
                                        tooltip="A percentage taken by the payment processor (like Stripe/PayPal)."
                                        hint={paymentProcessingPercent === 3 ? "Etsy's US payment processing rate" : undefined}
                                        ignoreChecklist={true}
                                    />
                                    <CalculatorInput
                                        label="Fixed Processing Fee"
                                        value={fixedProcessingFee}
                                        onChange={setFixedProcessingFee}
                                        placeholder="0.25"
                                        step={0.01}
                                        min={0}
                                        max={1000}
                                        tooltip="A flat fee commonly charged per transaction by payment processors."
                                        isCurrency
                                        currency={currency}
                                        isOptional
                                        hint={fixedProcessingFee === 0.25 && isUSD ? "Etsy's US fixed fee, $0.25" : undefined}
                                    />
                                    <CalculatorInput
                                        label="Listing Fee"
                                        value={listingFee}
                                        onChange={setListingFee}
                                        placeholder="0.20"
                                        step={0.01}
                                        min={0}
                                        max={1000}
                                        tooltip="A fixed fee per listing. Etsy charges $0.20 to list an item and renews the listing for another $0.20 when it sells; set it to 0 for platforms without one."
                                        isCurrency
                                        currency={currency}
                                        isOptional
                                        hint={listingFee === 0.2 && isUSD ? "Etsy's listing fee, $0.20" : undefined}
                                    />
                                    <CalculatorInput
                                        label="Platform Fee"
                                        value={platformFeePercent}
                                        onChange={setPlatformFeePercent}
                                        placeholder="0"
                                        suffix="%"
                                        step={0.1}
                                        min={0}
                                        max={100}
                                        tooltip="Any extra listing, final value, or generic platform fee not already covered."
                                        isOptional
                                    />
                                    <CalculatorInput
                                        label="Offsite Ads"
                                        value={offsiteAdsPercent}
                                        onChange={setOffsiteAdsPercent}
                                        placeholder="0"
                                        suffix="%"
                                        step={0.1}
                                        min={0}
                                        max={100}
                                        tooltip="Etsy or other platform fees for sales generated through their offsite ads program (often 12-15%)."
                                        isOptional
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultSummaryCard
                        isCalculated={isValid}
                        currency={currency}
                        emptyMessage="POD profit"
                        profitLossKey="netProfit"
                        liveBadgeText={
                            isValid
                                ? netProfit > 0 ? "Profitable"
                                : netProfit === 0 ? "Break Even"
                                : "Unprofitable"
                                : "Draft"
                        }
                        liveBadgeColor={
                            isValid
                                ? netProfit > 0 ? "emerald"
                                : netProfit === 0 ? "amber"
                                : "rose"
                                : "slate"
                        }
                        dynamicMessages={{
                            positive: `You keep ${margin.toFixed(1)}% of total revenue as net profit.`,
                            negative: `Your POD costs and fees exceed your total revenue.`,
                            neutral: "You broke even. Your revenues match your costs exactly."
                        }}
                        primaryResult={{
                            value: netProfit,
                            label: "Net Profit (You Earn)",
                            isCurrency: true,
                            key: "netProfit"
                        }}
                        secondaryResults={[
                            {
                                key: "margin",
                                label: "Profit Margin",
                                value: margin.toFixed(1),
                                unit: "%",
                                icon: Percent,
                                tooltip: "Your net profit represented as a percentage of your total gross revenue."
                            },
                            {
                                key: "totalCosts",
                                label: "Total Costs",
                                value: totalCosts,
                                isCurrency: true,
                                icon: DollarSign,
                                tooltip: "The base product cost, your provider's shipping and all fees together."
                            },
                            {
                                key: "totalFees",
                                label: "Total Fees",
                                value: totalFees,
                                isCurrency: true,
                                icon: DollarSign,
                                tooltip: "The sum of the transaction, processing and listing fees and any platform or offsite ads fee."
                            }
                        ]}
                        checklistItems={[
                            { key: "item", label: "Item Price", isComplete: itemPrice !== "" },
                            { key: "pcost", label: "Product Cost", isComplete: productCost !== "" },
                            { key: "scost", label: "Shipping Cost", isComplete: shippingCost !== "" }
                        ]}
                    >
                    </ResultSummaryCard>
                    
                    <div className="mt-4">
                        <PODProfitBreakdown
                            netProfit={netProfit}
                            platformFee={(result?.platformFee ?? 0) + (result?.listingFee ?? 0)}
                            transactionFee={result?.transactionFee ?? 0}
                            paymentProcessingFee={result?.paymentFee ?? 0}
                            offsiteAdFee={result?.offsiteAdsFee ?? 0}
                            productCost={Number(productCost) || 0}
                            shippingCost={Number(shippingCost) || 0}
                            totalRevenue={totalRevenue}
                            currency={currency}
                        />
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}
