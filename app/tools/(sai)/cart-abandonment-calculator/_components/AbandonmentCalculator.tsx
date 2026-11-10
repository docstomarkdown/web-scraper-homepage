"use client"
import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ShoppingCart, RotateCcw, Percent, UserMinus } from "lucide-react"
import { cn } from "@/lib/utils"
import { CalculatorCardHeader, CalculatorInput, FadeIn, ResultSummaryCard } from "@/app/tools/_shared/components"
import { calculateAbandonment, ordersExceedCarts, RECOVERY_SHARE } from "./calc"
export function AbandonmentCalculator() {
    const [carts, setCarts] = useState<number | "">("")
    const [transactions, setTransactions] = useState<number | "">("")
    const handleReset = () => {
        setCarts("")
        setTransactions("")
    }
    const result = calculateAbandonment(carts, transactions)
    const tooMany = ordersExceedCarts(carts, transactions)
    const rate = result?.rate ?? 0
    const isValid = result !== null
    const band = result?.band
    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-3 lg:sticky lg:top-8">
                    <Card className="border border-slate-200 shadow-sm bg-white dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            description="Enter cart and transaction data."
                            onReset={handleReset}
                            guideId="abandonment-guide"
                        />
                        <CardContent className="space-y-3 pt-6">
                            <CalculatorInput
                                groupingTitle="Checkout Performance"
                                groupingIcon={ShoppingCart}
                                label="Number of Carts Created"
                                value={carts}
                                onChange={setCarts}
                                placeholder="500"
                                max={1000000}
                                tooltip="Total number of shopping carts created by users during a chosen period."
                            />
                            <CalculatorInput
                                label="Completed Transactions"
                                value={transactions}
                                onChange={setTransactions}
                                placeholder="150"
                                max={1000000}
                                tooltip="Number of carts that successfully resulted in a purchase."
                                hint={tooMany ? "Completed transactions can't be more than carts created. Check both are for the same period." : undefined}
                            />
                        </CardContent>
                    </Card>
                </div>
                {/* Results Section */}
                <div className="lg:col-span-5 space-y-3">
                    <ResultSummaryCard
                        title="Cart Abandonment Rate"
                        isCalculated={isValid}
                        liveBadgeText={
                            band === "better-than-most" ? "Below 65%" : band === "usual" ? "Usual range" : "Above 80%"
                        }
                        liveBadgeColor={
                            band === "better-than-most" ? "emerald" : band === "usual" ? "amber" : "rose"
                        }
                        primaryResult={{
                            value: rate.toFixed(2),
                            unit: "%"
                        }}
                        secondaryResults={[
                            {
                                key: "abandoned",
                                label: "Abandoned Carts",
                                value: (result?.abandoned ?? 0).toLocaleString(),
                                icon: UserMinus,
                                tooltip: "Number of carts that did not convert into purchases."
                            },
                            {
                                key: "conversion",
                                label: "Conversion Rate",
                                value: (result?.checkoutRate ?? 0).toFixed(2),
                                unit: "%",
                                icon: Percent,
                                tooltip: "How many shoppers completed checkout out of all carts created."
                            },
                            {
                                key: "recovered",
                                label: `Orders from Recovering ${RECOVERY_SHARE * 100}%`,
                                value: Math.round((result?.recoveredOrders ?? 0) * 100) / 100,
                                icon: RotateCcw,
                                tooltip: `Extra orders if you won back ${RECOVERY_SHARE * 100}% of the abandoned carts.`
                            }
                        ]}
                        emptyMessage="Abandonment rate"
                        description={
                            band === "better-than-most"
                                ? "Below 65%: better than most stores."
                                : band === "usual"
                                    ? "Between 65% and 80%: the usual range. Track the trend month to month."
                                    : "Above 80%: worth checking the checkout for friction."
                        }
                    />
                </div>
            </div>
        </FadeIn>
    )
}
