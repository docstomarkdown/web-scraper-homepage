import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { leadGeneration } from "./lead-generation";

// Every use-case page by registry slug. Add a page here once its content file exists.
export const useCasePages: Record<string, UseCasePageContent> = {
    [leadGeneration.page.slug]: leadGeneration,
};
