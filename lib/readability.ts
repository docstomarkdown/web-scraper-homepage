// Pre-read numbers for the review desk (app/(main)/review): how a page reads before a person reads it.
// Everything here is a heuristic to point at a paragraph, not a verdict. Thresholds come from
// docs/writing-style.md: sentences under 25 words, paragraphs of two or three sentences, titles ≤ 60
// characters, descriptions ≤ 160, plain words, no banned words.

export interface Readability {
    words: number;
    sentences: number;
    /** Average words per sentence. */
    avgSentence: number;
    /** Flesch reading ease, 0–100; 60+ reads as plain English, 70+ is the target for a how-to. */
    ease: number;
    /** Flesch-Kincaid grade; 8 or under is the target. */
    grade: number;
    /** Sentences over 25 words. */
    longSentences: number;
    /** Paragraphs over three sentences. */
    longParagraphs: number;
    /** Banned or hype words found, with counts. */
    banned: { word: string; n: number }[];
}

const BANNED = [
    "simple", "simply", "easy", "easily", "just", "obviously", "straightforward", "of course",
    "revolutionary", "seamless", "seamlessly", "powerful", "cutting-edge", "unleash", "supercharge", "effortless", "effortlessly",
    "game-changing", "robust", "leverage", "streamline", "hassle-free", "best-in-class", "world-class", "next-level",
    "niche", "pagination", "paginate", "login", "log in", "click here", "crm",
];

/** Markdown to prose: front matter, comments, code, images, tables, headings and link syntax removed. */
export function proseFromMarkdown(md: string): string {
    return md
        .replace(/^---[\s\S]*?---\s*/, "")
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/```[\s\S]*?```/g, "")
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
        .replace(/^\s*\|.*\|\s*$/gm, "")
        .replace(/^#{1,6}\s.*$/gm, "")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/[*_`>]/g, "");
}

/** Prose from a content object: every string value that reads as copy (not ids, slugs, urls or capture names). */
export function proseFromObject(o: unknown): string {
    const out: string[] = [];
    const walk = (v: unknown, key = "") => {
        if (typeof v === "string") {
            if (/^(ext\/|https?:|\/|[a-z0-9-]+$)/.test(v)) return;
            if (["id", "slug", "page", "feature", "hero", "screenshot", "campaign", "category", "status", "version", "lastUpdated", "lastVerified", "eyebrow", "name", "column", "label"].includes(key)) return;
            if (v.length < 25) return;
            out.push(v.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1"));
        } else if (Array.isArray(v)) v.forEach((x) => walk(x, key));
        else if (v && typeof v === "object") Object.entries(v as Record<string, unknown>).forEach(([k, x]) => walk(x, k));
    };
    walk(o);
    return out.join("\n\n");
}

const syllables = (word: string): number => {
    const w = word.toLowerCase().replace(/[^a-z]/g, "");
    if (!w) return 0;
    if (w.length <= 3) return 1;
    const stripped = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, "");
    const groups = stripped.match(/[aeiouy]{1,2}/g);
    return Math.max(1, groups ? groups.length : 1);
};

/** Readability of a block of prose. Paragraphs are blank-line separated. */
export function readability(prose: string): Readability {
    const paragraphs = prose.split(/\n\s*\n/).map((p) => p.replace(/\s+/g, " ").trim()).filter((p) => p.length > 0);
    const sentencesOf = (p: string) => p.split(/(?<=[.!?])\s+(?=[A-Z0-9"“(])/).map((s) => s.trim()).filter((s) => s.split(/\s+/).length >= 2);
    let words = 0, sentences = 0, syl = 0, longSentences = 0, longParagraphs = 0;
    for (const p of paragraphs) {
        const ss = sentencesOf(p);
        if (ss.length > 3) longParagraphs++;
        for (const s of ss) {
            const ws = s.split(/\s+/).filter((w) => /[a-z0-9]/i.test(w));
            if (ws.length === 0) continue;
            sentences++;
            words += ws.length;
            if (ws.length > 25) longSentences++;
            for (const w of ws) syl += syllables(w);
        }
    }
    const avgSentence = sentences ? words / sentences : 0;
    const avgSyl = words ? syl / words : 0;
    const ease = sentences ? Math.round(206.835 - 1.015 * avgSentence - 84.6 * avgSyl) : 0;
    const grade = sentences ? Math.round((0.39 * avgSentence + 11.8 * avgSyl - 15.59) * 10) / 10 : 0;
    const lower = prose.toLowerCase();
    const banned = BANNED.map((word) => ({ word, n: (lower.match(new RegExp(`(?<![\\w-])${word.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}(?![\\w-])`, "g")) ?? []).length })).filter((b) => b.n > 0);
    return { words, sentences, avgSentence: Math.round(avgSentence * 10) / 10, ease, grade, longSentences, longParagraphs, banned };
}

const STOP = new Set(["how", "to", "a", "an", "the", "and", "or", "of", "for", "from", "into", "in", "on", "with", "your", "you", "any", "every", "free", "no", "code", "chrome", "extension", "spreadsheet", "excel", "sheet", "sheets", "google", "data", "web", "website", "websites", "page", "pages", "one", "run", "at", "once", "scrape", "scraper", "scraping", "collect", "get", "extract", "export", "copy", "its", "it's", "is", "by", "that", "then", "without"]);

/** Pairs of titles that share most of their meaningful words: two pages competing for one search. */
export function titleOverlaps(items: { href: string; title: string }[], threshold = 0.6): Map<string, string[]> {
    const sets = items.map((i) => ({ href: i.href, set: new Set(i.title.toLowerCase().replace(/[^a-z0-9' ]/g, " ").split(/\s+/).filter((w) => w && !STOP.has(w))) }));
    const out = new Map<string, string[]>();
    for (let a = 0; a < sets.length; a++) {
        for (let b = a + 1; b < sets.length; b++) {
            const A = sets[a].set, B = sets[b].set;
            if (A.size < 2 || B.size < 2) continue;
            const inter = Array.from(A).filter((w) => B.has(w)).length;
            const score = inter / Math.min(A.size, B.size);
            if ((score >= threshold && inter >= 3) || score >= 0.85) {
                out.set(sets[a].href, [...(out.get(sets[a].href) ?? []), sets[b].href]);
                out.set(sets[b].href, [...(out.get(sets[b].href) ?? []), sets[a].href]);
            }
        }
    }
    return out;
}
