import Link from 'next/link'
import Container from './Container'

type LinkItem = { label: string; href: string }

type Contact = {
  address?: string
  phone?: string
  whatsapp?: string
  email?: string
  referenceNumber?: string
}

type Socials = {
  facebookEnabled?: boolean
  facebookUrl?: string
  instagramEnabled?: boolean
  instagramUrl?: string
  tiktokEnabled?: boolean
  tiktokUrl?: string
}

type FooterProps = {
  tagline: string
  credit: string
  contact?: Contact
  socials?: Socials
  legalLinks?: LinkItem[]
}

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.3 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
  </svg>
)
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)
const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M21 8.5a7 7 0 0 1-4.6-1.7v7.8a6 6 0 1 1-6-6c.3 0 .6 0 .9.1v3a3 3 0 1 0 2.1 2.9V2h3a4 4 0 0 0 4.6 3.6V8.5z" />
  </svg>
)

export default function Footer({ tagline, credit, contact, socials, legalLinks }: FooterProps) {
  const socialList: { key: string; label: string; href: string; Icon: () => React.JSX.Element }[] = []
  if (socials?.facebookEnabled && socials.facebookUrl) {
    socialList.push({ key: 'facebook', label: 'Facebook', href: socials.facebookUrl, Icon: FacebookIcon })
  }
  if (socials?.instagramEnabled && socials.instagramUrl) {
    socialList.push({ key: 'instagram', label: 'Instagram', href: socials.instagramUrl, Icon: InstagramIcon })
  }
  if (socials?.tiktokEnabled && socials.tiktokUrl) {
    socialList.push({ key: 'tiktok', label: 'TikTok', href: socials.tiktokUrl, Icon: TikTokIcon })
  }

  const waHref = contact?.whatsapp ? `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}` : undefined

  return (
    <footer className="mt-24 border-t border-[var(--border-base)] bg-[var(--bg-elevated)]">
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">PRINT BOX</p>
            <p className="mt-3 max-w-md text-sm text-[var(--fg-muted)]">{tagline}</p>
            {socialList.length > 0 && (
              <div className="mt-6 flex items-center gap-3">
                {socialList.map((s) => (
                  <a
                    key={s.key}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-base)] text-[var(--fg-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    <s.Icon />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="mb-3 text-xs uppercase tracking-widest text-[var(--fg-subtle)]">Contacto</h3>
            <ul className="space-y-2 text-sm text-[var(--fg-muted)]">
              {contact?.address && <li className="leading-relaxed">{contact.address}</li>}
              {contact?.phone && (
                <li>
                  <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hover:text-[var(--accent)]">
                    {contact.phone}
                  </a>
                </li>
              )}
              {waHref && (
                <li>
                  <a href={waHref} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)]">
                    WhatsApp
                  </a>
                </li>
              )}
              {contact?.email && (
                <li>
                  <a href={`mailto:${contact.email}`} className="hover:text-[var(--accent)]">
                    {contact.email}
                  </a>
                </li>
              )}
              {contact?.referenceNumber && (
                <li className="pt-2 text-xs uppercase tracking-wider text-[var(--fg-subtle)]">
                  {contact.referenceNumber}
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs uppercase tracking-widest text-[var(--fg-subtle)]">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/publicaciones" className="text-[var(--fg-muted)] hover:text-[var(--accent)]">Publicaciones</Link></li>
              <li><Link href="/proyectos" className="text-[var(--fg-muted)] hover:text-[var(--accent)]">Proyectos</Link></li>
              <li><Link href="/productos" className="text-[var(--fg-muted)] hover:text-[var(--accent)]">Productos</Link></li>
              <li><Link href="/acerca-de" className="text-[var(--fg-muted)] hover:text-[var(--accent)]">Acerca de</Link></li>
              <li><Link href="/cotizar" className="text-[var(--fg-muted)] hover:text-[var(--accent)]">Cotizar</Link></li>
            </ul>
            {legalLinks && legalLinks.length > 0 && (
              <ul className="mt-4 space-y-1 text-xs">
                {legalLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[var(--fg-subtle)] hover:text-[var(--accent)]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--border-base)] pt-6 md:flex-row md:items-center">
          <p className="text-xs text-[var(--fg-subtle)]">
            © {new Date().getFullYear()} PRINT BOX — La Paz, Bolivia. Todos los derechos reservados.
          </p>
          <p
            className="text-xs uppercase tracking-[0.25em] text-[var(--accent)]"
            style={{ fontVariantCaps: 'small-caps' }}
          >
            {credit}
          </p>
        </div>
      </Container>
    </footer>
  )
}
