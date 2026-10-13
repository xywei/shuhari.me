import { ArrowLeft, ArrowRight } from 'lucide-react'

import { getPostsInSeries, type Post } from '@/lib/posts'
import { getSeries } from '@/lib/series'

type SeriesNavProps = {
  post: Post
}

export function SeriesNav({ post }: SeriesNavProps) {
  const series = post.series ? getSeries(post.series) : undefined

  if (!series) {
    return null
  }

  const parts = getPostsInSeries(series.slug)
  const index = parts.findIndex((part) => part.slug === post.slug)
  const previous = parts[index - 1]
  const next = parts[index + 1]

  return (
    <nav aria-label={`${series.title} series`} className="post-series">
      <p className="type-metadata">
        {post.seriesPart === 0 ? 'Introduction to' : `Part ${post.seriesPart} of`}{' '}
        <a className="ink-link" href={`/series/${series.slug}`}>
          {series.title}
        </a>
      </p>
      {(previous || next) && (
        <div className="grid gap-3 sm:grid-cols-2">
          {previous ? (
            <a className="post-series-link" href={`/posts/${previous.slug}`}>
              <span className="type-metadata inline-flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Previous
              </span>
              <span className="font-medium">{previous.title}</span>
            </a>
          ) : (
            <span />
          )}
          {next && (
            <a className="post-series-link sm:text-right" href={`/posts/${next.slug}`}>
              <span className="type-metadata inline-flex items-center gap-1 sm:justify-end">
                Next <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="font-medium">{next.title}</span>
            </a>
          )}
        </div>
      )}
    </nav>
  )
}
