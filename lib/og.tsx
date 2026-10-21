import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

/** The Open Graph image: brand tile, a title and an optional line under it. Shared by the default image and /api/og. */
export async function ogImage({ title, subtitle }: { title: string; subtitle?: string }) {
    const fontsDir = path.join(process.cwd(), "public", "fonts");
    const [heading, body] = await Promise.all([
        readFile(path.join(fontsDir, "CalSans-SemiBold.ttf")),
        readFile(path.join(fontsDir, "Inter-Regular.ttf")),
    ]);
    const big = title.length > 48;
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "64px 72px",
                    background: "linear-gradient(135deg, #ffffff 0%, #eef4ff 100%)",
                    color: "#0f172a",
                    fontFamily: "Inter",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    <div
                        style={{
                            width: 56,
                            height: 56,
                            borderRadius: 13,
                            background: "#2772ED",
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "CalSans",
                            fontSize: 34,
                            fontStyle: "italic",
                        }}
                    >
                        W
                    </div>
                    <div style={{ fontSize: 30, fontFamily: "CalSans" }}>Web Scraper Pro</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div style={{ fontFamily: "CalSans", fontSize: big ? 56 : 68, lineHeight: 1.1, maxWidth: 1000 }}>{title}</div>
                    {subtitle ? <div style={{ fontSize: 30, color: "#475569", maxWidth: 960, lineHeight: 1.35 }}>{subtitle}</div> : null}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 26, color: "#475569" }}>
                    <div style={{ width: 14, height: 14, borderRadius: 7, background: "#7CF2C4" }} />
                    webscraper.pro
                </div>
            </div>
        ),
        {
            ...OG_SIZE,
            fonts: [
                { name: "CalSans", data: heading, weight: 600, style: "normal" },
                { name: "Inter", data: body, weight: 400, style: "normal" },
            ],
        },
    );
}

/** The URL of a titled image from /api/og, for a page's openGraph.images. */
export function ogImageUrl(title: string, subtitle?: string) {
    const params = new URLSearchParams({ title });
    if (subtitle) params.set("subtitle", subtitle);
    return `/api/og?${params.toString()}`;
}
