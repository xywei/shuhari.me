import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'About' },
  { href: '/posts', label: 'Posts' },
  { href: '/contact', label: 'Contact' },
]

type SiteHeaderProps = {
  pathname: string
}

export function SiteHeader({ pathname }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/85 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/70 sm:px-6">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 py-2 sm:py-3">
        <a
          href="/"
          className="inline-flex min-h-11 shrink-0 items-center rounded-md font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-9"
        >
          {site.name}
        </a>
        <nav aria-label="Primary navigation" className="-mr-2.5 flex items-center gap-0.5 sm:-mr-3 sm:gap-1">
          {navItems.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex min-h-11 items-center justify-center rounded-md px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-9 sm:px-3',
                  active && 'text-foreground underline decoration-accent decoration-2 underline-offset-[0.6em]'
                )}
              >
                {item.label}
              </a>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
