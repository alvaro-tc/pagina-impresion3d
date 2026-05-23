import Link from 'next/link'
import Image from 'next/image'

type ProductCardProps = {
  name: string
  slug: string
  price: number
  category: string
  materials?: string[]
  imageUrl?: string
  currency?: 'ARS' | 'BOB' | 'USD'
}

const formatPrice = (value: number, currency: 'ARS' | 'BOB' | 'USD' = 'BOB') => {
  const locale = currency === 'ARS' ? 'es-AR' : currency === 'USD' ? 'en-US' : 'es-BO'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

export default function ProductCard({
  name,
  slug,
  price,
  category,
  materials,
  imageUrl,
  currency = 'BOB',
}: ProductCardProps) {
  return (
    <Link
      href={`/productos/${slug}`}
      className="group block border border-[var(--border-base)] bg-[var(--bg-elevated)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[var(--bg-muted)]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-widest text-[var(--fg-subtle)]">
            Sin imagen
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 p-5">
        <span className="w-fit border border-[var(--border-base)] px-2 py-0.5 text-[10px] uppercase tracking-widest text-[var(--fg-muted)]">
          {category}
        </span>
        <h3 className="text-base font-medium text-[var(--fg-base)]">{name}</h3>
        <p className="text-lg font-semibold text-[var(--accent)]">{formatPrice(price, currency)}</p>
        {materials && materials.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {materials.map((m) => (
              <span
                key={m}
                className="border border-[var(--border-base)] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[var(--fg-muted)]"
              >
                {m}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
