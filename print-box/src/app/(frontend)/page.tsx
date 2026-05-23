import Link from 'next/link'
import { getPayload } from 'payload'

import config from '@/payload.config'
import Container from '@/components/Container'
import Hero from '@/components/Hero'
import TwoLinesOfBusiness from '@/components/TwoLinesOfBusiness'
import SectionHeader from '@/components/SectionHeader'
import ProductCard from '@/components/ProductCard'
import ModelCard from '@/components/ModelCard'

type MediaLike = { url?: string | null } | null | undefined
const mediaUrl = (m: MediaLike): string | undefined => (m && m.url ? m.url : undefined)

const FEATURED_PRODUCTS_FALLBACK = [
  {
    id: 'p1', name: 'Cholita Paceña — Figura coleccionable',
    slug: 'cholita-pacena', price: 180, category: 'figuras',
    materials: ['Resina'], imageUrl: undefined,
  },
  {
    id: 'p2', name: 'Soporte para celular — Illimani',
    slug: 'soporte-illimani', price: 90, category: 'utilitarios',
    materials: ['PLA'], imageUrl: undefined,
  },
  {
    id: 'p3', name: 'Llavero Wiphala', slug: 'llavero-wiphala',
    price: 25, category: 'accesorios', materials: ['PLA', 'PETG'], imageUrl: undefined,
  },
]

const FEATURED_MODELS_FALLBACK = [
  { id: 'm1', title: 'Réplica Puerta del Sol (Tiwanaku)', designer: 'PRINT BOX Studio', software: ['Blender'], coverImageUrl: undefined },
  { id: 'm2', title: 'Prototipo carcasa IoT', designer: 'PRINT BOX Studio', software: ['Fusion 360'], coverImageUrl: undefined },
  { id: 'm3', title: 'Maqueta Teleférico La Paz–El Alto', designer: 'PRINT BOX Studio', software: ['Blender', 'SolidWorks'], coverImageUrl: undefined },
]

export default async function HomePage() {
  const payload = await getPayload({ config: await config })

  const [productsRes, modelsRes] = await Promise.all([
    payload.find({ collection: 'products', limit: 6, depth: 1 }).catch(() => ({ docs: [] as unknown[] })),
    payload.find({ collection: 'models-3d', limit: 6, depth: 1 }).catch(() => ({ docs: [] as unknown[] })),
  ])

  const productsRaw = productsRes.docs as Array<{
    id: string; name: string; slug: string; price: number; category: string
    materials?: string[]; photos?: { image: MediaLike }[]
  }>
  const modelsRaw = modelsRes.docs as Array<{
    id: string; title: string; designer?: string; software?: string[]
    renders?: { image: MediaLike }[]
  }>

  const products = productsRaw.length > 0
    ? productsRaw.map((p) => ({ ...p, imageUrl: mediaUrl(p.photos?.[0]?.image) }))
    : FEATURED_PRODUCTS_FALLBACK

  const models = modelsRaw.length > 0
    ? modelsRaw.map((m) => ({ ...m, coverImageUrl: mediaUrl(m.renders?.[0]?.image) }))
    : FEATURED_MODELS_FALLBACK

  return (
    <>
      <Hero
        eyebrow="La Paz · El Alto · Bolivia"
        heading="Impresión 3D & Modelado a pedido"
        subheading="Diseñamos, modelamos e imprimimos tus ideas. Servicio profesional con materiales premium y entregas en todo el país."
        ctaLabel="Cotizar mi proyecto"
        ctaHref="/cotizar"
      />

      <section className="py-24">
        <Container>
          <SectionHeader
            eyebrow="Qué hacemos"
            title="Dos líneas de negocio"
            description="Servicio profesional de modelado 3D para piezas a medida, y una tienda con impresiones listas para entrega en El Alto, La Paz y envíos a Bolivia."
          />
          <TwoLinesOfBusiness />
        </Container>
      </section>

      <section className="border-t border-[var(--border-base)] py-24">
        <Container>
          <SectionHeader
            eyebrow="Tienda"
            title="Productos destacados"
            description="Una selección de impresiones 3D producidas en nuestro taller paceño."
          />
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                name={p.name}
                slug={p.slug}
                price={p.price}
                category={p.category}
                materials={p.materials}
                imageUrl={p.imageUrl}
              />
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 border border-[var(--border-strong)] px-5 py-2.5 text-sm uppercase tracking-wider text-[var(--fg-base)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Ver todos los productos →
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--border-base)] py-24">
        <Container>
          <SectionHeader
            eyebrow="Portafolio"
            title="Proyectos de modelado"
            description="Trabajos diseñados por nuestro equipo para clientes de La Paz, El Alto, Santa Cruz y Cochabamba."
          />
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {models.map((m) => (
              <ModelCard
                key={m.id}
                title={m.title}
                designer={m.designer}
                software={m.software}
                coverImageUrl={m.coverImageUrl}
              />
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/proyectos"
              className="inline-flex items-center gap-2 border border-[var(--border-strong)] px-5 py-2.5 text-sm uppercase tracking-wider text-[var(--fg-base)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Ver todos los proyectos →
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
