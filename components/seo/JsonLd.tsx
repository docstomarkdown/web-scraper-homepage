// Structured data (schema.org JSON-LD) for a page. Pass one object or several; each gets "@context".
// Only facts that are true and visible on the page go in here: no ratings, counts or offers we don't show.
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
    const items = (Array.isArray(data) ? data : [data]).map((d) => ({ "@context": "https://schema.org", ...d }));
    return (
        <script
            type="application/ld+json"
            // JSON-LD is data, not markup; "<" is escaped so a value can't close the script tag.
            dangerouslySetInnerHTML={{ __html: JSON.stringify(items.length === 1 ? items[0] : items).replace(/</g, "\\u003c") }}
        />
    );
}

/** FAQPage data from question/answer pairs, for pages that show them as text. */
export function faqJsonLd(faqs: { q: string; a: string }[]) {
    return {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
    };
}

/** BreadcrumbList data from [label, absolute or site-relative href] pairs, home first. */
export function breadcrumbJsonLd(items: { name: string; href: string }[], base: string) {
    return {
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: it.name,
            item: it.href.startsWith("http") ? it.href : `${base.replace(/\/$/, "")}${it.href}`,
        })),
    };
}
