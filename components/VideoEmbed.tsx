/** A YouTube video, 16:9, loaded lazily from the privacy-enhanced domain. */
export function VideoEmbed({ id, title }: { id: string; title: string }) {
    return (
        <figure className="my-8">
            <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900" style={{ aspectRatio: "16 / 9" }}>
                <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${id}`}
                    title={title}
                    loading="lazy"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />
            </div>
            <figcaption className="mt-2 text-sm text-slate-500 dark:text-slate-400">{title}</figcaption>
        </figure>
    );
}
