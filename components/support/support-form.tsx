"use client"

import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle2, Paperclip, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

/**
 * The public support form. It posts to the admin app (admin.webscraper.pro/api/public/tickets), which
 * creates a private ticket for the support team and emails the person a receipt. Files up to 4 MB in total
 * go with the form; larger ones (up to 50 MB each, e.g. a screen recording) are uploaded right after,
 * straight to storage, with the one-hour token the admin app returns.
 *
 * The extension's links open this page with ?source=extension&type=…&url=…&subject=…&message=…&v=…
 * (chrome-extension-source/lib/config/supportLinks.ts), so the page address, a subject, the details of
 * the collection being reported and the extension version are already filled in. The details the
 * extension adds for the team (everything after DETAILS_MARKER in its message) are shown separately and
 * sent after what the person writes, so they type into an empty box instead of the middle of a template.
 *
 * There's no subject field: the ticket's subject is the first line of the message, after the extension's
 * subject when there is one.
 */

const ADMIN_URL =
  process.env.NEXT_PUBLIC_ADMIN_URL ||
  (process.env.NODE_ENV === "development" ? "http://localhost:3100" : "https://admin.webscraper.pro")
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

const TYPES = [
  { value: "site_problem", label: "A site doesn't scrape correctly" },
  { value: "extension_bug", label: "Problem with the extension" },
  { value: "billing", label: "Plans, payments or purchases" },
  { value: "feature_request", label: "Feature request" },
  { value: "other", label: "Something else" },
  // Offered only to someone sent here with it already chosen (?type=dashboard).
  { value: "dashboard", label: "Problem with Web Scraper Pro Cloud" },
] as const

/** The message box's label and example, worded for each topic. */
const MESSAGE_PROMPTS: Record<string, { label: string; placeholder: string }> = {
  site_problem: {
    label: "What looks wrong?",
    placeholder: "For example: the Price column is empty, or only 10 of the 50 products came through.",
  },
  extension_bug: { label: "What happened?", placeholder: "What you clicked, and what the extension did." },
  billing: { label: "Your question", placeholder: "Ask about plans, payments, invoices or refunds." },
  feature_request: {
    label: "What would you like it to do?",
    placeholder: "What you'd like to collect, and from which sites.",
  },
  dashboard: { label: "What happened?", placeholder: "What you did in Web Scraper Pro Cloud, and what went wrong." },
  other: { label: "How can we help?", placeholder: "Tell us what you need." },
}

/** Where the extension's prefilled message switches from the person's part to the details for the team
 * (lib/services/problemReport.ts in the extension). */
const DETAILS_MARKER = "Added for the support team:"

/** Splits the extension's prefilled message into what the person still has to write and the details it
 * adds for the team. A message without the marker is all the person's. */
function splitPrefill(message: string | null): { own: string; details: string } {
  if (!message) return { own: "", details: "" }
  const at = message.indexOf(DETAILS_MARKER)
  if (at < 0) return { own: message, details: "" }
  const own = message
    .slice(0, at)
    .replace(/^\s*What looks wrong:\s*/i, "")
    .trim()
  return { own, details: message.slice(at + DETAILS_MARKER.length).trim() }
}

/** The ticket's subject: the first line of the message, cut at a word, after the extension's subject. */
function subjectFor(message: string, preset: string | null) {
  const first = message.trim().split(/\n/)[0].trim()
  const snippet = first.length > 90 ? `${first.slice(0, 90).replace(/\s+\S*$/, "")}…` : first
  return (preset ? `${preset}: ${snippet}` : snippet).slice(0, 150)
}

const ACCEPT = ".png,.jpg,.jpeg,.gif,.webp,.mp4,.webm,.mov,.pdf,.csv,.xlsx,.txt,.log,.json"
const SMALL_TOTAL = 4 * 1024 * 1024
const MAX_FILE = 50 * 1024 * 1024

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: { sitekey: string; action?: string; callback: (token: string) => void; "expired-callback"?: () => void; theme?: string }) => string
      reset: (id?: string) => void
    }
  }
}

const fieldClass =
  "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"

function sizeLabel(n: number) {
  return n >= 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`
}

export default function SupportForm() {
  const params = useSearchParams()
  const fromExtension = params.get("source") === "extension"
  const presetType = TYPES.some((t) => t.value === params.get("type")) ? params.get("type")! : "site_problem"
  const topics = TYPES.filter((t) => t.value !== "dashboard" || presetType === "dashboard")
  const prefill = splitPrefill(params.get("message"))

  const [type, setType] = useState(presetType)
  const ask = MESSAGE_PROMPTS[type] ?? MESSAGE_PROMPTS.other
  const [files, setFiles] = useState<File[]>([])
  const [status, setStatus] = useState<"idle" | "sending" | "uploading">("idle")
  const [error, setError] = useState("")
  const [done, setDone] = useState<{ id: number; email: string; failedUploads: string[] } | null>(null)
  const [token, setToken] = useState("")
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | undefined>(undefined)
  const fileInput = useRef<HTMLInputElement>(null)

  // Cloudflare Turnstile: loads its script once and renders the check. Without a site key (local
  // development) there's no check and the admin app doesn't ask for one.
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileRef.current) return
    const render = () => {
      if (!window.turnstile || !turnstileRef.current || widgetId.current) return
      widgetId.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        // The admin app accepts only tokens issued for this action.
        action: "support",
        callback: setToken,
        "expired-callback": () => setToken(""),
        theme: "auto",
      })
    }
    if (window.turnstile) return render()
    if (document.querySelector("script[data-turnstile]")) return
    const script = document.createElement("script")
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
    script.async = true
    script.dataset.turnstile = "1"
    script.onload = render
    document.head.appendChild(script)
    // Runs again when the form comes back after "Send another request", to draw a fresh check.
  }, [done])

  // Refuse what the server would refuse, the moment it's picked: an unsupported type or a file over 50 MB.
  const addFiles = (list: FileList | null) => {
    const picked = Array.from(list ?? [])
    const allowed = ACCEPT.split(",")
    const wrongType = picked.filter((f) => !allowed.includes(`.${f.name.toLowerCase().split(".").pop()}`))
    const tooBig = picked.filter((f) => f.size > MAX_FILE)
    const problems = [
      ...wrongType.map((f) => `${f.name} can't be attached (use images, videos, PDF, CSV, Excel, TXT or JSON)`),
      ...tooBig.map((f) => `${f.name} is over 50 MB`),
    ]
    setError(problems.length ? `${problems.join(". ")}.` : "")
    setFiles((prev) => [...prev, ...picked.filter((f) => !wrongType.includes(f) && !tooBig.includes(f))].slice(0, 10))
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    const form = new FormData(event.currentTarget)
    form.set("type", type)
    const own = String(form.get("description") ?? "").trim()
    form.set("subject", subjectFor(own, params.get("subject")))
    if (prefill.details) form.set("description", `${own}\n\n${DETAILS_MARKER}\n${prefill.details}`)
    form.delete("files")
    // Small files ride with the form; the rest are uploaded one by one afterwards.
    const sorted = [...files].sort((a, b) => a.size - b.size)
    const small: File[] = []
    const large: File[] = []
    let total = 0
    for (const f of sorted) {
      if (small.length < 5 && total + f.size <= SMALL_TOTAL) {
        small.push(f)
        total += f.size
      } else large.push(f)
    }
    for (const f of small) form.append("files", f)
    if (token) form.set("cf-turnstile-response", token)
    if (fromExtension) form.set("source", "extension")

    setStatus("sending")
    try {
      const res = await fetch(`${ADMIN_URL}/api/public/tickets`, { method: "POST", body: form })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(json.error ?? "Your request didn't go through. Try again in a minute.")
        // Point at the field the server objected to.
        // There's no subject box; a subject problem is a message problem.
        const target = json.field === "subject" ? "description" : json.field
        const field = typeof target === "string" ? document.querySelector<HTMLElement>(`#support-${target}`) : null
        field?.focus()
        window.turnstile?.reset(widgetId.current)
        setToken("")
        return
      }
      const failedUploads: string[] = []
      if (large.length) {
        setStatus("uploading")
        for (const f of large) {
          const start = await fetch(`${ADMIN_URL}/api/public/tickets/${json.id}/uploads`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: json.uploadToken, fileName: f.name, size: f.size }),
          })
          const s = await start.json().catch(() => ({}))
          if (!start.ok) {
            failedUploads.push(f.name)
            continue
          }
          const put = await fetch(s.url, { method: "PUT", body: f, headers: { "Content-Type": s.contentType } })
          const done = put.ok
            ? await fetch(`${ADMIN_URL}/api/public/tickets/${json.id}/uploads/${s.attachmentId}/complete`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: json.uploadToken }),
              })
            : null
          if (!done?.ok) failedUploads.push(f.name)
        }
      }
      setDone({ id: json.id, email: String(form.get("email")), failedUploads })
    } catch {
      setError("We couldn't reach our support system. Check your connection and try again.")
    } finally {
      setStatus("idle")
    }
  }

  if (done) {
    return (
      <div className="mt-8 rounded-xl border border-emerald-200 bg-white p-6 dark:border-emerald-900 dark:bg-slate-900">
        <div className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          Request {done.id} received
        </div>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          We&apos;ll reply to <strong className="text-slate-900 dark:text-white">{done.email}</strong>. To add details later, reply to our email
          about request {done.id}.
        </p>
        {done.failedUploads.length > 0 && (
          <p className="mt-3 text-sm text-amber-700 dark:text-amber-400">
            These files didn&apos;t upload: {done.failedUploads.join(", ")}. Attach them to your reply to our email.
          </p>
        )}
        <Button
          type="button"
          variant="outline"
          className="mt-5 dark:border-slate-700 dark:text-slate-200"
          onClick={() => {
            setDone(null)
            setFiles([])
            setToken("")
            widgetId.current = undefined
          }}
        >
          Send another request
        </Button>
      </div>
    )
  }

  const busy = status !== "idle"
  return (
    <form onSubmit={submit} className="mt-8 space-y-5 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <fieldset className="space-y-2">
        <legend className="mb-1 text-sm font-medium text-slate-900 dark:text-white">What do you need help with?</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {topics.map((t) => (
            <label
              key={t.value}
              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                type === t.value
                  ? "border-[#2772ED] bg-blue-50 text-slate-900 dark:bg-blue-950/40 dark:text-white"
                  : "border-slate-200 text-slate-700 hover:border-slate-300 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600"
              }`}
            >
              <input type="radio" name="typeChoice" value={t.value} checked={type === t.value} onChange={() => setType(t.value)} className="accent-[#2772ED]" />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="space-y-1.5">
        <Label htmlFor="support-description" className="text-slate-900 dark:text-white">
          {ask.label}
        </Label>
        <Textarea
          id="support-description"
          name="description"
          required
          minLength={10}
          rows={6}
          defaultValue={prefill.own}
          placeholder={ask.placeholder}
          className={fieldClass}
        />
      </div>

      {prefill.details && (
        <div className="space-y-1.5 rounded-lg bg-slate-50 px-3 py-2.5 dark:bg-slate-800/60">
          <p className="text-xs font-medium text-slate-700 dark:text-slate-300">We&apos;ll include these details from the extension</p>
          <pre className="whitespace-pre-wrap break-words font-sans text-xs text-slate-500 dark:text-slate-400">{prefill.details}</pre>
        </div>
      )}

      {(type === "site_problem" || params.get("url")) && (
        <div className="space-y-1.5">
          <Label htmlFor="support-site" className="text-slate-900 dark:text-white">
            Page address (optional)
          </Label>
          <Input id="support-site" name="site" defaultValue={params.get("url") ?? ""} placeholder="https://www.example.com/search?q=shoes" className={fieldClass} />
          <p className="text-xs text-slate-500 dark:text-slate-400">Paste the address of the page you were scraping. It helps us see the problem for ourselves.</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="support-email" className="text-slate-900 dark:text-white">
            Your email
          </Label>
          <Input id="support-email" name="email" type="email" required placeholder="you@example.com" className={fieldClass} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="support-name" className="text-slate-900 dark:text-white">
            Your name (optional)
          </Label>
          <Input id="support-name" name="name" maxLength={100} className={fieldClass} />
        </div>
      </div>

      <div className="space-y-2">
        <input ref={fileInput} type="file" multiple accept={ACCEPT} className="hidden" onChange={(e) => (addFiles(e.target.files), (e.target.value = ""))} />
        <Button type="button" variant="outline" size="sm" onClick={() => fileInput.current?.click()} disabled={busy} className="dark:border-slate-700 dark:text-slate-200">
          <Paperclip className="mr-1.5 h-4 w-4" aria-hidden="true" /> Attach files
        </Button>
        <p className="text-xs text-slate-500 dark:text-slate-400">Screenshots, a screen recording, PDF, CSV or Excel exports. Up to 50 MB each.</p>
        {files.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {files.map((f, i) => (
              <li key={`${f.name}-${i}`} className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {f.name} <span className="text-slate-500 dark:text-slate-400">{sizeLabel(f.size)}</span>
                <button type="button" aria-label={`Remove ${f.name}`} onClick={() => setFiles(files.filter((_, j) => j !== i))} className="text-slate-500 hover:text-slate-900 dark:hover:text-white">
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {params.get("v") && <input type="hidden" name="extensionVersion" value={params.get("v") ?? ""} />}
      {/* Spam trap: hidden from people, filled in by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {TURNSTILE_SITE_KEY && <div ref={turnstileRef} />}

      {error && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      )}

      <Button type="submit" disabled={busy || (Boolean(TURNSTILE_SITE_KEY) && !token)} className="w-full bg-[#2772ED] text-white hover:bg-[#1f5ec2] sm:w-auto">
        {status === "sending" ? "Sending…" : status === "uploading" ? "Uploading files…" : "Send request"}
      </Button>
    </form>
  )
}
