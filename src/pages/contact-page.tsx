import { ArrowUpRight } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const contacts = [
  ['GitHub', '@xywei', 'https://github.com/xywei'],
  ['X', '@shuhari_me', 'https://x.com/shuhari_me'],
  ['LinkedIn', 'xywei', 'https://www.linkedin.com/in/xywei/'],
] as const

export function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
        <p className="text-muted-foreground">Places where I am reachable or occasionally active.</p>
      </div>

      <div className="grid gap-4">
        {contacts.map(([label, value, href]) => (
          <Card key={label}>
            <CardHeader>
              <CardTitle className="text-base">{label}</CardTitle>
            </CardHeader>
            <CardContent>
              {href ? (
                <a
                  className="inline-flex items-center gap-1 break-all font-medium text-primary underline-offset-4 hover:underline"
                  href={href}
                >
                  {value} <ArrowUpRight className="h-4 w-4 shrink-0" />
                </a>
              ) : (
                <span className="font-medium">{value}</span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
