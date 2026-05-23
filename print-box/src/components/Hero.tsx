import Link from 'next/link'
import Container from './Container'

type HeroProps = {
  heading: string
  subheading?: string
  ctaLabel?: string
  ctaHref?: string
  backgroundImageUrl?: string
  backgroundLightUrl?: string
  backgroundDarkUrl?: string
  eyebrow?: string
}

export default function Hero({
  heading,
  subheading,
  ctaLabel,
  ctaHref,
  backgroundImageUrl,
  backgroundLightUrl = '/hero-light.svg',
  backgroundDarkUrl = '/hero-dark.svg',
  eyebrow,
}: HeroProps) {
  const singleBg = backgroundImageUrl

  return (
    <section className="relative isolate w-full overflow-hidden border-b border-[var(--border-base)] bg-[var(--bg-base)]">
      {singleBg ? (
        <>
          <div
            className="absolute inset-0 -z-20 bg-cover bg-center"
            style={{ backgroundImage: `url(${singleBg})` }}
            aria-hidden
          />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--bg-base)]/70 via-[var(--bg-base)]/85 to-[var(--bg-base)]"
            aria-hidden
          />
        </>
      ) : (
        <>
          {/* Theme-aware backgrounds — both rendered, visibility toggled by .dark class */}
          <div
            className="absolute inset-0 -z-20 bg-cover bg-center dark:hidden"
            style={{ backgroundImage: `url(${backgroundLightUrl})` }}
            aria-hidden
          />
          <div
            className="absolute inset-0 -z-20 hidden bg-cover bg-center dark:block"
            style={{ backgroundImage: `url(${backgroundDarkUrl})` }}
            aria-hidden
          />
          {/* Subtle fade so the text always reads */}
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--bg-base)]/85 via-[var(--bg-base)]/40 to-transparent"
            aria-hidden
          />
        </>
      )}

      <Container className="py-24 md:py-36">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-[var(--accent)]">{eyebrow}</p>
          )}
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[var(--fg-base)] md:text-6xl">
            {heading}
          </h1>
          {subheading && (
            <p className="mt-6 max-w-2xl text-lg text-[var(--fg-muted)] md:text-xl">{subheading}</p>
          )}
          {ctaLabel && ctaHref && (
            <div className="mt-10">
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 border border-[var(--accent)] bg-[var(--bg-base)]/40 px-6 py-3 text-sm font-medium uppercase tracking-widest text-[var(--accent)] backdrop-blur transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]"
              >
                {ctaLabel}
                <span aria-hidden>→</span>
              </Link>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
