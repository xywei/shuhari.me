import type { ComponentType } from 'react'

import type { MDXComponents } from 'mdx/types'

import { getSeries } from './series'

export type PostMeta = {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  draft?: boolean
  // Slug of the series this post belongs to (see src/lib/series.ts) and its
  // position in that series, starting at 1.
  series?: string
  seriesPart?: number
  // URL of the paper this post explains. It must match the link in the
  // publications list on the homepage so the homepage can link back here.
  paper?: string
  // How AI tools were used to write this post. Required for posts dated on or
  // after aiDisclosureRequiredFrom.
  aiDisclosure?: string
}

export type Post = PostMeta & {
  Component: ComponentType<{ components?: MDXComponents }>
}

type PostModule = {
  meta: PostMeta
  default: Post['Component']
}

const aiDisclosureRequiredFrom = '2026-10-13'

const modules = import.meta.glob<PostModule>('../posts/*.{tsx,mdx}', { eager: true })

export const posts: Post[] = Object.entries(modules)
  .map(([path, mod]) => {
    if (!mod.meta) {
      throw new Error(`Post ${path} is missing an exported meta object`)
    }

    if (!mod.default) {
      throw new Error(`Post ${path} is missing a default component`)
    }

    validateMeta(path, mod.meta)

    return {
      ...mod.meta,
      Component: mod.default,
    }
  })
  .filter((post) => !post.draft)
  .sort((a, b) => b.date.localeCompare(a.date))

function validateMeta(path: string, meta: PostMeta) {
  if (meta.series !== undefined) {
    if (!getSeries(meta.series)) {
      throw new Error(`Post ${path} names unknown series "${meta.series}"`)
    }

    if (!Number.isInteger(meta.seriesPart) || meta.seriesPart! < 1) {
      throw new Error(`Post ${path} is in a series but has no valid seriesPart`)
    }
  }

  if (!meta.draft && meta.date >= aiDisclosureRequiredFrom && !meta.aiDisclosure?.trim()) {
    throw new Error(`Post ${path} needs an aiDisclosure before it can be published`)
  }
}

export const tags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort()

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug)
}

export function getPostsByTag(tag: string) {
  return posts.filter((post) => post.tags.includes(tag))
}

export function getPostsInSeries(series: string) {
  return posts
    .filter((post) => post.series === series)
    .sort((a, b) => a.seriesPart! - b.seriesPart!)
}

export function getPostForPaper(paper: string) {
  return posts.find((post) => post.paper === paper)
}
