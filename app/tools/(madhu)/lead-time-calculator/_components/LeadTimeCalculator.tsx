"use client"
import React, { useState, useEffect, useMemo } from "react"
import {
    Clock
} from "lucide-react"

import { 
    FadeIn, 
    CalculatorInput,
    CalculatorCardHeader,
    ResultDateCard 
} from "@/app/tools/_shared/components"
import { leadTime, arrivalDate } from "./calc"
import { Card, CardContent } from "@/components/ui/card"

interface LeadTimeState {
    supplier: number | ""
    shipping: number | ""
    buffer: number | ""
}

const DEFAULT_STATE: LeadTimeState = {
    supplier: "",
    shipping: "",
    buffer: ""
}

export function LeadTimeCalculator() {
    const [values, setValues] = useState<LeadTimeState>(DEFAULT_STATE)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleInputChange = (field: keyof LeadTimeState, value: string | number) => {
        setValues(prev => ({ ...prev, [field]: value === "" ? "" : Number(value) }))
    }

    const result = useMemo(() => leadTime({
        supplierDays: values.supplier === "" ? null : values.supplier,
        shippingDays: values.shipping === "" ? null : values.shipping,
        bufferDays: values.buffer === "" ? null : values.buffer,
    }), [values])
    const hasInputs = result !== null

    const deliveryDate = useMemo(() => {
        if (!mounted || !result) return "Waiting for inputs..."
        return arrivalDate(new Date(), result.totalDays).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }, [result, mounted])

    const handleReset = () => setValues(DEFAULT_STATE)

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden flex flex-col rounded-3xl dark:border-slate-800 dark:bg-slate-900">
                        <CalculatorCardHeader
                            title="Calculator Inputs"
                            description="Enter your supplier timeline details below."
                            onReset={handleReset}
                        />
                        <CardContent className="p-6 md:p-8 pb-12 md:pb-16 flex-1 flex flex-col">
                            
                            <div className="space-y-3">
                                <CalculatorInput
                                    label="Supplier Time"
                                    value={values.supplier}
                                    onChange={(v) => handleInputChange('supplier', v)}
                                    placeholder="14"
                                    tooltip="Total processing & production time"
                                />
                                <CalculatorInput
                                    label="Shipping Time"
                                    value={values.shipping}
                                    onChange={(v) => handleInputChange('shipping', v)}
                                    placeholder="7"
                                    tooltip="Transit + Customs clearance duration"
                                />
                                <CalculatorInput
                                    label="Safety Buffer"
                                    value={values.buffer}
                                    onChange={(v) => handleInputChange('buffer', v)}
                                    placeholder="3"
                                    tooltip="Extra days for unforeseen delays"
                                    isOptional={true}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 flex flex-col space-y-8">
                    <ResultDateCard
                        title="Total lead time"
                        isCalculated={hasInputs}
                        showLiveBadge={false}
                        checklistItems={[
                            { label: "Enter Supplier Time", isComplete: values.supplier !== "" },
                            { label: "Enter Shipping Time", isComplete: values.shipping !== "" }
                        ]}
                        primaryResult={{
                            label: "Total Lead Time (part days round up)",
                            value: result ? result.totalDays : 0,
                            unit: "Days"
                        }}
                        dateSection={{
                            label: "Est. Delivery Date",
                            value: deliveryDate,
                            emptyText: "Waiting for inputs..."
                        }}
                        infoCard={{
                            title: "",
                            children: (
                                <div className="space-y-4 pt-1">
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 dark:bg-slate-800/60 dark:border-slate-800">
                                            <p className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 tracking-wider">Supplier Time</p>
                                            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{result ? Math.round(result.share.supplier) : 0}%</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 dark:bg-slate-800/60 dark:border-slate-800">
                                            <p className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 tracking-wider">Shipping Time</p>
                                            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{result ? Math.round(result.share.shipping) : 0}%</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 dark:bg-slate-800/60 dark:border-slate-800">
                                            <p className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 tracking-wider">Safety Buffer</p>
                                            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{result ? Math.round(result.share.buffer) : 0}%</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

