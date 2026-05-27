import type { ReactNode } from 'react'

import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'

type LayoutProps = {
  children: ReactNode
  pathname: string
}

export function Layout({ children, pathname }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader pathname={pathname} />
      <main className="flex-1 px-4 py-12 sm:px-6">{children}</main>
      <SiteFooter />
    </div>
  )
}
