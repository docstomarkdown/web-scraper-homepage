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

// The four problems most requests describe, each with what to try before writing in. Facts from release 1.3.0:
// list detection and "Choose an item on the page" (List tab), "Collect more pages" with Next page / Load more /
// Auto scroll and "Stop after", contact details from each business's own website, and the verification pause.
const HELP: { q: string; a: React.ReactNode }[] = [
  {
    q: "Nothing was detected",
    a: (
      <>
        The List tab shows the lists it found under <strong className="font-medium text-slate-800 dark:text-slate-100">Choose from lists we found</strong>. If none is the one you want, click{" "}
        <strong className="font-medium text-slate-800 dark:text-slate-100">Choose an item on the page</strong> and click one entry; every similar entry is picked with it. Pages that load their list after a moment need a click on{" "}
        <strong className="font-medium text-slate-800 dark:text-slate-100">Rescan page</strong> once the list is on screen. A page behind a sign-in works only once you have signed in yourself.
      </>
    ),
  },
  {
    q: "Only the first page came back",
    a: (
      <>
        Before you click Collect, choose <strong className="font-medium text-slate-800 dark:text-slate-100">Collect more pages</strong> and confirm how the list continues: a Next page link, a Load more button or scrolling. Set{" "}
        <strong className="font-medium text-slate-800 dark:text-slate-100">Stop after</strong> to the pages you want. Keep the tab in front while it runs; a background tab pages slowly. In chat, say &quot;every page&quot; or click Collect every page on the card under the result.
      </>
    ),
  },
  {
    q: "Most rows have no email",
    a: (
      <>
        Emails come from each business&apos;s own website, never from the directory or map listing, and many small businesses publish none. Those rows keep their phone and website. Check that the table has a Website column (the{" "}
        <strong className="font-medium text-slate-800 dark:text-slate-100">Add contact details</strong> button needs one), and that the Emails column isn&apos;t hidden under Columns. A site that shows its email as an image or behind a contact form can&apos;t be read.
      </>
    ),
  },
  {
    q: "The site asked me to verify",
    a: (
      <>
        The run pauses when a site shows a check. Complete it in the tab yourself, keep that tab in front, and the run carries on or can be started again; what was collected so far is kept. The extension never completes a check or signs in for you. Smaller runs and a pause between them see fewer checks.
      </>
    ),
  },
]

const help = (
  <section className="mt-12">
    <h2 className="text-base font-semibold text-slate-900 dark:text-white">Before you write: the four things people ask most</h2>
    <div className="mt-3 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
      {HELP.map((h) => (
        <details key={h.q} className="group px-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 text-base font-semibold text-slate-900 dark:text-white [&::-webkit-details-marker]:hidden">
            <h3 className="text-base">{h.q}</h3>
            <span className="text-xl leading-none text-slate-500 transition-transform group-open:rotate-45 dark:text-slate-400" aria-hidden="true">+</span>
          </summary>
          <p className="pb-4 text-base leading-[1.65] text-slate-700 dark:text-slate-200">{h.a}</p>
        </details>
      ))}
    </div>
  </section>
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
        <SupportForm header={header} tips={<>{help}{tips}</>} />
      </div>
    </main>
  )
}
