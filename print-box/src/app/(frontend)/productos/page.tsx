import Link from 'next/link'
import { getPayload } from 'payload'

import config from '@/payload.config'
import Container from '@/components/Container'
import SectionHeader from '@/components/SectionHeader'
import ProductCard from '@/components/ProductCard'

export const metadata = {
  title: 'Productos — PRINT BOX',
  description: 'Catálogo de impresiones 3D listas para envío en Bolivia.',
}

type MediaLike = { url?: string | null } | null | undefined
const mediaUrl = (m: MediaLike): string | undefined => (m && m.url ? m.url : undefined)

export default async function ProductosPage() {
  const payload = await getPayload({ config: await config })

  const res = await payload
    .find({ collection: 'products', limit: 100, depth: 1, sort: '-createdAt' })
    .catch(() => ({ docs: [] as unknown[] }))

  const products = res.docs as Array<{
    id: string
    name: string
    slug: string
    price: number
    category: string
    materials?: string[]
    photos?: { image: MediaLike }[]
  }>

  return (
    <section className="py-20">
      <Container>
        <SectionHeader
          eyebrow="Tienda · Bolivia"
          title="Productos PRINT BOX"
          description="Impresiones 3D producidas en nuestro taller de El Alto. Editá el catálogo desde /admin → Products."
        />

        {products.length === 0 ? (
          <p className="text-sm text-[var(--fg-muted)]">
            Todavía no hay productos publicados.{' '}
            <Link href="/admin/collections/products/create" className="text-[var(--accent)] hover:underline">
              Creá el primero desde el panel admin →
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                name={p.name}
                slug={p.slug}
                price={p.price}
                category={p.category}
                materials={p.materials}
                imageUrl={mediaUrl(p.photos?.[0]?.image)}
                currency="BOB"
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
