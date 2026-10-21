import manifest from "@/content/visuals/manifest.json";

// Product screenshots are referenced by id, never by file name, so a retaken capture updates every page
// that shows it. The manifest and files are synced from the extension repo's visuals library into
// public/visuals/ and content/visuals/manifest.json.
export interface Capture {
    file: string;
    alt: string;
    caption?: string;
    width: number;
    height: number;
    /** Extension version the capture was taken on. */
    version: string;
    capturedOn: string;
    /** Set when the UI changed after the capture; the page still renders it but a build lists it. */
    stale?: boolean;
}

const captures = (manifest as { captures: Record<string, Capture> }).captures;

export function getCapture(id: string): Capture | null {
    return captures[id] ?? null;
}

export const captureIds = () => Object.keys(captures);
