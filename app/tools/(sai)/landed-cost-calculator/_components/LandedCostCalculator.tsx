"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorInput } from "@/app/tools/_shared/components/CalculatorInput";
import { ResultSummaryCard } from "@/app/tools/_shared/components/ResultSummaryCard";
import { FadeIn } from "@/app/tools/_shared/components/FadeIn";
import { CalculatorCardHeader } from "@/app/tools/_shared/components/CalculatorCardHeader";
import { Package, Ship, Percent, DollarSign, Receipt, TrendingUp, BarChart3, Info, Lightbulb } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { LandedCostBreakdown } from "./LandedCostBreakdown";
import { landedCost, type DutyBasis } from "./calc";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function LandedCostCalculator() {
    const [currency, setCurrency] = useState("USD");
    const [productCost, setProductCost] = useState<number | "">("");
    const [units, setUnits] = useState<number | "">("");
    const [shippingCost, setShippingCost] = useState<number | "">("");
    const [dutyRate, setDutyRate] = useState<number | "">("");
    const [insuranceCost, setInsuranceCost] = useState<number | "">("");
    const [otherFees, setOtherFees] = useState<number | "">("");
    const [basis, setBasis] = useState<DutyBasis>("CIF");

    const handleReset = () => {
        setProductCost("");
        setUnits("");
        setShippingCost("");
        setDutyRate("");
        setInsuranceCost("");
        setOtherFees("");
        setBasis("CIF");
    };

    const val = (v: number | "") => (v === "" ? 0 : v);

    const currencySymbols: Record<string, string> = {
        USD: "$", EUR: "€", GBP: "£", INR: "₹", AUD: "A$", CAD: "C$", JPY: "¥", CNY: "¥",
        AED: "AED", SGD: "S$", HKD: "HK$", CHF: "Fr", MXN: "MX$", BRL: "R$", KRW: "₩",
        RUB: "₽", ZAR: "R", SEK: "kr", NOK: "kr", DKK: "kr", PLN: "zł", THB: "฿",
        IDR: "Rp", MYR: "RM", PHP: "₱", VND: "₫", TRY: "₺", SAR: "﷼", NZD: "NZ$",
        EGP: "E£", PKR: "₨", BDT: "৳", NGN: "₦", KES: "KSh"
    };
    const symbol = currencySymbols[currency] || "$";

    const shipping = val(shippingCost);
    const insurance = val(insuranceCost);
    const fees = val(otherFees);
    const result = landedCost({
        unitCost: val(productCost), units: val(units), shipping, insurance,
        dutyPercent: val(dutyRate), otherFees: fees, basis,
    });
    const totalProductCost = result?.goodsValue ?? 0;
    const dutyAmount = result?.duty ?? 0;
    const totalLandedCost = result?.total ?? 0;
    const landedCostPerUnit = result?.perUnit ?? 0;
    const costUplift = result?.increasePercent ?? 0;

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
            maximumFractionDigits: 2,
        }).format(val);
    };

    const isCalculated = result !== null;

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-3 lg:sticky lg:top-8">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            description="Enter your product and all import cost details below."
                            onReset={handleReset}
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="space-y-3 pt-6">
                            <div className="space-y-4 max-w-[520px] mx-auto w-full">
                                <CalculatorInput
                                    hideSeparator={true}
                                    groupingTitle="Product Details"
                                    groupingIcon={Package}
                                    label="Cost per Unit"
                                    value={productCost}
                                    onChange={setProductCost}
                                    placeholder="25.00"
                                    max={1000000}
                                    isCurrency
                                    currency={currency}
                                    tooltip="Price of one product from your supplier"
                                />
                                <CalculatorInput
                                    label="Quantity (Units)"
                                    value={units}
                                    onChange={setUnits}
                                    placeholder="100"
                                    max={1000000}
                                    suffix="units"
                                    tooltip="Number of units you are ordering"
                                />
                            </div>
                            <div className="space-y-4 max-w-[520px] mx-auto w-full pt-2">
                                <CalculatorInput
                                    groupingTitle="Shipping & Insurance"
                                    groupingIcon={Ship}
                                    label="Shipping Cost"
                                    value={shippingCost}
                                    onChange={setShippingCost}
                                    placeholder="150.00"
                                    max={1000000}
                                    isCurrency
                                    currency={currency}
                                    isOptional
                                    tooltip="Total shipping cost for the shipment"
                                />
                                <CalculatorInput
                                    label="Insurance Cost"
                                    value={insuranceCost}
                                    onChange={setInsuranceCost}
                                    placeholder="50.00"
                                    max={1000000}
                                    isCurrency
                                    currency={currency}
                                    isOptional
                                    tooltip="Cost to protect your shipment from damage or loss"
                                />
                            </div>
                            <div className="space-y-4 max-w-[520px] mx-auto w-full pt-2">
                                <CalculatorInput
                                    groupingTitle="Taxes & Fees"
                                    groupingIcon={Receipt}
                                    label="Import Duty"
                                    value={dutyRate}
                                    onChange={setDutyRate}
                                    placeholder="5"
                                    max={100}
                                    suffix="%"
                                    isOptional
                                    tooltip="Percentage charged as customs or import tax"
                                />
                                <div className="space-y-2 pt-1">
                                    <p className="text-base font-medium text-slate-700 dark:text-slate-200">Duty charged on</p>
                                    <RadioGroup value={basis} onValueChange={(v: string) => setBasis(v as DutyBasis)} className="flex flex-wrap gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="CIF" id="duty-cif" />
                                            <Label htmlFor="duty-cif">CIF: goods + freight + insurance</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="FOB" id="duty-fob" />
                                            <Label htmlFor="duty-fob">FOB: goods only</Label>
                                        </div>
                                    </RadioGroup>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">The EU, UK and India charge duty on CIF value; the US charges it on the goods value, so pick FOB there.</p>
                                </div>
                                <CalculatorInput
                                    label="Other Fees"
                                    value={otherFees}
                                    onChange={setOtherFees}
                                    placeholder="25.00"
                                    max={1000000}
                                    isCurrency
                                    currency={currency}
                                    isOptional
                                    tooltip="Extra charges like customs clearance or handling"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultSummaryCard
                        primaryResult={{
                            value: landedCostPerUnit,
                            label: "Landed Cost Per Unit",
                            key: "landedCostPerUnit",
                            isCurrency: true
                        }}
                        secondaryResults={[
                            {
                                key: "totalLandedCost",
                                label: "Total Landed Cost",
                                value: totalLandedCost,
                                isCurrency: true,
                                icon: DollarSign,
                                tooltip: "Total cost of the entire order including all expenses"
                            },
                            {
                                key: "costUplift",
                                label: "Cost Increase",
                                value: `+${costUplift.toFixed(1)}%`,
                                icon: TrendingUp,
                                tooltip: "How much extra cost is added beyond product price"
                            }
                        ]}
                        currency={currency}
                        isCalculated={isCalculated}
                        emptyMessage="Landed Cost Per Unit"
                        liveBadgeText={`Duty on ${basis}`}
                        liveBadgeColor="slate"
                    />

                    {/* Landed Cost Breakdown — outside main result card */}
                    <FadeIn delay={0.2}>
                        <LandedCostBreakdown
                            totalProductCost={totalProductCost}
                            shippingAndInsurance={shipping + insurance}
                            importDutiesAndFees={dutyAmount + fees}
                            totalLandedCost={totalLandedCost}
                            costIncrease={costUplift}
                            currency={currency}
                        />
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    );
}