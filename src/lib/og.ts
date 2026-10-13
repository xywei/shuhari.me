import { formatDate } from './date'
import { getPost } from './posts'
import { getRoute, normalizePath } from './routes'
import { site } from './site'

export type OgCard = {
  imagePath: string
  title: string
  description: string
  label: string
  date?: string
}

export const ogImageSize = { width: 1200, height: 630 } as const

export function getOgImagePath(pathname: string) {
  const path = normalizePath(pathname)
  return path === '/' ? '/og/index.png' : `/og${path}.png`
}

export function getOgCard(pathname: string): OgCard {
  const route = getRoute(pathname)
  const imagePath = getOgImagePath(route.canonicalPath ?? route.path)

  if (route.path === '/') {
    return {
      imagePath,
      title: site.name,
      description: 'Builder with roots in scientific computing, math, and high performance numerical methods.',
      label: 'shuhari.me',
    }
  }

  const postMatch = route.path.match(/^\/posts\/([^/]+)$/)
  const post = postMatch && route.status === 200 ? getPost(decodeURIComponent(postMatch[1])) : undefined

  return {
    imagePath,
    title: route.title,
    description: route.description,
    label: post ? 'shuhari.me / posts' : 'shuhari.me',
    date: post ? formatDate(post.date) : undefined,
  }
}
