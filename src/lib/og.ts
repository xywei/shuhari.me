import { formatDate } from './date'
import { getPost, getSeriesPartLabel } from './posts'
import { getRoute, normalizePath } from './routes'
import { getSeries } from './series'
import { site } from './site'

export type OgCard = {
  imagePath: string
  title: string
  description: string
  label: string
  date?: string
  // Shown above the title on cards with art, such as "Papers, explained · Part 1".
  kicker?: string
  // Path from the repository root to a square PNG shown on the right.
  art?: string
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
      description: site.tagline,
      label: 'shuhari.me',
    }
  }

  const postMatch = route.path.match(/^\/posts\/([^/]+)$/)
  const post = postMatch && route.status === 200 ? getPost(decodeURIComponent(postMatch[1])) : undefined

  const series = post?.series ? getSeries(post.series) : undefined

  return {
    imagePath,
    title: post?.social?.headline ?? route.title,
    description: post?.social?.subhead ?? route.description,
    label: post ? 'shuhari.me / posts' : 'shuhari.me',
    date: post ? formatDate(post.date) : undefined,
    kicker: series ? `${series.title} · ${getSeriesPartLabel(post!.seriesPart!)}` : undefined,
    art: post?.social?.art,
  }
}
