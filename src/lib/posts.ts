import type { ComponentType } from 'react'

export type PostMeta = {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  draft?: boolean
}

export type Post = PostMeta & {
  Component: ComponentType
}

type PostModule = {
  meta: PostMeta
  default: ComponentType
}

const modules = import.meta.glob<PostModule>('../posts/*.tsx', { eager: true })

export const posts: Post[] = Object.entries(modules)
  .map(([path, mod]) => {
    if (!mod.meta) {
      throw new Error(`Post ${path} is missing an exported meta object`)
    }

    if (!mod.default) {
      throw new Error(`Post ${path} is missing a default component`)
    }

    return {
      ...mod.meta,
      Component: mod.default,
    }
  })
  .filter((post) => !post.draft)
  .sort((a, b) => b.date.localeCompare(a.date))

export const tags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort()

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug)
}

export function getPostsByTag(tag: string) {
  return posts.filter((post) => post.tags.includes(tag))
}
