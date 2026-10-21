import { NextResponse, type NextRequest } from "next/server";
import { productConfig } from "@/config/product";

// Tracking links for videos, guides and store slides: /go/<campaign> or /go/<medium>/<campaign>.
// Each one redirects to the Chrome Web Store listing with UTM parameters, so installs can be read per
// campaign in the store dashboard without typing a long store URL into a video description.
//   /go/get-maps-leads-with-emails            → utm_medium=link,  utm_campaign=get-maps-leads-with-emails
//   /go/shorts/get-maps-leads-with-emails     → utm_medium=shorts, utm_campaign=get-maps-leads-with-emails
// Mediums match the content plan: guide, longform, shorts, slides, email, link. Anything else, or a slug
// with characters outside a-z 0-9 and hyphens, redirects to the listing with no campaign.

const MEDIUMS = new Set(["guide", "longform", "shorts", "slides", "email", "link"]);
const SLUG = /^[a-z0-9][a-z0-9-]{0,80}$/;

export function GET(_req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
    return ctx.params.then(({ path }) => {
        const [first, second] = path;
        const medium = second && MEDIUMS.has(first) ? first : "link";
        const campaign = second && MEDIUMS.has(first) ? second : path.length === 1 ? first : "";
        const url = new URL(productConfig.product.ctaUrl);
        url.searchParams.set("utm_source", "webscraper.pro");
        url.searchParams.set("utm_medium", medium);
        if (campaign && SLUG.test(campaign)) url.searchParams.set("utm_campaign", campaign);
        const res = NextResponse.redirect(url, 302);
        res.headers.set("X-Robots-Tag", "noindex, nofollow");
        res.headers.set("Cache-Control", "no-store");
        return res;
    });
}
