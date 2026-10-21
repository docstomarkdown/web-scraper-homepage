// Authors of guides and blog posts. Every post names one of these; the name on a post must match a key here.
export interface Author {
    name: string;
    slug: string;
    role: string;
    bio: string;
    url?: string;
}

export const authors: Record<string, Author> = {
    vikram: {
        name: "Vikram Aruchamy",
        slug: "vikram",
        role: "Founder, Thinksolv Technologies",
        bio: "Vikram builds Web Scraper Pro and writes its guides. He tests every step on the released extension before it's published.",
        url: "https://www.linkedin.com/in/vikramaruchamy/",
    },
};

export function getAuthor(slug: string): Author {
    const a = authors[slug];
    if (!a) throw new Error(`Unknown author "${slug}". Add them to content/authors.ts.`);
    return a;
}
