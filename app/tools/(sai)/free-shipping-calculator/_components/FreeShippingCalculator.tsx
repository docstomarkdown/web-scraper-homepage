"use client"
import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TrendingUp, DollarSign, Percent, AlertTriangle, CheckCircle2 } from "lucide-react"
import { CalculatorCardHeader, CalculatorInput, Counter, CurrencyCombobox, FadeIn, ResultFeedbackCard } from "@/app/tools/_shared/components"
export function FreeShippingCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [aov, setAov] = useState<number | "">("")
    const [marginPercent, setMarginPercent] = useState<number | "">("")
    const [shippingCost, setShippingCost] = useState<number | "">("")
    const [proposedThreshold, setProposedThreshold] = useState<number | "">("")
    const handleReset = () => {
        setAov("")
        setMarginPercent("")
        setShippingCost("")
        setProposedThreshold("")
    }
    const val = (v: number | "") => (v === "" ? 0 : v)
    const currencySymbols: Record<string, string> = {
        USD: '$', EUR: '€', GBP: '£', INR: '₹', AUD: 'A$', CAD: 'C$', JPY: '¥', CNY: '¥',
        AED: 'AED', SGD: 'S$', HKD: 'HK$', CHF: 'Fr', MXN: 'MX$', BRL: 'R$', KRW: '₩',
        RUB: '₽', ZAR: 'R', SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł', THB: '฿',
        IDR: 'Rp', MYR: 'RM', PHP: '₱', VND: '₫', TRY: '₺', SAR: '﷼', NZD: 'NZ$',
        EGP: 'E£', PKR: '₨', BDT: '৳', NGN: '₦', KES: 'KSh'
    }
    const symbol = currencySymbols[currency] || "$"
    // --- Calculations ---
    const currentAOV = val(aov)
    const margin = val(marginPercent) / 100
    const shipCost = val(shippingCost)
    const threshold = val(proposedThreshold)
    // Today: the customer pays shipping, so profit per order = AOV × margin.
    // With free shipping over the threshold: customers below it add items to qualify, so a
    // free-shipping order is worth the higher of the AOV and the threshold, and you absorb the shipping.
    // Sales increase needed = today's profit per order ÷ profit per free-shipping order − 1.
    const hasInputs = currentAOV > 0 && margin > 0 && shipCost > 0 && threshold > 0
    const qualifyingOrderValue = Math.max(currentAOV, threshold)
    const currentProfitPerOrder = currentAOV * margin
    const grossProfitPerOrder = qualifyingOrderValue * margin
    const netProfitWithFreeShipping = grossProfitPerOrder - shipCost
    const isViable = !hasInputs || netProfitWithFreeShipping > 0
    const salesIncreaseNeeded = hasInputs && isViable ? (currentProfitPerOrder / netProfitWithFreeShipping - 1) * 100 : 0
    const formatPct = (v: number) => `${v >= 0 ? "+" : ""}${v.toFixed(1)}%`
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 2
        }).format(val)
    }
    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-3">
                    <Card className="border border-slate-200 shadow-sm bg-white dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            description="Enter your current metrics."
                            onReset={handleReset}
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="space-y-3 pt-6">
                            <CalculatorInput
                                label={`Average Order Value (AOV) (${symbol})`}
                                value={aov}
                                onChange={setAov}
                                placeholder="50.00"
                                tooltip="The average amount a customer currently spends per order."
                            />
                            <CalculatorInput
                                label="Gross Margin (%)"
                                value={marginPercent}
                                onChange={setMarginPercent}
                                placeholder="40"
                                max={100}
                                tooltip="Your average profit margin percentage before shipping costs."
                            />
                            <CalculatorInput
                                label={`Average Shipping Cost (${symbol})`}
                                value={shippingCost}
                                onChange={setShippingCost}
                                placeholder="8.00"
                                tooltip="The cost you incur to ship an average order."
                            />
                            <CalculatorInput
                                label={`Proposed Free Shipping Threshold (${symbol})`}
                                value={proposedThreshold}
                                onChange={setProposedThreshold}
                                placeholder="75.00"
                                tooltip="The minimum order value customers must reach to get free shipping."
                            />
                        </CardContent>
                    </Card>
                </div>
                {/* Results Section */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Required Sales Increase"
                        titleLabel={!hasInputs ? undefined : isViable ? "Feasible" : "High Risk"}
                        labelClassName={isViable ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/40 dark:border-blue-900/50 dark:text-blue-400" : "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/40 dark:border-red-900/50 dark:text-red-400"}
                        mainValue={
                            !hasInputs ? <span>—</span> :
                            isViable ?
                                <Counter value={salesIncreaseNeeded} formatter={formatPct} /> :
                                <span>Unprofitable</span>
                        }
                        valueColor={isViable ? (salesIncreaseNeeded < 20 ? "text-blue-400" : "text-yellow-400") : "text-red-400"}
                        mainMetricLabel="Impact"
                        mainMetricValue={!hasInputs ? "Fill in all four fields" : isViable ? "To Break Even" : "Loss per Order"}
                        secondaryMetrics={[
                            {
                                label: "New Net Profit",
                                value: <Counter value={hasInputs ? netProfitWithFreeShipping : 0} formatter={formatCurrency} key={currency} />,
                                color: isViable ? "text-blue-300" : "text-red-300"
                            },
                            {
                                label: "Profit per Order Today",
                                value: <Counter value={hasInputs ? currentProfitPerOrder : 0} formatter={formatCurrency} key={currency} />,
                                color: "text-slate-400 dark:text-slate-500"
                            }
                        ]}
                    />
                    {/* Breakdown Card */}
                    {hasInputs ? (
                        <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4  dark:bg-slate-900 dark:border-slate-800${isViable ? 'border-l-blue-500' : 'border-l-red-500'}`}>
                            <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800">
                                <p className="text-xs font-bold text-slate-600 tracking-wider dark:text-slate-300">Price Breakdown</p>
                            </div>
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600 dark:text-slate-300">Gross Profit per Free-Shipping Order</span>
                                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                                        {formatCurrency(grossProfitPerOrder)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600 dark:text-slate-300">Shipping Cost</span>
                                    <span className="text-sm font-semibold text-red-500 dark:text-red-400">
                                        - {formatCurrency(shipCost)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600 dark:text-slate-300">Net Profit After Shipping</span>
                                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                                        {formatCurrency(netProfitWithFreeShipping)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-4">
                                    <span className={`text-sm font-bold ${isViable ? 'text-blue-600' : 'text-red-600'}`}>
                                        {isViable ? 'Sales Lift Needed' : 'Not Viable'}
                                    </span>
                                    <span className={`text-base font-bold ${isViable ? 'text-blue-600' : 'text-red-600'}`}>
                                        {isViable ? formatPct(salesIncreaseNeeded) : formatCurrency(Math.abs(netProfitWithFreeShipping)) + ' loss'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center dark:bg-slate-900 dark:border-slate-800">
                            <p className="text-sm text-slate-600 dark:text-slate-300">Ready when you are. Fill in all four fields to see the price breakdown.</p>
                        </div>
                    )}
                </div>
            </div>
        </FadeIn>
    )
}
