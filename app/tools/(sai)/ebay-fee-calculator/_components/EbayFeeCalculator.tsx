"use client"
import { EBAY } from "@/app/tools/_data/feeRates";
import { RatesChecked } from "@/app/tools/_shared/components";
import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tag, DollarSign, Percent } from "lucide-react"
import { CalculatorCardHeader, CalculatorInput, FadeIn, ResultSummaryCard } from "@/app/tools/_shared/components"
import { EbayFeeBreakdown } from "./EbayFeeBreakdown"
import { ebayFees } from "./calc"

export function EbayFeeCalculator() {
    const [currency, setCurrency] = useState("USD")
    
    // Revenue
    const [soldPrice, setSoldPrice] = useState<number | "">("")
    const [shippingCharged, setShippingCharged] = useState<number | "">("")
    
    // Costs
    const [itemCost, setItemCost] = useState<number | "">("")
    const [shippingCost, setShippingCost] = useState<number | "">("")
    
    // Fees
    const [feeRate, setFeeRate] = useState<number | "">("")
    const [fixedFee, setFixedFee] = useState<number | "">("")
    const [adRate, setAdRate] = useState<number | "">("")

    useEffect(() => {
        if (feeRate === "") setFeeRate(EBAY.finalValuePercent)
    }, [])

    const handleReset = () => {
        setSoldPrice("")
        setShippingCharged("")
        setItemCost("")
        setShippingCost("")
        setFeeRate(EBAY.finalValuePercent)
        setFixedFee("")
        setAdRate("")
    }

    const result = ebayFees({
        itemPrice: Number(soldPrice) || 0,
        shippingCharged: Number(shippingCharged) || 0,
        itemCost: Number(itemCost) || 0,
        shippingCost: Number(shippingCost) || 0,
        feePercent: Number(feeRate) || 0,
        orderFee: fixedFee === "" ? null : Number(fixedFee),
        adPercent: Number(adRate) || 0,
        rates: EBAY,
    })
    const totalRevenue = result?.revenue ?? 0
    const totalFees = result?.totalFees ?? 0
    const netProfit = result?.netProfit ?? 0
    const margin = result?.margin ?? 0
    const fvfAmount = result?.finalValueFee ?? 0
    const adFeeAmount = result?.adFee ?? 0

    // Item price, product cost and the fee rate are needed before a result or a verdict shows; the order fee can stay
    // blank (eBay's rule applies).
    const isValid = result !== null && soldPrice !== "" && itemCost !== "" && feeRate !== ""

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-3">
                    <Card className="border border-slate-200 shadow-sm bg-white dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            description="Enter sale price, costs, and eBay fees."
                            onReset={handleReset}
                            guideId="ebay-fee-guide"
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />

                        <CardContent className="p-4 md:p-6 pb-10 md:pb-14 space-y-3 flex flex-col">
                            <div className="space-y-6 max-w-[520px] mx-auto w-full">
                                {/* Sale */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        hideSeparator={true}
                                        groupingTitle="Sale"
                                        groupingIcon={Tag}
                                        label="Item Price"
                                        value={soldPrice}
                                        onChange={setSoldPrice}
                                        placeholder="45.00"
                                        max={100000}
                                        step={0.01}
                                        tooltip="Your item's final selling price."
                                        isCurrency
                                        currency={currency}
                                        autoFocus
                                    />
                                    <CalculatorInput
                                        label="Shipping Charged"
                                        value={shippingCharged}
                                        onChange={setShippingCharged}
                                        placeholder="0.00"
                                        max={100000}
                                        step={0.01}
                                        tooltip="The shipping fee paid by the buyer."
                                        isCurrency
                                        currency={currency}
                                        isOptional
                                    />
                                </div>

                                {/* Costs */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        groupingTitle="Costs"
                                        groupingIcon={DollarSign}
                                        label="Product Cost"
                                        value={itemCost}
                                        onChange={setItemCost}
                                        placeholder="10.00"
                                        max={100000}
                                        step={0.01}
                                        tooltip="How much you originally paid for the item."
                                        isCurrency
                                        currency={currency}
                                    />
                                    <CalculatorInput
                                        label="Shipping Cost"
                                        value={shippingCost}
                                        onChange={setShippingCost}
                                        placeholder="5.50"
                                        max={100000}
                                        step={0.01}
                                        tooltip="Your actual cost to purchase the shipping label and packaging."
                                        isCurrency
                                        currency={currency}
                                        isOptional
                                    />
                                </div>

                                {/* Fees */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        groupingTitle="Fees"
                                        groupingIcon={Percent}
                                        label="eBay Fee"
                                        value={feeRate}
                                        onChange={setFeeRate}
                                        placeholder="13.6"
                                        suffix="%"
                                        step={0.01}
                                        min={0}
                                        max={100}
                                        tooltip="eBay's Final Value Fee percentage based on your item's category."
                                        hint={feeRate === EBAY.finalValuePercent ? "eBay's rate for most categories; 2.35% on the part over $7,500" : undefined}
                                    />
                                    <CalculatorInput
                                        label="Order Fee"
                                        value={fixedFee}
                                        onChange={setFixedFee}
                                        placeholder="0.40"
                                        step={0.01}
                                        min={0}
                                        max={10000}
                                        tooltip="eBay's fixed fee per order. Leave it blank to use eBay's rule: $0.30 on orders of $10 or less, $0.40 above."
                                        isCurrency
                                        currency={currency}
                                        hint={fixedFee === "" ? "Auto: $0.30 up to $10, $0.40 above" : undefined}
                                    />
                                    <CalculatorInput
                                        label="Promoted Listings"
                                        value={adRate}
                                        onChange={setAdRate}
                                        placeholder="0"
                                        step={0.01}
                                        min={0}
                                        max={100}
                                        tooltip="The extra percentage you pay eBay if a buyer clicks your promoted ad."
                                        suffix="%"
                                        isOptional
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultSummaryCard
                        isCalculated={isValid}
                        currency={currency}
                        emptyMessage="eBay fees & payout"
                        profitLossKey="netProfit"
                        liveBadgeText={
                            isValid
                                ? netProfit > 0 ? "Profitable Sale"
                                : netProfit === 0 ? "Break Even"
                                : "Unprofitable Sale"
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
                            positive: `You keep ${margin.toFixed(1)}% of the sale price as net profit after all fees and costs.`,
                            negative: `Your fees and costs come to more than the buyer pays.`,
                            neutral: "You broke even on this sale. No profit, no loss."
                        }}
                        primaryResult={{
                            value: netProfit,
                            label: "You Receive (After Fees & Costs)",
                            isCurrency: true,
                            key: "netProfit"
                        }}
                        secondaryResults={[
                            {
                                key: "totalFees",
                                label: "Total Fees",
                                value: totalFees,
                                isCurrency: true,
                                icon: DollarSign,
                                tooltip: "The combined total of eBay's Final Value Fee, the per-order fee, and any Promoted Listings fees."
                            },
                            {
                                key: "margin",
                                label: "Profit Margin",
                                value: margin.toFixed(1),
                                unit: "%",
                                icon: Percent,
                                tooltip: "Your net profit shown as a percentage of your total gross revenue."
                            }
                        ]}
                        checklistItems={[
                            { key: "price", label: "Item Price", isComplete: soldPrice !== "" },
                            { key: "cost", label: "Product Cost", isComplete: itemCost !== "" },
                            { key: "feeRate", label: "eBay Fee", isComplete: feeRate !== "" }
                        ]}
                    >
                    </ResultSummaryCard>
                    
                    <div className="mt-4">
                        <EbayFeeBreakdown
                            netProfit={netProfit}
                            fvfFee={fvfAmount}
                            adFee={adFeeAmount}
                            productCost={Number(itemCost) || 0}
                            shippingCost={Number(shippingCost) || 0}
                            totalRevenue={totalRevenue}
                            currency={currency}
                        />
                        <RatesChecked source={EBAY.source} />
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}
