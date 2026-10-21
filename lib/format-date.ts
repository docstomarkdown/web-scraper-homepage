/** "25 September 2026" from an ISO date, the form used in prose site-wide. */
export function formatDate(iso: string): string {
    if (!iso) return "";
    const d = new Date(`${iso}T00:00:00Z`);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
