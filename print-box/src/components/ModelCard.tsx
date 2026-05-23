import Image from 'next/image'

type ModelCardProps = {
  title: string
  designer?: string
  software?: string[]
  coverImageUrl?: string
}

export default function ModelCard({
  title,
  designer,
  software,
  coverImageUrl,
}: ModelCardProps) {
  return (
    <article className="group relative aspect-[4/5] w-full overflow-hidden border border-[var(--border-base)] bg-[var(--bg-elevated)]">
      {coverImageUrl ? (
        <Image
          src={coverImageUrl}
          alt={title}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-widest text-[var(--fg-subtle)]">
          Sin portada
        </div>
      )}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
        {designer && (
          <p className="mt-1 text-xs uppercase tracking-widest text-[var(--accent)]">
            {designer}
          </p>
        )}
        {software && software.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {software.map((s) => (
              <span
                key={s}
                className="border border-white/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/90"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
