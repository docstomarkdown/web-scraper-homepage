/**
 * What the support form (components/support/support-form.tsx) can be opened with.
 *
 * The extension's and the dashboard's links fill in the form with these keys: the topic (type), the page the
 * person was on (url), a subject, a message with the collection's details, the extension version (v) and
 * source=extension. The keys and values are the same in both places they can arrive:
 *
 * - the fragment: /support#source=extension&type=site_problem&url=…&subject=…&message=…&v=…
 *   Browsers never send the fragment to the server, so this is the form links should use.
 * - the query string: /support?source=extension&type=…&url=… (older extension versions).
 *
 * Values are URL-encoded as URLSearchParams writes them (a space may be "+" or "%20").
 */
export type Prefill = Partial<Record<"source" | "type" | "url" | "subject" | "message" | "v", string>>

declare global {
  interface Window {
    /** What the support page's inline script took from the address while the page loaded. */
    __supportPrefill?: Prefill
  }
}

/**
 * Takes the prefill out of the address bar and returns it; a key in the fragment wins over the same key in the
 * query string. The address is replaced with the same page minus those keys (other parameters and an unrelated
 * fragment stay), so the page address, message and collection details don't end up in analytics page views,
 * session recordings or the browser history.
 *
 * The support page also inlines this function's source as a script that runs while the HTML is still being
 * parsed, before Google Analytics and Clarity start (both start after hydration). That's why it uses no imports
 * and no variables from outside its own body.
 */
export function takePrefillFromAddress(): Prefill {
  const keys = ["source", "type", "url", "subject", "message", "v"] as const
  const prefill: Prefill = {}
  try {
    const address = new URL(window.location.href)
    const fragment = new URLSearchParams(address.hash.slice(1))
    let changed = false
    for (const key of keys) {
      const value = fragment.get(key) ?? address.searchParams.get(key)
      if (value !== null) prefill[key] = value
      if (address.searchParams.has(key)) {
        address.searchParams.delete(key)
        changed = true
      }
    }
    if (keys.some((key) => fragment.has(key))) {
      address.hash = ""
      changed = true
    }
    if (changed) window.history.replaceState(window.history.state, "", address.pathname + address.search + address.hash)
  } catch {
    // An address the browser can't parse, or a history call it refuses: the form starts empty.
  }
  return prefill
}

/** The inline script for the support page: runs takePrefillFromAddress and keeps the result for the form. */
export const takePrefillScript = `window.__supportPrefill=(${takePrefillFromAddress.toString()})();`
