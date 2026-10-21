import type { ComparePageContent } from "@/components/pages/ComparePage";
import { webscraperIo } from "./webscraper-io";

// Every comparison page by slug. Each is fair, dated and sourced; re-check the competitor's public pages before a republish.
export const comparePages: Record<string, ComparePageContent> = {
    [webscraperIo.slug]: webscraperIo,
};
