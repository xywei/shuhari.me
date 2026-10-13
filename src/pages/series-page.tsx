import { formatDate } from '@/lib/date'
import { getSeriesPartLabel, type Post } from '@/lib/posts'
import type { Series } from '@/lib/series'

type SeriesPageProps = {
  series: Series
  posts: Post[]
}

export function SeriesPage({ series, posts }: SeriesPageProps) {
  return (
    <section className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-12">
      <div className="space-y-3 lg:sticky lg:top-24 lg:self-start">
        <p className="type-eyebrow">Series</p>
        <p className="type-metadata">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} so far.
        </p>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <h1 className="type-page-title">{series.title}</h1>
          <p className="type-lede max-w-2xl text-base">{series.description}</p>
        </div>
        <ol className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-card">
          {posts.map((post) => (
            <li key={post.slug} className="border-b last:border-b-0">
              <a
                className="grid min-h-16 gap-2 p-5 hover:bg-secondary/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:grid-cols-[4rem_minmax(0,1fr)] sm:p-6"
                href={`/posts/${post.slug}`}
              >
                <span className="type-metadata">{getSeriesPartLabel(post.seriesPart!)}</span>
                <span className="space-y-1">
                  <span className="type-ledger-title block hover:underline">{post.title}</span>
                  <span className="block text-sm text-muted-foreground">{post.description}</span>
                  <time className="type-metadata block" dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
