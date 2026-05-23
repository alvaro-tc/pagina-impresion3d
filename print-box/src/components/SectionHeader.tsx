type SectionHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 max-w-3xl${className ? ` ${className}` : ''}`}>
      {eyebrow && (
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-[var(--fg-base)] md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-[var(--fg-muted)] md:text-lg">{description}</p>
      )}
    </div>
  )
}
