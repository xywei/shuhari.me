import { site } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© 2024-present {site.name}.</p>
        <div className="flex gap-4">
          <a className="hover:text-foreground" href={site.github}>
            GitHub
          </a>
          <a className="hover:text-foreground" href={site.rss}>
            RSS
          </a>
        </div>
      </div>
    </footer>
  )
}
