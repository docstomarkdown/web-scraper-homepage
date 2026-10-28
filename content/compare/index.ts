import type { ComparePageContent } from "@/components/pages/ComparePage";
import { webscraperIo } from "./webscraper-io";
import { instantDataScraper } from "./instant-data-scraper";
import { ultimateWebScraper } from "./ultimate-web-scraper";

// Every comparison page by slug. Each is fair, dated and sourced; re-check the competitor's public pages before a republish.
export const comparePages: Record<string, ComparePageContent> = {
    [webscraperIo.slug]: webscraperIo,
    [instantDataScraper.slug]: instantDataScraper,
    [ultimateWebScraper.slug]: ultimateWebScraper,
};
