"use client"
import React, { useState, useMemo } from "react"
import {
    CalculatorInput,
    CalculatorCardHeader,
    ResultSummaryCard,
    FadeIn
} from "@/app/tools/_shared/components"
import { CalendarDays, Boxes, RefreshCw } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { inventoryTurnover } from "./calc"
import { StockRunway } from "./StockRunway"
import { Card, CardContent } from "@/components/ui/card"

interface TurnoverState {
    cogs: string | number
    beginningInventory: string | number
    endingInventory: string | number
    periodInDays: string | number
    currency: string
}

const DEFAULT_STATE: TurnoverState = {
    cogs: "",
    beginningInventory: "",
    endingInventory: "",
    periodInDays: "",
    currency: "USD"
}

export function InventoryTurnoverCalculator() {
    const [mode, setMode] = useState<"turnover" | "runway">("turnover")
    return (
        <div className="max-w-6xl mx-auto">
            <div className="max-w-md mx-auto">
                <Tabs value={mode} onValueChange={(v) => setMode(v as "turnover" | "runway")} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 h-10 bg-slate-100/50 p-1 rounded-xl border border-slate-200/50 dark:bg-slate-800 dark:border-slate-800">
                        <TabsTrigger value="turnover" className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all">
                            Turnover ratio
                        </TabsTrigger>
                        <TabsTrigger value="runway" className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all">
                            Days of stock left
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            {mode === "turnover" ? <TurnoverRatio /> : <StockRunway />}
        </div>
    )
}

function TurnoverRatio() {
    const [values, setValues] = useState<TurnoverState>(DEFAULT_STATE)

    const handleInputChange = (field: keyof TurnoverState, value: string | number) => {
        setValues(prev => ({ ...prev, [field]: value === "" ? "" : value.toString() }))
    }

    const results = useMemo(() => inventoryTurnover({
        cogs: values.cogs === "" ? null : Number(values.cogs),
        openingInventory: values.beginningInventory === "" ? null : Number(values.beginningInventory),
        closingInventory: values.endingInventory === "" ? null : Number(values.endingInventory),
        periodDays: values.periodInDays === "" ? null : Number(values.periodInDays),
    }), [values])
    const hasInputs = results !== null

    const handleReset = () => setValues(DEFAULT_STATE)

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6">
                {/* Left Column: Smart Inputs */}
                <div className="lg:col-span-7">
                    <FadeIn direction="right">
                        <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col rounded-[2.5rem] dark:border-slate-800 dark:bg-slate-900">
                            <CalculatorCardHeader
                                title="Turnover Configuration"
                                description="Input your financial data to analyze how effectively you're managing inventory."
                                guideId="how-to-use"
                                onReset={handleReset}
                                currency={values.currency}
                                onCurrencyChange={(v) => handleInputChange('currency', v)}
                            />
                            <CardContent className="p-6 md:p-8 pb-12 md:pb-16 space-y-8 flex-1 flex flex-col">
                                <div className="space-y-4">
                                    <CalculatorInput
                                        label="Cost of Goods Sold (COGS)"
                                        value={values.cogs}
                                        onChange={(v) => handleInputChange('cogs', v)}
                                        placeholder="150000"
                                        tooltip="The total cost of all products sold during the period. Found on your Income Statement."
                                        currency={values.currency}
                                    />
                                    <CalculatorInput
                                        label="Opening Inventory"
                                        value={values.beginningInventory}
                                        onChange={(v) => handleInputChange('beginningInventory', v)}
                                        placeholder="25000"
                                        tooltip="The total value of all unsold products (stock) you had in your warehouse at the very beginning of the time period."
                                        currency={values.currency}
                                    />
                                    <CalculatorInput
                                        label="Closing Inventory"
                                        value={values.endingInventory}
                                        onChange={(v) => handleInputChange('endingInventory', v)}
                                        placeholder="35000"
                                        tooltip="The total value of all unsold products (stock) you still had left in your warehouse at the very end of the time period."
                                        currency={values.currency}
                                    />
                                    <CalculatorInput
                                        label="Analysis Period"
                                        value={values.periodInDays}
                                        onChange={(v) => handleInputChange('periodInDays', v)}
                                        placeholder="365"
                                        tooltip="The number of days the cost of goods sold covers: 365 for a year, the quarter's days for a quarter, the month's days for a month. Defaults to 365 if left blank."
                                        isOptional={true}
                                        hint="Defaults to 365 days (annual)"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-3 flex flex-col">
                    <FadeIn direction="left" delay={0.1}>
                        <ResultSummaryCard
                            title="Inventory Turnover Ratio"
                            isCalculated={hasInputs}
                            primaryResult={{
                                value: results ? results.turnover.toFixed(2) : "0.00",
                                label: "Turnover Ratio",
                                unit: "x"
                            }}
                            secondaryResults={[
                                {
                                    key: "dsi",
                                    label: "Days of Inventory (DSI)",
                                    value: results ? results.daysOfInventory.toFixed(1) : "0",
                                    unit: "Days",
                                    tooltip: "Days sales of inventory: the period's days divided by the turnover ratio. The average days stock sits before it sells.",
                                    icon: CalendarDays,
                                },
                                {
                                    key: "avgInventory",
                                    label: "Average Inventory Value",
                                    value: results ? results.averageInventory : 0,
                                    isCurrency: true,
                                    tooltip: "The average value of stock held during this period, calculated as (Opening + Closing Stock) ÷ 2.",
                                    icon: Boxes,
                                },
                                {
                                    key: "annual",
                                    label: "Turnover Over a Year",
                                    value: results ? results.annualTurnover.toFixed(2) : "0.00",
                                    unit: "x",
                                    tooltip: "The turnover scaled to 365 days, so a month or a quarter compares with a year.",
                                    icon: RefreshCw,
                                }
                            ]}
                            currency={values.currency}
                            emptyResultLabel="Turnover Ratio"
                            showLiveBadge={false}
                            description={results ? `${results.turnover.toFixed(2)} turns in ${results.periodDays} days. Compare it with your own past periods and sellers in your category.` : undefined}
                            checklistItems={[
                                { key: 'cogs', label: 'Cost of Goods Sold', isComplete: values.cogs !== "" },
                                { key: 'beginInv', label: 'Opening Stock Value', isComplete: values.beginningInventory !== "" },
                                { key: 'endInv', label: 'Closing Stock Value', isComplete: values.endingInventory !== "" }
                            ]}
                        />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
