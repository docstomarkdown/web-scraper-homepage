import { ogImage } from "@/lib/og";

// A titled Open Graph image: /api/og?title=...&subtitle=... Pages pass this URL in their openGraph.images.
// Rendered per request: the title comes from the query string.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const title = (searchParams.get("title") ?? "Web Scraper Pro").slice(0, 120);
    const subtitle = searchParams.get("subtitle")?.slice(0, 200) || undefined;
    return ogImage({ title, subtitle });
}
