import type { RateSource } from "@/app/tools/_data/feeRates"

const formatDate = (iso: string) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })

/** One line under a fee calculator: where its rates come from and the day they were checked there. */
export function RatesChecked({ source }: { source: RateSource }) {
    const link = (
        <a href={source.url} target="_blank" rel="noopener" className="text-[#1f5ec2] dark:text-[#7aa7ff] underline underline-offset-2">
            {source.name}&apos;s fee page
        </a>
    )
    return (
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {source.checked ? (
                <>Rates from {link}, checked on {formatDate(source.checked)}. Fees change; check there before you rely on a figure.</>
            ) : (
                <>These are {source.name}&apos;s usual published rates, but {link} couldn&apos;t be checked for this page. Check the current rates there before you rely on a figure.</>
            )}
        </p>
    )
}
