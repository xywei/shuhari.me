import { buttonVariants } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <section className="mx-auto max-w-3xl space-y-6 text-center">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground">The page may have moved, or the URL may be mistyped.</p>
      <a className={buttonVariants({ variant: 'default' })} href="/">
        Return home
      </a>
    </section>
  )
}
