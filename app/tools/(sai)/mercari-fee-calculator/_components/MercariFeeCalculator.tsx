"use client";
import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    HelpCircle, ShoppingBag, Package, TrendingUp, AlertTriangle,
    CheckCircle2, DollarSign, Percent, Tag, Hash
} from "lucide-react";
import {
    FadeIn, CalculatorInput, CalculatorCardHeader, ResultSummaryCard
    , RatesChecked
} from "@/app/tools/_shared/components";
import { MERCARI } from "@/app/tools/_data/feeRates";
import { MercariFeeBreakdown } from "./MercariFeeBreakdown";

export function MercariFeeCalculator() {
    const [salePrice, setSalePrice] = useState<number | "">("")
    const [itemCost, setItemCost] = useState<number | "">("")
    const [shippingCost, setShippingCost] = useState<number | "">("")
    const [buyerShipping, setBuyerShipping] = useState<number | "">("")
    const [otherCosts, setOtherCosts] = useState<number | "">("")
    const [soldQuantity, setSoldQuantity] = useState<number | "">(1)

    const handleReset = () => {
        setSalePrice("")
        setItemCost("")
        setShippingCost("")
        setBuyerShipping("")
        setOtherCosts("")
        setSoldQuantity(1)
    }

    const val = (v: number | "") => (v === "" ? 0 : v);

    const price = val(salePrice);
    const cost = val(itemCost);
    const ship = val(shippingCost);
    const other = val(otherCosts);
    const quantity = Math.max(val(soldQuantity) || 1, 1);

    const buyerShip = val(buyerShipping);
    // Mercari's 10% selling fee is on the item price plus the shipping the buyer pays, with no seller processing
    // fee (since 6 January 2025; app/tools/_data/feeRates.ts).
    const revenue = price + buyerShip;
    const sellingFee = revenue * MERCARI.sellingFee;
    const totalFees = sellingFee;
    const totalExpenses = cost + ship + other + totalFees;
    const netProfit = revenue - totalExpenses;
    const margin = revenue > 0 ? (netProfit / revenue) * 100 : 0;
    const batchProfit = netProfit * quantity;

    const isCalculated = salePrice !== "";

    const formatCurrency = (v: number) =>
        new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(v);

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 lg:sticky lg:top-8">
                    <FadeIn delay={0.2} direction="right" className="h-full">
                        <Card className="border border-slate-200 shadow-sm bg-white dark:border-slate-800 dark:bg-slate-900">
                            <CalculatorCardHeader
                                title="Listing Details"
                                description="Enter your sale price and cost breakdown to calculate net profit."
                                onReset={handleReset}
                            />
                            <CardContent className="p-4 md:p-6 pb-10 md:pb-14 space-y-3 flex flex-col">
                                <div className="space-y-6 max-w-[520px] mx-auto w-full">
                                    <div className="space-y-4">
                                        <CalculatorInput
                                            label="Sale Price"
                                            value={salePrice}
                                            onChange={setSalePrice}
                                            placeholder="50.00"
                                            isCurrency
                                            currency="USD"
                                            autoFocus
                                            tooltip="The price of your item. Mercari's 10% selling fee is worked out on this plus any shipping the buyer pays."
                                            groupingTitle="Revenue"
                                            groupingIcon={Tag}
                                            hideSeparator={true}
                                        />
                                        <CalculatorInput
                                            label="Items Sold (Qty)"
                                            value={soldQuantity}
                                            onChange={setSoldQuantity}
                                            placeholder="1"
                                            min={1}
                                            max={10000}
                                            tooltip="Number of identical units sold. Used to project total batch profit."
                                            ignoreChecklist={true}
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <CalculatorInput
                                            label="Item Cost"
                                            value={itemCost}
                                            onChange={setItemCost}
                                            placeholder="20.00"
                                            isCurrency
                                            currency="USD"
                                            tooltip="What you paid to acquire the item — purchase price, sourcing, or manufacturing cost."
                                            groupingTitle="Your Costs"
                                            groupingIcon={Package}
                                        />
                                        <CalculatorInput
                                            label="Shipping Cost"
                                            value={shippingCost}
                                            onChange={setShippingCost}
                                            placeholder="0.00"
                                            isCurrency
                                            currency="USD"
                                            tooltip="What you pay for the shipping label. Leave it blank if the buyer pays shipping."
                                        />
                                        <CalculatorInput
                                            label="Shipping the Buyer Pays"
                                            value={buyerShipping}
                                            onChange={setBuyerShipping}
                                            placeholder="0.00"
                                            isCurrency
                                            currency="USD"
                                            tooltip="If the buyer pays for shipping, enter that amount. Mercari's 10% fee applies to it too."
                                            isOptional
                                        />
                                        <CalculatorInput
                                            label="Other Expenses"
                                            value={otherCosts}
                                            onChange={setOtherCosts}
                                            placeholder="0.00"
                                            isCurrency
                                            currency="USD"
                                            tooltip="Any extra costs such as packaging materials, bubble wrap, or tape."
                                            isOptional
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-4">
                    <FadeIn delay={0.4} direction="left" className="space-y-4">
                        <ResultSummaryCard
                            panelTitle="Mercari Calculator"
                            isCalculated={isCalculated}
                            currency="USD"
                            emptyMessage="Net Profit"
                            showLiveBadge={true}
                            liveBadgeText={isCalculated ? (netProfit >= 0 ? "Profitable" : "Loss") : "Live"}
                            liveBadgeColor={isCalculated ? (netProfit >= 0 ? "emerald" : "rose") : "blue"}
                            description={
                                isCalculated
                                    ? quantity > 1
                                        ? `Your per-unit profit after all fees. Multiply ×${quantity.toLocaleString()} for batch total.`
                                        : "Your take-home profit after Mercari fees and your costs."
                                    : undefined
                            }
                            primaryResult={{
                                value: netProfit,
                                label: "Net Profit",
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
                                    tooltip: `Mercari's 10% selling fee on the item price plus buyer-paid shipping: ${formatCurrency(sellingFee)}. Mercari charges sellers no separate processing fee.`
                                },
                                {
                                    key: "margin",
                                    label: "Profit Margin",
                                    value: margin.toFixed(1),
                                    unit: "%",
                                    icon: Percent,
                                    tooltip: `(Net Profit ÷ what the buyer pays) × 100. A margin of ${margin.toFixed(1)}% means you keep ${formatCurrency(netProfit)} of every ${formatCurrency(revenue)} the buyer pays.`
                                },
                                ...(quantity > 1 ? [{
                                    key: "batchProfit",
                                    label: `Batch Profit (×${quantity.toLocaleString()})`,
                                    value: batchProfit,
                                    isCurrency: true,
                                    icon: ShoppingBag,
                                    tooltip: `Total profit if you sell ${quantity.toLocaleString()} identical items at this price.`
                                }] : [])
                            ]}
                            checklistItems={[
                                { key: "price", label: "Sale Price", isComplete: salePrice !== "" },
                                { key: "cost", label: "Item Cost", isComplete: itemCost !== "" },
                            ]}
                        />

                        <MercariFeeBreakdown
                            price={revenue}
                            cost={cost}
                            ship={ship}
                            other={other}
                            sellingFee={sellingFee}
                            netProfit={netProfit}
                            currency="USD"
                        />
                        <RatesChecked source={MERCARI.source} />
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    );
}