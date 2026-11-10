"use client"
import { AMAZON_REFERRAL } from "@/app/tools/_data/feeRates";
import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Info, ChevronsUpDown, ChevronDown, ChevronUp, Box, DollarSign, Layers, Calendar, Clock, Tag, Truck, CircleDollarSign } from "lucide-react"
import { FadeIn, CalculatorInput, ResultSummaryCard, CalculatorCardHeader } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"
import { categories, fbaEstimate, MARKETS, units as marketUnits, type MarketCode } from "./calc"
export function FBACalculator() {
    // State for inputs
    const [currency, setCurrency] = useState("USD")
    const [salesPrice, setSalesPrice] = useState<number | "">("")
    // Ensure inputs are reset or logically handled when units change?
    // For now, we keep values but let user know units changed via label.
    const [weight, setWeight] = useState<number | "">("")
    const [length, setLength] = useState<number | "">("")
    const [width, setWidth] = useState<number | "">("")
    const [height, setHeight] = useState<number | "">("")
    // Advanced State
    const [showAdvanced, setShowAdvanced] = useState(false)
    const [category, setCategory] = useState("General (Default)")
    const [storageMonths, setStorageMonths] = useState<number | "">("")
    // Rate cards exist for these five marketplaces only; another currency gets no result rather than US rates.
    const market: MarketCode | null = (MARKETS as string[]).includes(currency) ? (currency as MarketCode) : null;
    const units = marketUnits[market ?? "USD"];
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
        setSalesPrice("")
        setWeight("")
        setLength("")
        setWidth("")
        setHeight("")
        setCategory("General (Default)")
        setStorageMonths("")
    }
    const salesPriceVal = val(salesPrice)
    const result = market ? fbaEstimate({
        market,
        price: salesPriceVal,
        weight: val(weight),
        length: val(length),
        width: val(width),
        height: val(height),
        category,
        storageMonths: val(storageMonths) || 0,
        referralRates: AMAZON_REFERRAL,
    }) : null
    const fbaFee = result?.fulfilmentFee ?? 0
    const referralFee = result?.referralFee ?? 0
    const closingFee = result?.closingFee ?? 0
    const storageFee = result?.storageFee ?? 0
    const totalFees = result?.totalFees ?? 0
    // Currency formatter
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
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
                        <Card className="border border-slate-200/80 shadow-sm bg-white overflow-hidden h-full flex flex-col rounded-3xl dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            description="Estimate Amazon's fees on one unit and what's left of the price."
                            onReset={handleReset}
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                            <CardContent className="p-4 md:p-6 pb-10 md:pb-14 space-y-3 flex-1 flex flex-col">
                                <div className="space-y-6 max-w-[520px] mx-auto w-full">
                                    <div className="space-y-3">
                                        <CalculatorInput
                                            hideSeparator={true}
                                            label={`Selling Price`}
                                            value={salesPrice}
                                            onChange={setSalesPrice}
                                            placeholder="29.99"
                                            max={100000}
                                            prefix={symbol}
                                            tooltip="The price you list your product for on Amazon."
                                            groupingTitle="Pricing & Weight"
                                            groupingIcon={DollarSign}
                                        />
                                        <CalculatorInput
                                            label={`Packaged Weight`}
                                            value={weight}
                                            onChange={setWeight}
                                            placeholder={units.weight === "lbs" ? "1.5" : "0.5"}
                                            max={150}
                                            suffix={units.weight}
                                            tooltip={`Total weight including packaging.`}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <CalculatorInput
                                            label="Length"
                                            value={length}
                                            onChange={setLength}
                                            placeholder="Length"
                                            suffix={units.dim}
                                            tooltip={`Product length in ${units.dim}.`}
                                            groupingTitle="Dimensions"
                                            groupingIcon={Box}
                                        />
                                        <CalculatorInput
                                            label="Width"
                                            value={width}
                                            onChange={setWidth}
                                            placeholder="Width"
                                            suffix={units.dim}
                                            tooltip={`Product width in ${units.dim}.`}
                                        />
                                        <CalculatorInput
                                            label="Height"
                                            value={height}
                                            onChange={setHeight}
                                            placeholder="Height"
                                            suffix={units.dim}
                                            tooltip={`Product height in ${units.dim}.`}
                                        />
                                    </div>
                                </div>
                                {/* Advanced Toggle */}
                                <div className="pt-6 mt-4 border-t border-slate-100 max-w-[520px] mx-auto w-full dark:border-slate-800">
                                    <div
                                        onClick={() => setShowAdvanced(!showAdvanced)}
                                        className={cn(
                                            "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200 group select-none",
                                            showAdvanced
                                                ? "bg-emerald-50/50 border-emerald-200 shadow-sm dark:bg-emerald-950/40 dark:border-emerald-900/50"
                                                : "bg-slate-50 border-slate-200 hover:border-emerald-300 hover:bg-slate-100 dark:bg-slate-800/60 dark:border-slate-800 dark:hover:border-emerald-800 dark:hover:bg-slate-800"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                                                showAdvanced ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400" : "bg-white text-slate-400 group-hover:text-emerald-500 dark:bg-slate-900 dark:text-slate-500 dark:group-hover:text-emerald-400"
                                            )}>
                                                <ChevronsUpDown className="w-4 h-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className={cn("text-sm font-semibold transition-colors", showAdvanced ? "text-emerald-700 dark:text-emerald-400" : "text-slate-700 dark:text-slate-200")}>
                                                    Advanced Settings
                                                </span>
                                                <span className="text-xs text-slate-600 font-medium dark:text-slate-300">
                                                    Category & Storage details
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={cn(
                                                "text-xs px-2 py-0.5 rounded-full font-bold tracking-wide transition-colors",
                                                showAdvanced ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400" : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                                            )}>
                                                Optional
                                            </span>
                                            {showAdvanced ? <ChevronUp className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> : <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500" />}
                                        </div>
                                    </div>
                                    {showAdvanced && (
                                        <TooltipProvider delayDuration={200}>
                                        <FadeIn className="pt-4 space-y-5 max-w-[520px] mx-auto w-full px-1">
                                            <div className="flex items-center gap-3 w-full relative z-10">
                                                <div className="flex items-center gap-2 flex-1 min-w-0 text-left">
                                                    <label className="text-sm font-medium text-slate-600/90 cursor-pointer py-1 dark:text-slate-300">Product Category</label>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button type="button" aria-label="About this field" className="text-slate-500 hover:text-emerald-600 transition-colors cursor-help dark:text-slate-500 dark:hover:text-emerald-400">
                                                                <Info className="h-3.5 w-3.5" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent className="bg-slate-900 text-white border-slate-800 text-xs dark:bg-slate-800 dark:border-slate-700">
                                                            Amazon Referral fees vary by product category. Use this to ensure accuracy.
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                                <div className="w-36 sm:w-44 relative flex-shrink-0">
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                className="w-full justify-between h-11 bg-white border-2 border-slate-200 text-slate-700 hover:border-emerald-300 hover:shadow-md transition-all font-semibold px-3 rounded-xl dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 dark:hover:border-emerald-800"
                                                            >
                                                                <span className="truncate w-full text-right pr-3">{category}</span>
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                                                            <Command>
                                                                <CommandInput placeholder="Search category..." className="text-sm" />
                                                                <CommandList>
                                                                    <CommandEmpty>No category found.</CommandEmpty>
                                                                    <CommandGroup>
                                                                        {Object.keys(categories).map(cat => (
                                                                            <CommandItem
                                                                                key={cat}
                                                                                value={cat}
                                                                                onSelect={(val) => {
                                                                                    const match = Object.keys(categories).find(k => k.toLowerCase() === val.toLowerCase());
                                                                                    if (match) setCategory(match);
                                                                                }}
                                                                                className="flex items-center justify-between py-2.5 px-3 cursor-pointer"
                                                                            >
                                                                                <span className="text-sm truncate mr-2">{cat}</span>
                                                                                <span className={cn("text-xs font-medium px-1.5 py-0.5 rounded shrink-0", category === cat ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500")}>
                                                                                    {Math.round(categories[cat] * 100)}%
                                                                                </span>
                                                                            </CommandItem>
                                                                        ))}
                                                                    </CommandGroup>
                                                                </CommandList>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                            </div>
                                            
                                            {/* Storage Input properly aligned horizontally natively by internal component */}
                                            <div className="flex w-[calc(100%+12px)] -ml-[6px]">
                                                <CalculatorInput
                                                    label="Storage Duration (Months)"
                                                    value={storageMonths}
                                                    onChange={setStorageMonths}
                                                    placeholder="0"
                                                    max={12}
                                                    tooltip="Average months a unit stays in Amazon's warehouse. The estimate uses one flat monthly rate; the Amazon storage fee calculator splits it by season."
                                                />
                                            </div>
                                        </FadeIn>
                                        </TooltipProvider>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>
                {/* Right Column: Results (Col Span 5) - Sticky & Dark Theme */}
                <div className="lg:col-span-5 lg:sticky lg:top-8">
                    <FadeIn delay={0.4} direction="left" className="h-full">
                        <ResultSummaryCard
                            title="Total Amazon Fees"
                            liveBadgeText="Estimate"
                            currency={currency}
                            primaryResult={{
                                value: totalFees,
                                isCurrency: true,
                                key: "total_fees",
                                label: "Total Estimated Fees"
                            }}
                            secondaryResults={[
                                {
                                    key: "referral_fee",
                                    label: salesPriceVal > 0 ? `Referral Fee (${((referralFee / salesPriceVal) * 100).toFixed(1)}%)` : "Referral Fee",
                                    value: referralFee,
                                    isCurrency: true,
                                    icon: Tag
                                },
                                {
                                    key: "fulfillment_fee",
                                    label: "Fulfillment Fee (FBA)",
                                    value: fbaFee,
                                    isCurrency: true,
                                    badge: result?.tier,
                                    tooltip: result?.shippingWeight != null ? `Charged on ${result.shippingWeight.toFixed(2)} lb: the greater of the unit weight and the dimensional weight (L × W × H ÷ 139).` : undefined,
                                    icon: Truck
                                },
                                ...(closingFee > 0 ? [{
                                    key: "closing_fee",
                                    label: "Closing Fee",
                                    value: closingFee,
                                    isCurrency: true,
                                    icon: CircleDollarSign
                                }] : []),
                                ...(storageFee > 0 ? [{
                                    key: "storage_fee",
                                    label: "Est. Storage Fee",
                                    value: storageFee,
                                    isCurrency: true,
                                    icon: Calendar
                                }] : []),
                                {
                                    key: "left",
                                    label: "Left After Amazon Fees",
                                    value: result?.left ?? 0,
                                    isCurrency: true,
                                    tooltip: "Selling price minus the fees above, before your product and shipping costs.",
                                    icon: DollarSign
                                }
                            ]}
                            showLiveBadge={true}
                            isCalculated={result !== null}
                            description="Fulfilment fees are estimates; check Amazon's rate card in Seller Central."
                            emptyMessage={market ? "Fill in product details to calculate fees." : "Pick USD, GBP, EUR, CAD or INR: these are the marketplaces with a rate card here."}
                            emptyResultLabel="Total Amazon Fees"
                        />
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Fulfilment fees are estimates; check Amazon&apos;s rate card in Seller Central.</p>
                    </FadeIn>
                </div>
            </div>
        </FadeIn >
    )
}
