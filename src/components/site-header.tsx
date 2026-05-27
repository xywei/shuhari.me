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
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="/" className="font-semibold tracking-tight">
          {site.name}
        </a>
        <nav aria-label="Primary navigation" className="flex items-center gap-1">
          {navItems.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground',
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
