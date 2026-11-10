"use client"
import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { dropshipProfit } from "./calc"
import { CalculatorCardHeader, CalculatorInput, Counter, CurrencyCombobox, FadeIn, ResultFeedbackCard } from "@/app/tools/_shared/components"
export function DropshippingCalculator() {
    // State for inputs - initialized as empty for placeholder effect
    const [currency, setCurrency] = useState("USD")
    const [purchasePrice, setPurchasePrice] = useState<number | "">("")
    const [salesPrice, setSalesPrice] = useState<number | "">("")
    const [ordersReceived, setOrdersReceived] = useState<number | "">("")
    const [cancelledQty, setCancelledQty] = useState<number | "">("")
    const [rtoPercentage, setRtoPercentage] = useState<number | "">("")
    const [adsCostPerProduct, setAdsCostPerProduct] = useState<number | "">("")
    const [shippingCost, setShippingCost] = useState<number | "">("")
    const [otherCosts, setOtherCosts] = useState<number | "">("")
    // Helper to safely get number for calculation
    const val = (v: number | "") => (v === "" ? 0 : v)
    // Currency symbols map
    const currencySymbols: Record<string, string> = {
        USD: '$', EUR: '€', GBP: '£', INR: '₹', AUD: 'A$', CAD: 'C$', JPY: '¥', CNY: '¥',
        AED: 'AED', SGD: 'S$', HKD: 'HK$', CHF: 'Fr', MXN: 'MX$', BRL: 'R$', KRW: '₩',
        RUB: '₽', ZAR: 'R', SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł', THB: '฿',
        IDR: 'Rp', MYR: 'RM', PHP: '₱', VND: '₫', TRY: '₺', SAR: '﷼', NZD: 'NZ$',
        EGP: 'E£', PKR: '₨', BDT: '৳', NGN: '₦', KES: 'KSh'
    }
    const getSymbol = () => currencySymbols[currency] || "$"
    const handleReset = () => {
        setPurchasePrice("")
        setSalesPrice("")
        setOrdersReceived("")
        setCancelledQty("")
        setRtoPercentage("")
        setAdsCostPerProduct("")
        setShippingCost("")
        setOtherCosts("")
    }
    const ordersReceivedVal = val(ordersReceived)
    const shippingCostVal = val(shippingCost)
    const result = dropshipProfit({
        purchasePrice: val(purchasePrice),
        sellingPrice: val(salesPrice),
        orders: ordersReceivedVal,
        cancelled: val(cancelledQty),
        rtoPercent: val(rtoPercentage),
        shipping: shippingCostVal,
        adsPerOrder: val(adsCostPerProduct),
        otherPerOrder: val(otherCosts),
    })
    // Purchase price, selling price and orders are needed before any result or status shows.
    const ready = result !== null && purchasePrice !== ""
    const netProfit = ready ? result.netProfit : 0
    const revenueGenerated = ready ? result.revenue : 0
    const marginPerOrder = ready ? result.marginPerSale : 0
    const deliveredOrders = ready ? result.delivered : 0
    const rtoQty = ready ? result.rtoOrders : 0
    const totalPurchaseCost = result?.goodsCost ?? 0
    const totalAdsCost = result?.adsCost ?? 0
    const totalRtoCost = result?.rtoShipping ?? 0
    const totalOtherCosts = result?.otherCost ?? 0
    // Currency formatter
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(val)
    }
    const symbol = getSymbol()
    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Inputs (Col Span 7) */}
                <div className="lg:col-span-7">
                    <FadeIn delay={0.2} direction="right" className="h-full">
                        <Card className="border border-slate-200 shadow-sm bg-white dark:border-slate-800 dark:bg-slate-900">
                            <CalculatorCardHeader
                                description="Calculate your dropshipping net profit."
                                onReset={handleReset}
                                currency={currency}
                                onCurrencyChange={setCurrency}
                            />
                            <CardContent className="space-y-3 pt-6">
                                <CalculatorInput
                                    label={`Purchase Price (${symbol})`}
                                    value={purchasePrice}
                                    onChange={setPurchasePrice}
                                    placeholder="50"
                                    max={10000}
                                    tooltip="The cost to buy the product from your supplier."
                                />
                                <CalculatorInput
                                    label={`Selling Price (${symbol})`}
                                    value={salesPrice}
                                    onChange={setSalesPrice}
                                    placeholder="150"
                                    max={20000}
                                    tooltip="The price you sell the product for on your store."
                                />
                                <CalculatorInput
                                    label="Orders Received"
                                    value={ordersReceived}
                                    onChange={setOrdersReceived}
                                    placeholder="100"
                                    max={10000}
                                    tooltip="Total number of orders you received from customers."
                                />
                                <CalculatorInput
                                    label={`Shipping Cost (${symbol})`}
                                    value={shippingCost}
                                    onChange={setShippingCost}
                                    placeholder="8"
                                    max={500}
                                    tooltip="Average shipping cost per parcel, one way. Delivered orders pay it once; RTO parcels pay it both ways."
                                />
                                <CalculatorInput
                                    label={`Ads Cost per Product (CPA) (${symbol})`}
                                    value={adsCostPerProduct}
                                    onChange={setAdsCostPerProduct}
                                    placeholder="20"
                                    max={5000}
                                    tooltip="CPA (Cost Per Acquisition): the average ad spend for each order placed."
                                />
                                <CalculatorInput
                                    label="Return to Origin (RTO %)"
                                    value={rtoPercentage}
                                    onChange={setRtoPercentage}
                                    placeholder="15"
                                    max={100}
                                    tooltip="RTO (Return to Origin): the percentage of shipped orders that come back because they couldn't be delivered. Cancelled orders aren't counted."
                                />
                                <CalculatorInput
                                    label="Cancelled Qty (Before Shipping)"
                                    value={cancelledQty}
                                    onChange={setCancelledQty}
                                    placeholder="5"
                                    max={ordersReceivedVal}
                                    tooltip="Orders cancelled by customers before you shipped them."
                                />
                                <CalculatorInput
                                    label={`Other Cost per Product (${symbol})`}
                                    value={otherCosts}
                                    onChange={setOtherCosts}
                                    placeholder="2"
                                    max={1000}
                                    tooltip="Other: Additional expenses per order like packaging, gateway fees, or handling."
                                />
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>
                {/* Right Column: Results (Col Span 5) - Sticky & Dark Theme */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <FadeIn delay={0.4} direction="left" className="space-y-3">
                        <ResultFeedbackCard
                            title="Net Profit / Loss"
                            labelClassName="text-white bg-slate-900/70 border-slate-700/50"
                            mainValue={
                                ready ? <Counter value={netProfit} formatter={formatCurrency} key={currency} /> : "–"
                            }
                            valueColor={!ready ? "text-white" : netProfit > 0 ? "text-blue-400" : (netProfit < 0 ? "text-red-400" : "text-white")}
                            mainMetricLabel="Net Margin"
                            mainMetricValue={ready && result.netMargin !== null ? `${result.netMargin.toFixed(1)}%` : "–"}
                            mainMetricColor={ready ? (netProfit >= 0 ? "text-blue-400" : "text-red-400") : "text-slate-500 dark:text-slate-400"}
                            secondaryMetrics={[
                                {
                                    label: "Revenue",
                                    value: ready ? <Counter value={revenueGenerated} formatter={formatCurrency} key={currency} /> : "–",
                                    color: "text-slate-100"
                                }
                            ]}
                        />
                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <ResultFeedbackCard
                                variant="compact"
                                title="Margin per Sale"
                                mainValue={ready ? <Counter value={marginPerOrder} formatter={formatCurrency} key={currency} /> : "–"}
                                tooltip="The profit you make on each sale before advertising and RTO costs. Calculated as: Selling Price - Product Cost."
                            />
                            <ResultFeedbackCard
                                variant="compact"
                                title="ROAS"
                                mainValue={ready && result.roas !== null ? <><Counter value={result.roas} formatter={(v) => v.toFixed(2)} />x</> : "–"}
                                tooltip="ROAS (return on ad spend): revenue from delivered orders for every 1 spent on ads."
                            />
                            <ResultFeedbackCard
                                variant="compact"
                                title="Delivered"
                                mainValue={ready ? <Counter value={deliveredOrders} /> : "–"}
                                tooltip="Delivered Orders: Total orders that successfully reached your customers."
                            />
                            <ResultFeedbackCard
                                variant="compact"
                                title="RTO Orders"
                                mainValue={ready ? <Counter value={rtoQty} /> : "–"}
                                valueColor="text-orange-600 dark:text-orange-400"
                                tooltip="RTO (Return to Origin): parcels sent back to you. Each pays shipping both ways, and its ad cost brought no sale."
                            />
                        </div>
                        {/* Breakdown Card */}
                        {ready && deliveredOrders > 0 ? (
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-blue-500 dark:bg-slate-900 dark:border-slate-800">
                                <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800">
                                    <p className="text-xs font-bold text-slate-600 tracking-wider dark:text-slate-300">P&L Breakdown</p>
                                </div>
                                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                    <div className="flex justify-between items-center px-5 py-3.5">
                                        <span className="text-sm text-slate-600 dark:text-slate-300">Total Product Cost</span>
                                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{formatCurrency(totalPurchaseCost)}</span>
                                    </div>
                                    <div className="flex justify-between items-center px-5 py-3.5">
                                        <span className="text-sm text-slate-600 dark:text-slate-300">Total Ad Spend</span>
                                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{formatCurrency(totalAdsCost)}</span>
                                    </div>
                                    <div className="flex justify-between items-center px-5 py-3.5">
                                        <span className="text-sm text-slate-600 dark:text-slate-300">Total Shipping</span>
                                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{formatCurrency(result.deliveredShipping)}</span>
                                    </div>
                                    {(totalRtoCost > 0 || totalOtherCosts > 0) && (
                                        <div className="flex justify-between items-center px-5 py-3.5">
                                            <span className="text-sm text-slate-600 dark:text-slate-300">RTO Shipping (Both Ways) & Other Costs</span>
                                            <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{formatCurrency(totalRtoCost + totalOtherCosts)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center px-5 py-4 bg-slate-50 dark:bg-slate-800/60">
                                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">Net Profit</span>
                                        <span className={cn("text-base font-bold", netProfit >= 0 ? "text-blue-600 dark:text-blue-400" : "text-red-600 dark:text-red-400")}>
                                            {formatCurrency(netProfit)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center dark:bg-slate-900 dark:border-slate-800">
                                <p className="text-sm text-slate-600 dark:text-slate-300">Enter order details to calculate profit.</p>
                            </div>
                        )}
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    )
}
