import Link from 'next/link'
import Image from 'next/image'
import Container from './Container'
import ThemeToggle from './ThemeToggle'

type NavItem = { label: string; href: string }

type HeaderProps = {
  logoText: string
  logoUrl?: string
  navItems: NavItem[]
}

export default function Header({ logoText, logoUrl, navItems }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-base)] bg-[var(--bg-base)]/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={logoText}
              width={140}
              height={36}
              className="h-9 w-auto"
              unoptimized
              priority
            />
          ) : (
            <span className="text-lg font-semibold tracking-tight text-[var(--fg-base)]">
              {logoText}
            </span>
          )}
        </Link>

        <div className="flex items-center gap-2 md:gap-6">
          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-sm text-[var(--fg-muted)] transition-colors hover:text-[var(--accent)] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[var(--accent)] after:transition-all hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  )
}
