import { site } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© 2024-present {site.name}.</p>
        <div className="flex gap-3">
          <a
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-9 sm:min-w-9"
            href={site.github}
          >
            GitHub
          </a>
          <a
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-9 sm:min-w-9"
            href={site.rss}
          >
            RSS
          </a>
        </div>
      </div>
    </footer>
  )
}
