import { featureGroups, isPublished, menuPages, showPlannedPages, type PageIcon, type SitePage } from "@/config/pages";
import { sitesByCategory } from "@/content/sites";
import { scraperPages } from "@/content/scrapers";
import { useCasePages } from "@/content/use-cases";
import { isVisible } from "@/components/pages/ScraperPage";
import { isUseCaseVisible } from "@/components/pages/UseCasePage";
import { getAllGuides, getGuides } from "@/lib/guides";

// Builds the header menus on the server, where the content indexes are known, so the client menu only
// renders. Production shows published pages. Local preview also shows drafts ("Draft", linked) and
// registry entries with no content yet ("Page to build", greyed out), so the whole structure can be read.

export type MenuId = "product" | "use-cases" | "scrapers" | "resources";

export interface MenuItem {
    href: string;
    label: string;
    summary: string;
    icon: PageIcon;
    /** False for a page that exists only as a registry row; rendered greyed out, not linked. */
    linkable: boolean;
    badge: string | null;
}

export interface MenuGroup {
    id: string;
    label: string;
    items: MenuItem[];
}

export type Menus = Record<MenuId, MenuGroup[]>;

const fromPage = (p: SitePage, draft?: boolean): MenuItem => ({
    href: p.href,
    label: p.label,
    summary: p.summary,
    icon: p.icon,
    linkable: isPublished(p) || Boolean(draft),
    badge: p.comingSoon || p.status === "soon" ? "Coming soon" : draft ? "Draft" : isPublished(p) ? null : "Page to build",
});

function productMenu(): MenuGroup[] {
    const items = menuPages("feature");
    return featureGroups
        .map((g) => ({ id: g.id as string, label: g.label as string, items: items.filter((p) => p.group === g.id).map((p) => fromPage(p)) }))
        .filter((g) => g.items.length > 0);
}

function jobsMenu(): MenuGroup[] {
    const items = menuPages("use-case").map((p) => {
        const c = useCasePages[p.slug];
        const draft = Boolean(c && c.status === "draft" && isUseCaseVisible(c));
        const published = Boolean(c && c.status === "published");
        return fromPage({ ...p, status: published ? "live" : p.status }, draft);
    });
    return items.length ? [{ id: "use-cases", label: "What people use it for", items }] : [];
}

/** The Sites menu lists per-site pages, grouped by their category; categories themselves are not pages. */
function sitesMenu(): MenuGroup[] {
    return sitesByCategory()
        .map(({ category, sites }) => ({
            id: category.slug,
            label: category.label,
            items: sites
                .map((s) => (s.page ? scraperPages[s.page] : null))
                .filter((c): c is NonNullable<typeof c> => Boolean(c && isVisible(c)))
                .map((c) => ({
                    href: `/scrapers/${c.slug}`,
                    label: c.site.name,
                    summary: c.intro.split(". ")[0] + ".",
                    icon: category.icon,
                    linkable: true,
                    badge: c.status === "draft" ? "Draft" : null,
                })),
        }))
        .filter((g) => g.items.length > 0);
}

function resourcesMenu(): MenuGroup[] {
    // The guides hub has drafts before it has published guides; in local preview it links as a draft.
    const guideDrafts = getAllGuides().length > 0 && getGuides().length === 0;
    const items = menuPages("resource").map((p) => fromPage(p, p.slug === "guides" && guideDrafts));
    return items.length ? [{ id: "resources", label: "Learn and explore", items }] : [];
}

export function buildMenus(): Menus {
    return { product: productMenu(), "use-cases": jobsMenu(), scrapers: sitesMenu(), resources: resourcesMenu() };
}

/** True when any menu shows an unbuilt or draft page: only ever in local preview. */
export const menusHavePreviewItems = (m: Menus) => showPlannedPages && Object.values(m).some((gs) => gs.some((g) => g.items.some((i) => i.badge === "Page to build" || i.badge === "Draft")));
