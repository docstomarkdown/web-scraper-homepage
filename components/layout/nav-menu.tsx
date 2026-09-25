"use client";

import Link from "next/link";
import {
    ArrowRight, BookOpen, Lock, Bot, Briefcase, Calculator, Car, ChevronDown, Cloud, FileText, Gavel, GraduationCap,
    History, Home, Image, Layers, List, Mail, MapPin, MessageSquare, Newspaper, Plane, Scale, ShoppingBag,
    Star, Store, Table, Tag, Target, type LucideIcon,
} from "lucide-react";
import {
    featureGroups, isPublished, menuPages, showPlannedPages, statusBadge,
    type PageIcon, type PageKind, type SitePage,
} from "@/config/pages";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const icons: Record<PageIcon, LucideIcon> = {
    "map-pin": MapPin, list: List, mail: Mail, layers: Layers, "shopping-bag": ShoppingBag, "file-text": FileText,
    image: Image, table: Table, store: Store, message: MessageSquare, bot: Bot, cloud: Cloud, target: Target,
    home: Home, tag: Tag, star: Star, briefcase: Briefcase, graduation: GraduationCap, plane: Plane, book: BookOpen, lock: Lock,
    newspaper: Newspaper, scale: Scale, calculator: Calculator, history: History, gavel: Gavel, car: Car,
};

export type MenuId = "product" | "use-cases" | "scrapers" | "resources";

interface MenuDef {
    label: string;
    kind: PageKind;
    /** Heading shown above the items when the menu isn't split into feature groups. */
    heading: string;
    footer?: { href: string; label: string };
}

const MENUS: Record<MenuId, MenuDef> = {
    product: {
        label: "Product",
        kind: "feature",
        heading: "Features",
        footer: { href: "/#what-you-can-collect", label: "See every data type and ready-made site" },
    },
    "use-cases": { label: "Use cases", kind: "use-case", heading: "What people use it for" },
    // "Scrapers" is jargon for first-time visitors; the menu says "Sites" while URLs stay /scrapers.
    scrapers: {
        label: "Sites",
        kind: "scraper",
        heading: "Ready-made for these sites",
        footer: { href: "/#what-you-can-collect", label: "Not listed? It finds the data on most other sites automatically" },
    },
    resources: { label: "Resources", kind: "resource", heading: "Learn and explore" },
};

function menuGroups(id: MenuId) {
    const def = MENUS[id];
    const items = menuPages(def.kind);
    if (def.kind !== "feature") return items.length ? [{ id, label: def.heading, items }] : [];
    return featureGroups
        .map((g) => ({ id: g.id as string, label: g.label as string, items: items.filter((p) => p.group === g.id) }))
        .filter((g) => g.items.length > 0);
}

/** True when the menu has anything to show; empty menus are left out of the header. */
export const hasMenu = (id: MenuId) => menuGroups(id).length > 0;

function ItemBody({ page }: { page: SitePage }) {
    const Icon = icons[page.icon];
    const published = isPublished(page);
    return (
        <>
            <span
                className={cn(
                    "mt-0.5 inline-flex w-9 h-9 shrink-0 items-center justify-center rounded-lg",
                    published
                        ? "bg-[#2772ED]/10 text-[#1f5ec2] dark:text-[#7aa7ff]"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500",
                )}
            >
                <Icon className="w-4 h-4" aria-hidden="true" />
            </span>
            <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <span className={cn("text-sm font-semibold", published ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400")}>
                        {page.label}
                    </span>
                    {statusBadge(page) && (
                        <span className="rounded-full border border-slate-200 dark:border-slate-700 px-1.5 py-px text-[10px] font-medium text-slate-500 dark:text-slate-400">
                            {statusBadge(page)}
                        </span>
                    )}
                </span>
                <span className="mt-0.5 block text-[13px] leading-snug text-slate-500 dark:text-slate-400">{page.summary}</span>
            </span>
        </>
    );
}

const rowClass = "flex gap-3 rounded-xl p-2";

function PreviewNote() {
    return (
        <p className="px-5 pb-4 text-xs text-slate-500 dark:text-slate-400">
            Local preview: grey items are pages we haven&apos;t written yet. They only show on localhost.
        </p>
    );
}

export function NavMenuDesktop({ id }: { id: MenuId }) {
    const def = MENUS[id];
    const groups = menuGroups(id);
    const itemCount = groups.reduce((n, g) => n + g.items.length, 0);
    const hasUnbuilt = groups.some((g) => g.items.some((p) => !isPublished(p)));
    // Feature menus use one column per group; flat menus split long lists into two columns.
    const cols = def.kind === "feature" ? Math.min(groups.length, 3) : itemCount > 4 ? 2 : 1;
    const width = cols >= 3 ? "w-[940px]" : cols === 2 ? "w-[640px]" : "w-[380px]";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-all duration-200 outline-none group data-[state=open]:bg-slate-50 dark:data-[state=open]:bg-slate-800 data-[state=open]:text-slate-900 dark:data-[state=open]:text-white">
                {def.label}
                <ChevronDown className="ml-1 h-3.5 w-3.5 opacity-50 group-data-[state=open]:rotate-180 transition-transform duration-200" aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="start"
                sideOffset={16}
                className={cn("p-0 overflow-hidden rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl", width)}
            >
                <div className={cn("grid gap-6 p-5", def.kind === "feature" && (cols >= 3 ? "grid-cols-3" : cols === 2 ? "grid-cols-2" : "grid-cols-1"))}>
                    {groups.map((g) => (
                        <div key={g.id}>
                            <p className="px-2 text-xs font-semibold text-slate-500 dark:text-slate-400">{g.label}</p>
                            <div className={cn("mt-2 grid gap-1", def.kind !== "feature" && cols === 2 && "grid-cols-2 gap-x-4")}>
                                {g.items.map((p) =>
                                    isPublished(p) ? (
                                        <DropdownMenuItem key={p.href} asChild className="p-0 focus:bg-transparent">
                                            <Link href={p.href} className={cn(rowClass, "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 focus:bg-slate-50 dark:focus:bg-slate-800")}>
                                                <ItemBody page={p} />
                                            </Link>
                                        </DropdownMenuItem>
                                    ) : (
                                        <div key={p.href} className={cn(rowClass, "cursor-default")} aria-disabled="true">
                                            <ItemBody page={p} />
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {showPlannedPages && hasUnbuilt && <PreviewNote />}
                {def.footer && (
                    <DropdownMenuItem asChild className="p-0 rounded-none focus:bg-transparent">
                        <Link
                            href={def.footer.href}
                            className="flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-7 py-3.5 text-sm font-semibold text-[#1f5ec2] dark:text-[#7aa7ff] cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                            {def.footer.label}
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </Link>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function NavMenuMobile({ id }: { id: MenuId }) {
    const def = MENUS[id];
    const groups = menuGroups(id);
    return (
        <div className="space-y-4">
            <h4 className="font-semibold text-slate-900 dark:text-white text-lg">{def.label}</h4>
            {groups.map((g) => (
                <div key={g.id}>
                    {def.kind === "feature" && <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{g.label}</p>}
                    <div className="mt-2 space-y-1">
                        {g.items.map((p) =>
                            isPublished(p) ? (
                                <Link key={p.href} href={p.href} className={cn(rowClass, "-mx-2 hover:bg-slate-50 dark:hover:bg-slate-800")}>
                                    <ItemBody page={p} />
                                </Link>
                            ) : (
                                <div key={p.href} className={cn(rowClass, "-mx-2")} aria-disabled="true">
                                    <ItemBody page={p} />
                                </div>
                            ),
                        )}
                    </div>
                </div>
            ))}
            {def.footer && (
                <Link href={def.footer.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1f5ec2] dark:text-[#7aa7ff]">
                    {def.footer.label}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
            )}
        </div>
    );
}
