import type { ReactNode } from 'react'

import { ContactPage } from '@/pages/contact-page'
import { HomePage } from '@/pages/home-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { PostPage } from '@/pages/post-page'
import { PostsIndexPage } from '@/pages/posts-index-page'
import { TagPage } from '@/pages/tag-page'

import { getPost, getPostsByTag, posts, tags } from './posts'
import { site } from './site'

export type RouteResult = {
  status: 200 | 404
  path: string
  title: string
  description: string
  element: ReactNode
  canonicalPath?: string
}

const fixedRoutes = ['/', '/posts', '/contact'] as const

export const staticRoutes = [
  ...fixedRoutes,
  ...posts.map((post) => `/posts/${post.slug}`),
  ...tags.map((tag) => `/tags/${encodeURIComponent(tag)}`),
  '/404',
]

export function normalizePath(pathname: string) {
  const path = pathname.split(/[?#]/, 1)[0] || '/'

  if (path !== '/' && path.endsWith('/')) {
    return path.slice(0, -1)
  }

  return path
}

export function getRoute(pathname: string): RouteResult {
  const path = normalizePath(pathname)

  if (path === '/') {
    return {
      status: 200,
      path,
      title: site.title,
      description: site.description,
      element: <HomePage />,
    }
  }

  if (path === '/posts') {
    return {
      status: 200,
      path,
      title: 'Posts',
      description: 'Notes, recipes, and longer-form technical writing by Jacob Xiaoyu Wei.',
      element: <PostsIndexPage />,
    }
  }

  if (path === '/contact') {
    return {
      status: 200,
      path,
      title: 'Contact',
      description: 'Contact links for Jacob Xiaoyu Wei.',
      element: <ContactPage />,
    }
  }

  const postMatch = path.match(/^\/posts\/([^/]+)$/)
  if (postMatch) {
    const post = getPost(decodeURIComponent(postMatch[1]))

    if (post) {
      return {
        status: 200,
        path,
        title: post.title,
        description: post.description,
        element: <PostPage post={post} />,
      }
    }
  }

  const tagMatch = path.match(/^\/tags\/([^/]+)$/)
  if (tagMatch) {
    const tag = decodeURIComponent(tagMatch[1])
    const taggedPosts = getPostsByTag(tag)

    if (taggedPosts.length > 0) {
      return {
        status: 200,
        path,
        title: `Posts tagged ${tag}`,
        description: `Posts tagged ${tag} by Jacob Xiaoyu Wei.`,
        element: <TagPage tag={tag} posts={taggedPosts} />,
      }
    }
  }

  return {
    status: 404,
    path,
    title: 'Page not found',
    description: 'The requested page could not be found.',
    element: <NotFoundPage />,
    canonicalPath: '/404',
  }
}

export function getDocumentTitle(route: RouteResult) {
  return route.title === site.title ? route.title : `${route.title} | ${site.name}`
}
