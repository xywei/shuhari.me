import { buttonVariants } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <section className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-[6rem_minmax(0,1fr)]">
      <p className="type-metadata">404</p>
      <div className="space-y-6">
        <div className="space-y-3">
          <h1 className="type-page-title">Page not found</h1>
          <p className="type-lede">The page may have moved, or the URL may be mistyped.</p>
        </div>
        <a className={buttonVariants({ variant: 'default' })} href="/">
          Return home
        </a>
      </div>
    </section>
  )
}
