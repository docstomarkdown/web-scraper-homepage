import type { Metadata } from "next"
import { Suspense } from "react"
import SupportForm from "@/components/support/support-form"

export const metadata: Metadata = {
  title: "Get help with Web Scraper Pro",
  description:
    "Report a site that doesn't scrape correctly, a problem with the extension, or ask about plans and payments. Attach screenshots, exports or a screen recording.",
}

export default function SupportPage() {
  return (
    <div className="bg-slate-50 py-16 dark:bg-slate-950 sm:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Get help</h1>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
          Tell us what went wrong or what you need. A person on the Web Scraper Pro team reads every request and replies by
          email, usually within one working day.
        </p>
        <Suspense fallback={null}>
          <SupportForm />
        </Suspense>
        <section className="mt-12 space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">What helps us fix a problem quickly</h2>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>The address of the page you were scraping, copied from the browser&apos;s address bar.</li>
            <li>What you expected in the table, and what you got instead: an empty column, wrong rows, nothing at all.</li>
            <li>A screenshot of the page and of the extension, or a short screen recording.</li>
            <li>The export file, if the problem shows in the data (CSV or Excel).</li>
          </ul>
          <p>
            We use what you send only to answer your request. Don&apos;t include passwords or payment card numbers; we never need
            them.
          </p>
        </section>
      </div>
    </div>
  )
}
