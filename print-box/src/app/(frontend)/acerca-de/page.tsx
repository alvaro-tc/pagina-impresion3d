import Link from 'next/link'
import { getPayload } from 'payload'

import config from '@/payload.config'
import Container from '@/components/Container'
import SectionHeader from '@/components/SectionHeader'

export const metadata = {
  title: 'Acerca de — PRINT BOX',
  description:
    'Sobre PRINT BOX: equipo paceño de modelado e impresión 3D con taller en El Alto, Bolivia.',
}

type Stat = { value?: string; label?: string }
type Step = { title?: string; body?: string }
type TeamMember = { name?: string; role?: string; bio?: string }
type Contact = {
  address?: string
  phone?: string
  whatsapp?: string
  email?: string
  referenceNumber?: string
}

export default async function AcercaDePage() {
  const payload = await getPayload({ config: await config })

  const [about, footer] = await Promise.all([
    payload.findGlobal({ slug: 'about', depth: 0 }).catch(() => null),
    payload.findGlobal({ slug: 'footer', depth: 0 }).catch(() => null),
  ])

  const heroEyebrow = (about?.heroEyebrow as string | undefined) ?? 'Quiénes somos'
  const heroTitle =
    (about?.heroTitle as string | undefined) ??
    'PRINT BOX — modelado e impresión 3D desde La Paz, Bolivia'
  const heroDescription = (about?.heroDescription as string | undefined) ?? ''
  const stats = ((about?.stats as Stat[] | undefined) ?? []).filter((s) => s.value && s.label)
  const processSteps = ((about?.process as Step[] | undefined) ?? []).filter(
    (p) => p.title && p.body,
  )
  const team = ((about?.team as TeamMember[] | undefined) ?? []).filter((t) => t.name && t.role)
  const contact = (footer?.contact as Contact | undefined) ?? {}

  return (
    <>
      <section className="py-20">
        <Container>
          <SectionHeader eyebrow={heroEyebrow} title={heroTitle} description={heroDescription} />

          {stats.length > 0 && (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="border border-[var(--border-base)] bg-[var(--bg-elevated)] p-6"
                >
                  <div className="text-3xl font-semibold text-[var(--accent)]">{s.value}</div>
                  <div className="mt-2 text-xs uppercase tracking-widest text-[var(--fg-subtle)]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {processSteps.length > 0 && (
        <section className="border-t border-[var(--border-base)] py-20">
          <Container>
            <SectionHeader eyebrow="Cómo trabajamos" title="Proceso" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, i) => (
                <div
                  key={i}
                  className="border-l border-[var(--accent)] bg-[var(--bg-elevated)] p-6"
                >
                  <div className="text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
                    Paso {i + 1}
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-[var(--fg-base)]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">{step.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {team.length > 0 && (
        <section className="border-t border-[var(--border-base)] py-20">
          <Container>
            <SectionHeader eyebrow="Equipo" title="Quiénes hacen PRINT BOX" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {team.map((m, i) => (
                <div
                  key={i}
                  className="border border-[var(--border-base)] bg-[var(--bg-elevated)] p-7"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">{m.role}</p>
                  <h3 className="mt-2 text-lg font-semibold text-[var(--fg-base)]">{m.name}</h3>
                  <p className="mt-3 text-sm text-[var(--fg-muted)]">{m.bio}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="border-t border-[var(--border-base)] py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <SectionHeader eyebrow="Visitanos" title="Taller en El Alto, La Paz" />
              <address className="not-italic text-sm leading-relaxed text-[var(--fg-muted)]">
                {contact.address ?? 'Pasaje 27 de Noviembre, Adolfo Borda, 0000 El Alto, La Paz — Bolivia'}
                {contact.phone && (
                  <>
                    <br />
                    <br />
                    Tel:{' '}
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, '')}`}
                      className="hover:text-[var(--accent)]"
                    >
                      {contact.phone}
                    </a>
                  </>
                )}
                {contact.whatsapp && (
                  <>
                    <br />
                    WhatsApp:{' '}
                    <a
                      href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--accent)]"
                    >
                      {contact.whatsapp}
                    </a>
                  </>
                )}
                {contact.email && (
                  <>
                    <br />
                    Email:{' '}
                    <a href={`mailto:${contact.email}`} className="hover:text-[var(--accent)]">
                      {contact.email}
                    </a>
                  </>
                )}
              </address>
            </div>
            <div className="flex flex-col justify-center gap-4 border border-[var(--accent)] bg-[var(--bg-elevated)] p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
                ¿Tenés un proyecto?
              </p>
              <p className="text-lg text-[var(--fg-base)]">
                Contanos tu idea o subí tu archivo .STL/.OBJ y te enviamos una cotización en menos de 48hs.
              </p>
              <Link
                href="/cotizar"
                className="inline-flex w-fit items-center gap-2 border border-[var(--accent)] px-6 py-3 text-sm uppercase tracking-widest text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]"
              >
                Pedir cotización →
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
