import type { Metadata } from "next"
import SupportForm from "@/components/support/support-form"
import { takePrefillScript } from "@/components/support/prefill"

export const metadata: Metadata = {
  title: "Get help",
  alternates: { canonical: "/support" },
  description:
    "Report a site that doesn't scrape correctly, a problem with the extension, or ask a question about the extension. Attach screenshots, exports or a screen recording.",
}

const header = (
  <>
    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Get help</h1>
    <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
      Tell us what went wrong or what you need. A person on the Web Scraper Pro team reads every request and replies by
      email, usually within one working day.
    </p>
  </>
)

const tips = (
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
)

export default function SupportPage() {
  return (
    <main id="main" className="bg-slate-50 py-16 dark:bg-slate-950 sm:py-24">
      {/* Runs while the page is parsed, before analytics start: moves the extension's prefill (page address,
          message, collection details) out of the address bar. See components/support/prefill.ts. */}
      <script dangerouslySetInnerHTML={{ __html: takePrefillScript }} />
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* The form shows the header on its own until it has read the prefill, so the page never flashes empty. */}
        <SupportForm header={header} tips={tips} />
      </div>
    </main>
  )
}
