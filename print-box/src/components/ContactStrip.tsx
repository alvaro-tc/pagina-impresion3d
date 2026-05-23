import Container from './Container'

const DEFAULTS = {
  address: 'Pasaje 27 de Noviembre, Adolfo Borda, 0000 El Alto, La Paz — Bolivia',
  phone: '+591 65696932',
  whatsapp: '+59165696932',
  email: 'contacto@printbox.bo',
  referenceNumber: 'NIT 0000000000',
}

type ContactStripProps = {
  address?: string
  phone?: string
  whatsapp?: string
  email?: string
  referenceNumber?: string
}

export default function ContactStrip(props: ContactStripProps = {}) {
  const c = { ...DEFAULTS, ...props }
  const waHref = c.whatsapp ? `https://wa.me/${c.whatsapp.replace(/[^0-9]/g, '')}` : undefined

  return (
    <div className="border-y border-[var(--border-base)] bg-[var(--bg-elevated)]">
      <Container className="flex flex-col items-start justify-between gap-4 py-5 text-xs uppercase tracking-[0.18em] text-[var(--fg-muted)] md:flex-row md:items-center">
        <span className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden />
          {c.address}
        </span>
        <span className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <a href={`tel:${c.phone.replace(/\s/g, '')}`} className="hover:text-[var(--accent)]">
            {c.phone}
          </a>
          {waHref && (
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)]">
              WhatsApp
            </a>
          )}
          <a href={`mailto:${c.email}`} className="hover:text-[var(--accent)]">
            {c.email}
          </a>
          <span className="text-[var(--fg-subtle)]">{c.referenceNumber}</span>
        </span>
      </Container>
    </div>
  )
}
