import type { SVGProps } from 'react'
import { ArrowUpRight } from 'lucide-react'

const contacts = [
  { label: 'GitHub', value: '@xywei', href: 'https://github.com/xywei', Icon: GitHubIcon },
  { label: 'X', value: '@shuhari_me', href: 'https://x.com/shuhari_me', Icon: XIcon },
  { label: 'LinkedIn', value: 'xywei', href: 'https://www.linkedin.com/in/xywei/', Icon: LinkedInIcon },
] as const

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.25c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 5.8c1.02.01 2.05.14 3.01.41 2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.47 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  )
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.9 2h3.4l-7.5 8.5L23.6 22h-6.9l-5.4-7.1L5.1 22H1.7l8-9.1L1.2 2h7.1l4.9 6.5L18.9 2Zm-1.2 18h1.9L7.3 3.9h-2L17.7 20Z" />
    </svg>
  )
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
    </svg>
  )
}

export function ContactPage() {
  return (
    <section className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-12">
      <div className="space-y-3 lg:sticky lg:top-28 lg:self-start">
        <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
        <p className="max-w-sm text-muted-foreground">Places where I am reachable or occasionally active.</p>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-card">
        {contacts.map(({ label, value, href, Icon }) => (
          <a
            key={label}
            className="grid min-h-16 gap-2 border-b p-5 underline-offset-4 last:border-b-0 hover:bg-secondary/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:grid-cols-[10rem_1fr] sm:items-center"
            href={href}
          >
            <span className="flex items-center gap-2 font-semibold tracking-tight">
              <Icon className="h-5 w-5" aria-hidden="true" />
              {label}
            </span>
            <span className="inline-flex items-center gap-1 break-all font-medium text-primary">
              {value} <ArrowUpRight className="h-4 w-4 shrink-0" />
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
