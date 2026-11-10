"use client"
import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Info, TrendingUp, DollarSign, Percent, ChevronDown, ChevronUp, ChevronsUpDown, Target, Wallet } from "lucide-react"
import { margin, maxCostForMargin, priceForMargin } from "./calc"
import { cn } from "@/lib/utils"
import { CalculatorCardHeader, CalculatorInput, Counter, CurrencyCombobox, FadeIn, ResultFeedbackCard } from "@/app/tools/_shared/components"
type Mode = "margin" | "price" | "cost"

export function MarginCalculator() {
    const [mode, setMode] = useState<Mode>("margin")
    const [currency, setCurrency] = useState("USD")
    const [targetMargin, setTargetMargin] = useState<number | "">("")
    const [costPrice, setCostPrice] = useState<number | "">("")
    const [salesPrice, setSalesPrice] = useState<number | "">("")
    const [quantity, setQuantity] = useState<number | "">("")
    // Advanced Settings State
    const [showAdvanced, setShowAdvanced] = useState(false)
    const [shippingCost, setShippingCost] = useState<number | "">("")
    const [otherCosts, setOtherCosts] = useState<number | "">("")
    const [taxRate, setTaxRate] = useState<number | "">("")
    const val = (v: number | "") => (v === "" ? 0 : v)
    const currencySymbols: Record<string, string> = {
        USD: '$', EUR: '€', GBP: '£', INR: '₹', AUD: 'A$', CAD: 'C$', JPY: '¥', CNY: '¥',
        AED: 'AED', SGD: 'S$', HKD: 'HK$', CHF: 'Fr', MXN: 'MX$', BRL: 'R$', KRW: '₩',
        RUB: '₽', ZAR: 'R', SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł', THB: '฿',
        IDR: 'Rp', MYR: 'RM', PHP: '₱', VND: '₫', TRY: '₺', SAR: '﷼', NZD: 'NZ$',
        EGP: 'E£', PKR: '₨', BDT: '৳', NGN: '₦', KES: 'KSh'
    }
    const symbol = currencySymbols[currency] || "$"
    const handleReset = () => {
        setCostPrice("")
        setSalesPrice("")
        setQuantity("")
        setShippingCost("")
        setOtherCosts("")
        setTaxRate("")
        setTargetMargin("")
    }
    // Calculations (calc.ts). The advanced fields count only while the panel is open.
    const result = margin({
        price: val(salesPrice),
        cost: val(costPrice),
        shipping: showAdvanced ? val(shippingCost) : 0,
        other: showAdvanced ? val(otherCosts) : 0,
        taxIncludedPercent: showAdvanced ? val(taxRate) : 0,
        quantity: val(quantity),
    })
    // A margin needs both numbers typed; a cost of 0 is allowed.
    const marginReady = mode === "margin" && result !== null && costPrice !== ""
    const target = mode === "price"
        ? (costPrice !== "" && targetMargin !== "" ? priceForMargin(val(costPrice), val(targetMargin)) : null)
        : mode === "cost"
            ? (salesPrice !== "" && targetMargin !== "" ? maxCostForMargin(val(salesPrice), val(targetMargin)) : null)
            : null
    const targetTooHigh = targetMargin !== "" && (mode === "price" ? val(targetMargin) >= 100 : val(targetMargin) > 100)
    const qty = val(quantity) === 0 ? 1 : val(quantity)
    const totalNetProfit = result?.totalNetProfit ?? 0
    const pct = (v: number | null | undefined) => (v === null || v === undefined ? "–" : `${v.toFixed(2)}%`)
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
                            description="Find the margin and markup from a price and a cost, or set a target margin to find the price or the most you can pay."
                            onReset={handleReset}
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="space-y-3 pt-6">
                            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200/60 dark:bg-slate-800 dark:border-slate-800">
                                <ModeButton active={mode === "margin"} onClick={() => setMode("margin")} icon={Percent} label="Find margin" />
                                <ModeButton active={mode === "price"} onClick={() => setMode("price")} icon={Target} label="Find price" />
                                <ModeButton active={mode === "cost"} onClick={() => setMode("cost")} icon={Wallet} label="Find cost" />
                            </div>
                            {mode !== "cost" && (
                                <CalculatorInput
                                    label={`Cost Price (${symbol})`}
                                    value={costPrice}
                                    onChange={setCostPrice}
                                    placeholder="50.00"
                                    max={100000}
                                    tooltip="What one unit costs you, or a period's cost of goods sold. 0 is allowed."
                                />
                            )}
                            {mode !== "price" && (
                                <CalculatorInput
                                    label={`Selling Price (${symbol})`}
                                    value={salesPrice}
                                    onChange={setSalesPrice}
                                    placeholder="100.00"
                                    max={100000}
                                    tooltip="The price of one unit, or a period's revenue."
                                />
                            )}
                            {mode !== "margin" && (
                                <CalculatorInput
                                    label="Target Gross Margin (%)"
                                    value={targetMargin}
                                    onChange={setTargetMargin}
                                    placeholder="40.0"
                                    max={100}
                                    tooltip={mode === "price" ? "The gross margin you want. It must be below 100%." : "The gross margin you need to keep, up to 100%."}
                                />
                            )}
                            {mode === "margin" && (
                            <>
                            <CalculatorInput
                                label="Quantity (Optional)"
                                value={quantity}
                                onChange={setQuantity}
                                placeholder="1"
                                max={10000}
                                tooltip="Number of units sold. Defaults to 1 if left empty."
                            />
                            {/* Advanced Toggle */}
                            <div className="pt-2">
                                <div
                                    onClick={() => setShowAdvanced(!showAdvanced)}
                                    className={cn(
                                        "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200 group select-none",
                                        showAdvanced
                                            ? "bg-blue-50/50 border-blue-200 shadow-sm dark:bg-blue-950/40 dark:border-blue-900/50"
                                            : "bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-slate-100 dark:bg-slate-800/60 dark:border-slate-800 dark:hover:border-blue-800 dark:hover:bg-slate-800"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                                            showAdvanced ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400" : "bg-white text-slate-600 dark:text-slate-300 group-hover:text-blue-500 dark:bg-slate-900 dark:group-hover:text-blue-400"
                                        )}>
                                            <ChevronsUpDown className="w-4 h-4" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className={cn("text-sm font-semibold transition-colors", showAdvanced ? "text-blue-700 dark:text-blue-400" : "text-slate-700 dark:text-slate-200")}>
                                                Advanced Settings
                                            </span>
                                            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                                                Shipping, Tax, & Misc Costs
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={cn(
                                            "text-xs px-2 py-0.5 rounded-full font-bold tracking-wide  transition-colors",
                                            showAdvanced ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                                        )}>
                                            Optional
                                        </span>
                                        {showAdvanced ? <ChevronUp className="w-4 h-4 text-blue-500 dark:text-blue-400" /> : <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-300" />}
                                    </div>
                                </div>
                                {showAdvanced && (
                                    <FadeIn className="p-5 bg-slate-50/50 rounded-xl border border-slate-200/60 space-y-3 mt-4 dark:bg-slate-800/60 dark:border-slate-800">
                                        <CalculatorInput
                                            label={`Shipping Cost per Unit (${symbol})`}
                                            value={shippingCost}
                                            onChange={setShippingCost}
                                            placeholder="5.00"
                                            max={10000}
                                            tooltip="Cost to ship the item to the customer (if you pay for it)."
                                        />
                                        <CalculatorInput
                                            label={`Misc. Fees / Packaging (${symbol})`}
                                            value={otherCosts}
                                            onChange={setOtherCosts}
                                            placeholder="2.00"
                                            max={10000}
                                            tooltip="Any extra costs per unit (e.g. packaging, transaction fees)."
                                        />
                                        <CalculatorInput
                                            label="Tax Included in Price (%)"
                                            value={taxRate}
                                            onChange={setTaxRate}
                                            placeholder="20"
                                            max={100}
                                            tooltip="If your selling price includes VAT or sales tax, enter the rate and the tax is taken out of the price before the margin. Leave it blank when tax is added on top at checkout."
                                        />
                                    </FadeIn>
                                )}
                            </div>
                            </>
                            )}
                            {mode !== "margin" && targetTooHigh && (
                                <p role="status" className="text-sm text-amber-800 dark:text-amber-300">
                                    {mode === "price" ? "A margin of 100% or more has no price: the cost would have to be 0. Enter a target below 100%." : "Enter a target of 100% or less."}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
                {/* Results Section */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    {mode === "margin" ? (
                    <>
                    {/* Main Profit Card */}
                    <ResultFeedbackCard
                        title={(quantity && quantity > 1) ? 'Total Net Profit' : 'Net Profit per Unit'}
                        mainValue={
                            marginReady ? <Counter value={totalNetProfit} formatter={formatCurrency} key={currency} /> : "–"
                        }
                        valueColor={!marginReady ? "text-white" : totalNetProfit > 0 ? "text-blue-400" : (totalNetProfit < 0 ? "text-red-400" : "text-white")}
                        mainMetricColor={totalNetProfit >= 0 ? 'text-white' : 'text-red-200'}
                        secondaryMetrics={[
                            {
                                label: "Gross Margin",
                                value: marginReady ? pct(result?.grossMargin) : "–",
                                color: "text-blue-400"
                            },
                            {
                                label: "Markup",
                                value: marginReady ? pct(result?.markup) : "–",
                                color: "text-blue-400"
                            }
                        ]}
                    />
                    {/* Breakdown Card */}
                    {marginReady && result ? (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-blue-500 dark:bg-slate-900 dark:border-slate-800">
                            <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800">
                                <p className="text-xs font-bold text-slate-600 tracking-wider dark:text-slate-300">Financial Breakdown</p>
                            </div>
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                <Row label={qty > 1 ? "Total Revenue" : "Selling Price"} value={formatCurrency(result.totalRevenue)} />
                                {result.tax > 0 && <Row label="Tax in the Price (per unit)" value={`- ${formatCurrency(result.tax)}`} negative />}
                                <Row label="Gross Profit per Unit" value={formatCurrency(result.grossProfit)} />
                                <Row label="Gross Margin" value={pct(result.grossMargin)} />
                                {result.totalCost !== val(costPrice) && <Row label="Net Margin (after shipping and fees)" value={pct(result.netMargin)} />}
                                <Row label="Markup" value={pct(result.markup)} strong />
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center dark:bg-slate-900 dark:border-slate-800">
                            <p className="text-sm text-slate-600 dark:text-slate-300">Enter cost and selling price to see breakdown.</p>
                        </div>
                    )}
                    </>
                    ) : (
                    <>
                    <ResultFeedbackCard
                        title={mode === "price" ? "Price to Charge" : "Most the Goods Can Cost"}
                        mainValue={target ? <Counter value={mode === "price" ? target.price : target.cost} formatter={formatCurrency} key={currency + mode} /> : "–"}
                        valueColor="text-white"
                        secondaryMetrics={[
                            { label: "Gross Profit", value: target ? formatCurrency(target.profit) : "–", color: "text-blue-400" },
                            { label: "Markup", value: target ? pct(target.markup) : "–", color: "text-blue-400" },
                        ]}
                    />
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center dark:bg-slate-900 dark:border-slate-800">
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            {target
                                ? (mode === "price"
                                    ? `Selling at ${formatCurrency(target.price)} on a cost of ${formatCurrency(target.cost)} keeps a ${val(targetMargin)}% gross margin.`
                                    : `At ${formatCurrency(target.price)}, goods costing ${formatCurrency(target.cost)} or less keep a ${val(targetMargin)}% gross margin.`)
                                : mode === "price" ? "Enter the cost and a target margin below 100% to see the price." : "Enter the selling price and a target margin to see the most you can pay."}
                        </p>
                    </div>
                    </>
                    )}
                </div>
            </div>
        </FadeIn>
    )
}

function Row({ label, value, negative, strong }: { label: string; value: string; negative?: boolean; strong?: boolean }) {
    return (
        <div className={cn("flex justify-between items-center px-5", strong ? "py-4" : "py-3.5")}>
            <span className={cn("text-sm", strong ? "font-bold text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-300")}>{label}</span>
            <span className={cn("font-semibold", strong ? "text-base font-bold text-blue-600 dark:text-blue-400" : negative ? "text-sm text-red-700 dark:text-red-300" : "text-sm text-slate-800 dark:text-slate-100")}>{value}</span>
        </div>
    )
}

function ModeButton({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: React.ElementType; label: string }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={cn(
                "flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl transition-all duration-300 border",
                active
                    ? "bg-white border-blue-200 shadow-sm text-blue-600 ring-2 ring-blue-100 dark:bg-slate-900 dark:border-blue-900/50 dark:text-blue-400 dark:ring-blue-900/40"
                    : "border-transparent text-slate-600 hover:bg-white hover:text-slate-700 hover:shadow-sm dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-slate-200"
            )}
        >
            <Icon className={cn("w-4 h-4", active ? "stroke-[2.5px]" : "stroke-2")} aria-hidden="true" />
            <span className="text-xs font-bold tracking-tight">{label}</span>
        </button>
    )
}
