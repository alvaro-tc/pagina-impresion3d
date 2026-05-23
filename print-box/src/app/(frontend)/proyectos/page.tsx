import Link from 'next/link'
import { getPayload } from 'payload'

import config from '@/payload.config'
import Container from '@/components/Container'
import SectionHeader from '@/components/SectionHeader'
import ModelCard from '@/components/ModelCard'

export const metadata = {
  title: 'Proyectos — PRINT BOX',
  description: 'Portafolio de proyectos de modelado e impresión 3D realizados en La Paz, Bolivia.',
}

type MediaLike = { url?: string | null } | null | undefined
const mediaUrl = (m: MediaLike): string | undefined => (m && m.url ? m.url : undefined)

export default async function ProyectosPage() {
  const payload = await getPayload({ config: await config })
  const res = await payload
    .find({ collection: 'models-3d', limit: 100, depth: 1, sort: '-createdAt' })
    .catch(() => ({ docs: [] as unknown[] }))

  const models = res.docs as Array<{
    id: string
    title: string
    designer?: string
    software?: string[]
    renders?: { image: MediaLike }[]
  }>

  return (
    <section className="py-20">
      <Container>
        <SectionHeader
          eyebrow="Portafolio Bolivia"
          title="Proyectos realizados"
          description="Modelados e impresiones para empresas, instituciones y emprendimientos bolivianos. Editá esta sección desde /admin → 3D Models."
        />

        {models.length === 0 ? (
          <p className="text-sm text-[var(--fg-muted)]">
            Todavía no hay proyectos.{' '}
            <Link href="/admin/collections/models-3d/create" className="text-[var(--accent)] hover:underline">
              Creá el primero desde el panel admin →
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {models.map((m) => (
              <ModelCard
                key={m.id}
                title={m.title}
                designer={m.designer}
                software={m.software}
                coverImageUrl={mediaUrl(m.renders?.[0]?.image)}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
