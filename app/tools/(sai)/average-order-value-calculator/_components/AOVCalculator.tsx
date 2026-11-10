"use client"
import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, ShoppingCart } from "lucide-react"
import { FadeIn, CalculatorInput, ResultSummaryCard, CalculatorCardHeader } from "@/app/tools/_shared/components"
import { averageOrderValue } from "./calc"

export function AOVCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [revenue, setRevenue] = useState<number | "">("")
    const [orders, setOrders] = useState<number | "">("")

    const val = (v: number | "") => (v === "" ? 0 : v)

    const handleReset = () => {
        setRevenue("")
        setOrders("")
    }

    const revenueVal = val(revenue)
    const ordersVal = val(orders)
    const result = averageOrderValue(revenue, orders)
    const aov = result ?? 0
    const isValid = result !== null

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-3">
                    <Card className="border border-slate-200 shadow-sm bg-white dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            description="Enter your gross revenue and total order count."
                            onReset={handleReset}
                            guideId="aov-guide"
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />

                        <CardContent className="space-y-3 pt-6">
                            <CalculatorInput
                                groupingTitle="Sales Data"
                                groupingIcon={DollarSign}
                                label="Total Revenue"
                                value={revenue}
                                onChange={setRevenue}
                                isCurrency
                                currency={currency}
                                placeholder="50000.00"
                                max={100000000}
                                tooltip="Enter your total sales revenue for the selected period (before refunds and taxes)."
                            />
                            
                            <CalculatorInput
                                label="Total Orders"
                                value={orders}
                                onChange={setOrders}
                                placeholder="850"
                                max={1000000}
                                tooltip="Enter the total number of completed customer orders during the same period."
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultSummaryCard
                        isCalculated={isValid}
                        currency={currency}
                        emptyMessage="AOV"
                        showLiveBadge={false}
                        primaryResult={{
                            value: aov,
                            label: "Average Order Value (AOV)",
                            isCurrency: true,
                            key: "aov"
                        }}
                        secondaryResults={[
                            {
                                key: "revenue",
                                label: "Total Revenue",
                                value: revenueVal,
                                isCurrency: true,
                                icon: DollarSign,
                                tooltip: "This is the total revenue you entered."
                            },
                            {
                                key: "orders",
                                label: "Total Orders",
                                value: ordersVal,
                                isCurrency: false,
                                icon: ShoppingCart,
                                tooltip: "This is the total number of orders you entered."
                            }
                        ]}
                    />
                </div>
            </div>
        </FadeIn>
    )
}