import type { ScraperPageContent } from "@/components/pages/ScraperPage";
import { maps } from "./maps";
import { yellowPages } from "./yellow-pages";
import { justdial } from "./justdial";
import { bbb } from "./bbb";
import { amazon } from "./amazon";

// Every per-site page, by slug. Add a page here once its content file exists; content/sites.ts links the site name to it.
export const scraperPages: Record<string, ScraperPageContent> = {
    [maps.slug]: maps,
    [yellowPages.slug]: yellowPages,
    [justdial.slug]: justdial,
    [bbb.slug]: bbb,
    [amazon.slug]: amazon,
};
