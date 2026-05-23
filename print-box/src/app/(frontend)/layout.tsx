export const dynamic = 'force-dynamic'

import React from 'react'
import { Inter } from 'next/font/google'
import { getPayload } from 'payload'

import config from '@/payload.config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ThemeScript from '@/components/ThemeScript'

import './styles.css'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

export const metadata = {
  description:
    'PRINT BOX — Modelado e impresión 3D bajo pedido en La Paz, Bolivia. Desarrollado por ndk_dev.',
  title: 'PRINT BOX — Modelado e Impresión 3D · La Paz, Bolivia',
}

type Media = { url?: string | null } | null | undefined
type NavItem = { label: string; href: string }
type LinkItem = { label: string; href: string }
type ContactShape = {
  address?: string
  phone?: string
  whatsapp?: string
  email?: string
  referenceNumber?: string
}
type SocialsShape = {
  facebookEnabled?: boolean
  facebookUrl?: string
  instagramEnabled?: boolean
  instagramUrl?: string
  tiktokEnabled?: boolean
  tiktokUrl?: string
}

const DEFAULT_NAV: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Publicaciones', href: '/publicaciones' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Productos', href: '/productos' },
  { label: 'Acerca de', href: '/acerca-de' },
  { label: 'Cotizar', href: '/cotizar' },
]

const DEFAULT_CONTACT: ContactShape = {
  address: 'Pasaje 27 de Noviembre, Adolfo Borda, 0000 El Alto, La Paz — Bolivia',
  phone: '+591 65696932',
  whatsapp: '+59165696932',
  email: 'contacto@printbox.bo',
  referenceNumber: 'NIT 0000000000',
}

const DEFAULT_SOCIALS: SocialsShape = {
  facebookEnabled: true,
  facebookUrl: 'https://facebook.com/printbox.bo',
  instagramEnabled: true,
  instagramUrl: 'https://instagram.com/printbox.bo',
  tiktokEnabled: true,
  tiktokUrl: 'https://tiktok.com/@printbox.bo',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config: await config })

  const [header, footer] = await Promise.all([
    payload.findGlobal({ slug: 'header', depth: 1 }).catch(() => null),
    payload.findGlobal({ slug: 'footer', depth: 1 }).catch(() => null),
  ])

  const logoText = (header?.logoText as string | undefined) ?? 'PRINT BOX'
  const logoMedia = header?.logo as Media
  const logoUrl = logoMedia && logoMedia.url ? logoMedia.url : undefined

  // Navbar 100% controlado desde /admin → Globals → Header → navItems.
  // Si está totalmente vacío (caso bordeline), caemos a DEFAULT_NAV para no quedar sin menú.
  const navFromCMS = (header?.navItems as NavItem[] | undefined) ?? []
  const navItems: NavItem[] = navFromCMS.length > 0 ? navFromCMS : DEFAULT_NAV

  const tagline =
    (footer?.tagline as string | undefined) ??
    'Modelado e impresión 3D bajo pedido — desde La Paz, Bolivia.'
  const credit = (footer?.credit as string | undefined) ?? 'Desarrollado por ndk_dev'
  const contact = (footer?.contact as ContactShape | undefined) ?? DEFAULT_CONTACT
  const socials = (footer?.socials as SocialsShape | undefined) ?? DEFAULT_SOCIALS
  const legalLinks = (footer?.legalLinks as LinkItem[] | undefined) ?? []

  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="facebook-domain-verification" content="9napzuv6zepk6k4vih4zhpk25q84ch" />
        <ThemeScript />
      </head>
      <body suppressHydrationWarning>
        <Header logoText={logoText} logoUrl={logoUrl} navItems={navItems} />
        <main className="min-h-[calc(100vh-9rem)]">{children}</main>
        <Footer
          tagline={tagline}
          credit={credit}
          contact={contact}
          socials={socials}
          legalLinks={legalLinks}
        />
      </body>
    </html>
  )
}
