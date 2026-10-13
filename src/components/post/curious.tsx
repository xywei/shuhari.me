import type { ReactNode } from 'react'

type CuriousProps = {
  title?: string
  children: ReactNode
}

// Collapsible box for optional detail, usually heavier math. The main text of
// a post must still make sense with every box closed.
export function Curious({ title = 'For the curious', children }: CuriousProps) {
  return (
    <details className="post-curious">
      <summary>{title}</summary>
      <div>{children}</div>
    </details>
  )
}
