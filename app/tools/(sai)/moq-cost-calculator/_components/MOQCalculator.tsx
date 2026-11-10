"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorInput } from "@/app/tools/_shared/components/CalculatorInput";
import { ResultSummaryCard } from "@/app/tools/_shared/components/ResultSummaryCard";
import { FadeIn } from "@/app/tools/_shared/components/FadeIn";
import { AlertTriangle, Tag, Truck, TrendingUp, Package, Calculator } from "lucide-react";
import { CalculatorCardHeader } from "@/app/tools/_shared/components/CalculatorCardHeader";
import { MOQBreakdown } from "./MOQBreakdown";
import { moqCost } from "./calc";

export function MOQCalculator() {
    const [currency, setCurrency] = useState("USD");
    const [unitPrice, setUnitPrice] = useState<number | "">("");
    const [moq, setMoq] = useState<number | "">("");
    const [shippingCost, setShippingCost] = useState<number | "">("");
    const [miscCost, setMiscCost] = useState<number | "">("");
    const [monthlySales, setMonthlySales] = useState<number | "">("");

    const handleReset = () => {
        setUnitPrice("");
        setMoq("");
        setShippingCost("");
        setMiscCost("");
        setMonthlySales("");
    }

    const val = (v: number | "") => (v === "" ? 0 : v);

    const n = (v: number | "") => (v === "" ? null : v);
    const result = moqCost({ unitPrice: n(unitPrice), moq: n(moq), shippingCost: n(shippingCost), otherCost: n(miscCost), monthlySales: n(monthlySales) });
    const isCalculated = result !== null;
    const totalInvestment = result?.totalInvestment ?? 0;
    const effectiveCostPerUnit = result?.landedCostPerUnit ?? 0;
    const monthsInventory = result?.monthsOfStock ?? 0;
    const band = result?.band ?? null;
    const riskAssessment = { level: band === "low" ? "good" : band === "high" ? "bad" : "neutral" };

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-3 lg:sticky lg:top-8">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            title="MOQ Details"
                            description="Enter your supplier pricing, shipping, and sales data."
                            onReset={handleReset}
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="space-y-3 pt-6">
                            <div className="space-y-4 max-w-[520px] mx-auto w-full">
                                <CalculatorInput
                                    hideSeparator={true}
                                    groupingTitle="Supplier Details"
                                    groupingIcon={Tag}
                                    label="Cost per Unit"
                                    value={unitPrice}
                                    isCurrency
                                    currency={currency}
                                    onChange={setUnitPrice}
                                    placeholder="10.00"
                                    tooltip="Price of one product from your supplier"
                                />
                                <CalculatorInput
                                    label="Minimum Order Quantity (MOQ)"
                                    value={moq}
                                    onChange={setMoq}
                                    placeholder="500"
                                    tooltip="Minimum number of units you must buy"
                                />
                            </div>
                            <div className="space-y-4 max-w-[520px] mx-auto w-full pt-2">
                                <CalculatorInput
                                    groupingTitle="Additional Costs"
                                    groupingIcon={Truck}
                                    label="Shipping Cost"
                                    isOptional
                                    isCurrency
                                    currency={currency}
                                    value={shippingCost}
                                    onChange={setShippingCost}
                                    placeholder="0.00"
                                    tooltip="Total shipping cost for the order"
                                />
                                <CalculatorInput
                                    label="Other Costs"
                                    isOptional
                                    isCurrency
                                    currency={currency}
                                    value={miscCost}
                                    onChange={setMiscCost}
                                    placeholder="0.00"
                                    tooltip="Extra costs like customs, packaging, or fees"
                                />
                            </div>
                            <div className="space-y-4 max-w-[520px] mx-auto w-full pt-2">
                                <CalculatorInput
                                    groupingTitle="Sales Velocity"
                                    groupingIcon={TrendingUp}
                                    label="Monthly Sales (Units)"
                                    value={monthlySales}
                                    onChange={setMonthlySales}
                                    isOptional
                                    placeholder="150"
                                    tooltip="Number of units you expect to sell per month"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultSummaryCard
                        primaryResult={{
                            value: totalInvestment,
                            isCurrency: true,
                            label: "Total Investment",
                            key: "totalInvestment",
                        }}
                        secondaryResults={[
                            {
                                key: "effectiveCostPerUnit",
                                label: "Landed Cost per Unit",
                                value: effectiveCostPerUnit,
                                isCurrency: true,
                                icon: Calculator,
                                tooltip: "Real cost per product including shipping and extra charges"
                            },
                            {
                                key: "inventoryCoverage",
                                label: "Inventory Coverage (Months)",
                                value: band ? `${monthsInventory.toFixed(1)} Months` : "Add monthly sales",
                                icon: Package,
                                tooltip: "How long your stock will last based on your monthly sales"
                            }
                        ]}
                        currency={currency}
                        isCalculated={isCalculated}
                        emptyMessage="Total Investment"
                        showLiveBadge={band !== null}
                        liveBadgeText={band === "low" ? "Low Risk" : band === "high" ? "High Risk" : "Moderate Risk"}
                        liveBadgeColor={band === "low" ? "emerald" : band === "high" ? "rose" : "amber"}
                    >
                        <FadeIn delay={0.1}>
                            <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] space-y-3 mt-4 dark:bg-slate-900 dark:border-slate-800">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className={`w-5 h-5 mt-0.5 ${riskAssessment.level === "bad" ? "text-rose-700 dark:text-rose-300" : riskAssessment.level === "good" ? "text-blue-500" : "text-amber-700 dark:text-amber-300"}`} />
                                    <div>
                                        <h2 className="font-semibold text-slate-800 mb-1 dark:text-slate-100">
                                            Investment Insight
                                        </h2>
                                        <p className="text-sm text-slate-600 leading-relaxed dark:text-slate-300">
                                            {isCalculated && band !== null ? (
                                                riskAssessment.level === "bad"
                                                    ? <><strong>{moq} units</strong> covers <strong>{monthsInventory.toFixed(1)} months</strong> of stock — too long. Cash is locked up; negotiate a lower MOQ.</>
                                                    : riskAssessment.level === "good"
                                                        ? <><strong>{moq} units</strong> covers <strong>{monthsInventory.toFixed(1)} months</strong> of stock — healthy range. Cash flow looks efficient.</>
                                                        : <><strong>{moq} units</strong> covers <strong>{monthsInventory.toFixed(1)} months</strong> of stock — moderate. Monitor sales to avoid tying up capital.</>
                                            ) : <>Enter your costs and monthly sales to see an investment risk summary.</>}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </ResultSummaryCard>

                    {/* Breakdown Card */}
                    <FadeIn delay={0.2}>
                        <MOQBreakdown
                            unitPrice={val(unitPrice)}
                            moq={val(moq)}
                            shippingCost={val(shippingCost)}
                            miscCost={val(miscCost)}
                            totalInvestment={totalInvestment}
                            currency={currency}
                        />
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    );
}