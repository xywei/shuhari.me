import { buttonVariants } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <section className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-[6rem_minmax(0,1fr)]">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <div className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
          <p className="text-muted-foreground">The page may have moved, or the URL may be mistyped.</p>
        </div>
        <a className={buttonVariants({ variant: 'default' })} href="/">
          Return home
        </a>
      </div>
    </section>
  )
}
