import type { ReactNode } from 'react'

type FigureProps = {
  // Either an image (src + alt) or custom content such as an interactive demo.
  src?: string
  alt?: string
  caption?: ReactNode
  children?: ReactNode
}

export function Figure({ src, alt = '', caption, children }: FigureProps) {
  return (
    <figure className="post-figure">
      {src ? <img src={src} alt={alt} loading="lazy" decoding="async" /> : children}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
