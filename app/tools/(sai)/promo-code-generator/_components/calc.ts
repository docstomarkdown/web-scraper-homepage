/** Promo code generation. Pure functions, no imports; randomness comes from crypto.getRandomValues. */

export const MAX_CODES = 50
export const MAX_LENGTH = 32
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const DIGITS = "0123456789"
const SYMBOLS = "!@#$%^&*"
/** Characters that read alike when typed from print or a screen: 0/O and 1/I. */
export const LOOK_ALIKE = "0O1I"

export interface CharsetOptions {
    uppercase: boolean
    numbers: boolean
    symbols: boolean
    avoidLookAlike: boolean
}

export function buildCharset(o: CharsetOptions): string {
    let chars = (o.uppercase ? UPPER : "") + (o.numbers ? DIGITS : "") + (o.symbols ? SYMBOLS : "")
    if (chars === "") chars = UPPER + DIGITS
    if (o.avoidLookAlike) chars = chars.split("").filter((c) => !LOOK_ALIKE.includes(c)).join("")
    return chars
}

/** How many different random parts a charset and length allow (capped so it stays a safe number). */
export function maxUnique(charsetSize: number, length: number): number {
    return Math.min(Number.MAX_SAFE_INTEGER, Math.pow(charsetSize, length))
}

/** A uniform random integer in [0, n), from the Web Crypto API (no modulo bias). */
export function cryptoRandomInt(n: number): number {
    const buf = new Uint32Array(1)
    const limit = Math.floor(0x100000000 / n) * n
    let x = 0
    do {
        globalThis.crypto.getRandomValues(buf)
        x = buf[0]
    } while (x >= limit)
    return x % n
}

export interface GenerateOptions extends CharsetOptions {
    prefix: string
    suffix: string
    length: number
    count: number
}

export interface GenerateResult {
    codes: string[]
    /** Codes asked for (after the 50 limit). */
    requested: number
    /** True when the length and characters allow fewer unique codes than requested. */
    limitedBySpace: boolean
}

/** Makes `count` distinct codes. Prefix and suffix are kept exactly as typed. */
export function generateCodes(o: GenerateOptions, randomInt: (n: number) => number = cryptoRandomInt): GenerateResult {
    const chars = buildCharset(o)
    const length = Math.min(Math.max(1, Math.floor(o.length) || 1), MAX_LENGTH)
    const requested = Math.min(Math.max(1, Math.floor(o.count) || 1), MAX_CODES)
    const space = maxUnique(chars.length, length)
    const target = Math.min(requested, space)
    const seen = new Set<string>()
    if (space <= 10000) {
        // Small space: list every random part, then draw without replacement.
        const all: string[] = []
        const walk = (s: string) => { if (s.length === length) { all.push(s); return } for (const c of chars) walk(s + c) }
        walk("")
        for (let i = all.length - 1; i > 0; i--) {
            const j = randomInt(i + 1)
            const t = all[i]; all[i] = all[j]; all[j] = t
        }
        for (let i = 0; i < target; i++) seen.add(all[i])
    } else {
        while (seen.size < target) {
            let s = ""
            for (let i = 0; i < length; i++) s += chars[randomInt(chars.length)]
            seen.add(s)
        }
    }
    return {
        codes: Array.from(seen, (r) => `${o.prefix}${r}${o.suffix}`),
        requested,
        limitedBySpace: space < requested,
    }
}
