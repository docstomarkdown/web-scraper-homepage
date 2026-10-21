import Link from "next/link";
import type { BlogPost } from "@/lib/posts";
import { formatDate } from "@/lib/format-date";

export function PostCard({ post }: { post: BlogPost }) {
    return (
        <article className="h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col">
            <p className="text-sm text-slate-600 dark:text-slate-300">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.category ? <> · {post.category}</> : null}
            </p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white leading-snug">
                <Link href={`/blog/${post.slug}`} className="hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff]">
                    {post.title}
                </Link>
            </h2>
            <p className="mt-3 text-base text-slate-700 dark:text-slate-200 leading-[1.65] flex-1">{post.description}</p>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                {post.author.name} · {post.readingMinutes} min read
            </p>
        </article>
    );
}
