import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCategories, getPostsByCategory, categorySlug } from "@/lib/posts";
import SectionHeading from "@/components/landing/SectionHeading";
import { PostCard } from "@/components/blog/PostCard";

type Props = { params: Promise<{ category: string }> };

const findCategory = (slug: string) => getAllCategories().find((c) => categorySlug(c) === slug);

export function generateStaticParams() {
    return getAllCategories().map((c) => ({ category: categorySlug(c) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category } = await params;
    const name = findCategory(category);
    if (!name) return { title: "Category not found" };
    const posts = getPostsByCategory(name);
    return {
        title: `${name} posts`,
        description: `Posts about ${name.toLowerCase()} from the Web Scraper Pro blog.`,
        alternates: { canonical: `/blog/category/${category}` },
        robots: posts.length > 1 ? undefined : { index: false, follow: true },
    };
}

export default async function CategoryPage({ params }: Props) {
    const { category } = await params;
    const name = findCategory(category);
    if (!name) notFound();
    const posts = getPostsByCategory(name);
    return (
        <main id="main" className="flex-1 bg-white dark:bg-slate-950 pt-32 pb-20">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <SectionHeading as="h1" eyebrow="Blog" title={name} intro={`Every post about ${name.toLowerCase()}.`} />
                <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <li key={post.slug}>
                            <PostCard post={post} />
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
