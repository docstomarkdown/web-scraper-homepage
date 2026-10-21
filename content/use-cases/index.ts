import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { leadGeneration } from "./lead-generation";
import { ecommerce } from "./ecommerce";
import { realEstate } from "./real-estate";

// Every use-case page by registry slug. Add a page here once its content file exists.
export const useCasePages: Record<string, UseCasePageContent> = {
    [leadGeneration.page.slug]: leadGeneration,
    [ecommerce.page.slug]: ecommerce,
    [realEstate.page.slug]: realEstate,
};
