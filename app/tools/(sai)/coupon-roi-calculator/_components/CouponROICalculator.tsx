"use client"
import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DollarSign, Percent, ShoppingCart, Tag, BarChart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { CalculatorCardHeader, CalculatorInput, FadeIn, ResultSummaryCard } from "@/app/tools/_shared/components"
import { CouponROIBreakdown } from "./CouponROIBreakdown"
import { calculateCouponRoi } from "./calc"
export function CouponROICalculator() {
    const [currency, setCurrency] = useState("USD")
    const [campaignCost, setCampaignCost] = useState<number | "">("")
    const [couponsIssued, setCouponsIssued] = useState<number | "">("")
    const [redemptions, setRedemptions] = useState<number | "">("")
    const [aov, setAov] = useState<number | "">("")
    const [discountAmount, setDiscountAmount] = useState<number | "">("")
    const [margin, setMargin] = useState<number | "">("") // Profit margin %
    const result = calculateCouponRoi({ campaignCost, redemptions, aov, discountPerOrder: discountAmount, marginPct: margin, couponsIssued })
    const roi = result?.roi ?? 0
    const netProfit = result?.profit ?? 0
    const handleReset = () => {
        setCampaignCost("")
        setCouponsIssued("")
        setRedemptions("")
        setAov("")
        setDiscountAmount("")
        setMargin("")
    }

    const isValid = result !== null

    return (
        <FadeIn className="w-full max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs */}
                <Card className="lg:col-span-7 border-none shadow-lg bg-white/80 backdrop-blur-sm ring-1 ring-slate-900/5 dark:bg-slate-900/80">
                    <CalculatorCardHeader
                        description="Enter your coupon efficiency metrics."
                        onReset={handleReset}
                        guideId="tool-guide"
                        currency={currency}
                        onCurrencyChange={setCurrency}
                    />
                    <CardContent className="p-4 md:p-6 pb-10 md:pb-14 space-y-3 flex flex-col">
                        <div className="space-y-6 max-w-[520px] mx-auto w-full">
                            {/* Campaign Basics */}
                            <div className="space-y-3">
                                <CalculatorInput
                                    hideSeparator={true}
                                    groupingTitle="Campaign Basics"
                                    groupingIcon={DollarSign}
                                    label="Campaign Cost"
                                    value={campaignCost}
                                    onChange={setCampaignCost}
                                    placeholder="500"
                                    tooltip="Total amount spent to run the coupon campaign."
                                    currency={currency}
                                />
                                <CalculatorInput
                                    label="Number of Coupons Issued"
                                    value={couponsIssued}
                                    onChange={setCouponsIssued}
                                    placeholder="5000"
                                    tooltip="Total coupons sent out. Used for the redemption rate."
                                    isOptional={true}
                                />
                                <CalculatorInput
                                    label="Redemptions"
                                    value={redemptions}
                                    onChange={setRedemptions}
                                    placeholder="100"
                                    tooltip="Number of coupons actually used."
                                />
                            </div>
                            {/* Sales Data */}
                            <div className="space-y-3">
                                <CalculatorInput
                                    groupingTitle="Sales Data"
                                    groupingIcon={ShoppingCart}
                                    label="Average Order Value"
                                    value={aov}
                                    onChange={setAov}
                                    placeholder="50.00"
                                    tooltip="What a coupon order was worth before the discount."
                                    currency={currency}
                                />
                                <CalculatorInput
                                    label="Discount Amount (per order)"
                                    value={discountAmount}
                                    onChange={setDiscountAmount}
                                    placeholder="10.00"
                                    tooltip="Discount applied per order."
                                    currency={currency}
                                />
                                <CalculatorInput
                                    label="Profit Margin"
                                    value={margin}
                                    onChange={setMargin}
                                    placeholder="40"
                                    max={100}
                                    tooltip="Your gross margin before the discount: the share of the order value left after the cost of the goods."
                                    suffix="%"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {/* Results */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultSummaryCard
                        isCalculated={isValid}
                        currency={currency}
                        emptyMessage="net profit ROI"
                        liveBadgeText="Break-even"
                        liveBadgeColor="slate"
                        validationBadgeText={{ valid: "Positive ROI", invalid: "Negative ROI" }}
                        primaryResult={{
                            value: roi.toFixed(2),
                            label: "Return on Investment",
                            isCurrency: false,
                            unit: "%",
                            key: "roi"
                        }}
                        secondaryResults={[
                            {
                                key: "netProfit",
                                label: "Net Profit",
                                value: netProfit,
                                isCurrency: true,
                                tooltip: "Revenue after discounts, minus the cost of goods and the campaign cost."
                            },
                            {
                                key: "redemptionRate",
                                label: "Redemption Rate",
                                value: result?.redemptionRate != null ? `${result.redemptionRate.toFixed(2)}%` : "—",
                                tooltip: result?.redemptionRate != null ? "Redemptions divided by coupons issued." : "Enter coupons issued (at least the number of redemptions) to see this."
                            }
                        ]}
                        checklistItems={[
                            { key: "cc", label: "Campaign Cost", isComplete: campaignCost !== "" },
                            { key: "red", label: "Redemptions", isComplete: redemptions !== "" },
                            { key: "aov", label: "Avg Order Value", isComplete: aov !== "" },
                            { key: "da", label: "Discount Amount", isComplete: discountAmount !== "" },
                            { key: "pm", label: "Profit Margin", isComplete: margin !== "" },
                        ]}
                        profitLossKey="netProfit"
                        dynamicMessages={{
                            positive: "The redeemed orders earned more than the campaign cost.",
                            negative: "The redeemed orders earned less than the campaign cost.",
                            neutral: "The campaign broke even."
                        }}
                    >
                    </ResultSummaryCard>
                    {/* Breakdown */}
                    <CouponROIBreakdown
                        netProfit={netProfit}
                        cogs={result?.cogs ?? 0}
                        campaignCost={result ? Number(campaignCost) : 0}
                        totalDiscount={result?.totalDiscount ?? 0}
                        grossRevenue={result?.grossRevenue ?? 0}
                        currency={currency}
                        className="mt-3"
                    />
                </div>
            </div>
        </FadeIn>
    )
}