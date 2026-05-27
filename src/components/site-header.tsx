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
    <header className="sticky top-0 z-10 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
        <a
          href="/"
          className="inline-flex min-h-11 items-center rounded-md font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-9"
        >
          {site.name}
        </a>
        <nav aria-label="Primary navigation" className="flex w-full items-center gap-1 sm:w-auto">
          {navItems.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex min-h-11 flex-1 items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-9 sm:flex-none',
                  active && 'bg-secondary text-foreground'
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
