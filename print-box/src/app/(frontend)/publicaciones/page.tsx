import Link from 'next/link'
import { getPayload } from 'payload'

import config from '@/payload.config'
import Container from '@/components/Container'
import SectionHeader from '@/components/SectionHeader'

export const metadata = {
  title: 'Publicaciones — PRINT BOX',
  description: 'Notas, novedades y tutoriales del mundo de la impresión 3D en Bolivia.',
}

const CATEGORY_LABEL: Record<string, string> = {
  tutorial: 'Tutorial',
  industria: 'Industria',
  'caso-de-uso': 'Caso de uso',
  materiales: 'Materiales',
}

const formatDate = (iso: string | null | undefined) => {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('es-BO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function PublicacionesPage() {
  const payload = await getPayload({ config: await config })
  const res = await payload
    .find({ collection: 'posts', limit: 100, depth: 0, sort: '-publishedAt' })
    .catch(() => ({ docs: [] as unknown[] }))

  const posts = res.docs as Array<{
    id: string
    title: string
    slug: string
    excerpt: string
    category: string
    readTime?: string
    publishedAt?: string | null
  }>

  return (
    <section className="py-20">
      <Container>
        <SectionHeader
          eyebrow="Blog · Bolivia"
          title="Publicaciones"
          description="Notas técnicas, casos reales y novedades del taller de impresión 3D más activo de La Paz y El Alto. Editá esta sección desde /admin → Publicaciones."
        />

        {posts.length === 0 ? (
          <p className="text-sm text-[var(--fg-muted)]">
            Todavía no hay publicaciones.{' '}
            <Link href="/admin/collections/posts/create" className="text-[var(--accent)] hover:underline">
              Creá la primera desde el panel admin →
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {posts.map((p) => (
              <article
                key={p.id}
                className="group flex flex-col gap-4 border border-[var(--border-base)] bg-[var(--bg-elevated)] p-7 transition-colors hover:border-[var(--accent)]"
              >
                <header className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[var(--fg-subtle)]">
                  <span className="text-[var(--accent)]">
                    {CATEGORY_LABEL[p.category] ?? p.category}
                  </span>
                  <span>
                    {formatDate(p.publishedAt)}
                    {p.readTime ? ` · ${p.readTime}` : ''}
                  </span>
                </header>
                <h3 className="text-xl font-semibold tracking-tight text-[var(--fg-base)]">
                  {p.title}
                </h3>
                <p className="text-sm text-[var(--fg-muted)]">{p.excerpt}</p>
                <Link
                  href={`/publicaciones/${p.slug}`}
                  className="mt-auto inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--accent)] transition-transform group-hover:translate-x-1"
                >
                  Leer publicación →
                </Link>
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
