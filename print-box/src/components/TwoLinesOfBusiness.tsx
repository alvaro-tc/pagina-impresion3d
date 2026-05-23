import Link from 'next/link'

type Line = {
  title: string
  href: string
  blurb: string
  icon: 'cube' | 'printer'
}

const LINES: Line[] = [
  {
    title: 'Modelado 3D a pedido',
    href: '/cotizar',
    blurb:
      'Diseñamos modelos 3D personalizados para tus proyectos: piezas técnicas, prototipos, arte y más, desde La Paz para toda Bolivia.',
    icon: 'cube',
  },
  {
    title: 'Tienda de Impresiones 3D',
    href: '/productos',
    blurb:
      'Catálogo de piezas impresas listas para envío en El Alto y La Paz. Materiales premium y acabados industriales.',
    icon: 'printer',
  },
]

function Icon({ name }: { name: Line['icon'] }) {
  if (name === 'cube') {
    return (
      <svg
        viewBox="0 0 64 64"
        className="h-12 w-12 stroke-[var(--accent)]"
        fill="none"
        strokeWidth="1.25"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M32 6 L56 18 L56 46 L32 58 L8 46 L8 18 Z" />
        <path d="M32 6 L32 32" />
        <path d="M8 18 L32 32 L56 18" />
        <path d="M32 32 L32 58" />
      </svg>
    )
  }
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-12 w-12 stroke-[var(--accent)]"
      fill="none"
      strokeWidth="1.25"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="10" y="22" width="44" height="22" />
      <rect x="18" y="10" width="28" height="12" />
      <rect x="20" y="44" width="24" height="14" />
      <circle cx="48" cy="33" r="1.5" fill="currentColor" />
    </svg>
  )
}

export default function TwoLinesOfBusiness() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {LINES.map((line) => (
        <Link
          key={line.href}
          href={line.href}
          className="group flex flex-col gap-6 border border-[var(--border-base)] bg-[var(--bg-elevated)] p-10 transition-colors hover:border-[var(--accent)]"
        >
          <Icon name={line.icon} />
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-[var(--fg-base)]">
              {line.title}
            </h3>
            <p className="mt-3 text-sm text-[var(--fg-muted)]">{line.blurb}</p>
          </div>
          <span className="mt-auto text-sm uppercase tracking-widest text-[var(--accent)] transition-transform group-hover:translate-x-1">
            Ver más →
          </span>
        </Link>
      ))}
    </div>
  )
}
