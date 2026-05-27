import { ArrowRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/date'
import { posts } from '@/lib/posts'

export function PostsIndexPage() {
  return (
    <section className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-12">
      <div className="space-y-3 lg:sticky lg:top-28 lg:self-start">
        <h1 className="text-4xl font-bold tracking-tight">Posts</h1>
        <p className="max-w-sm text-muted-foreground">Notes, recipes, and longer-form technical writing.</p>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-card">
        {posts.map((post) => (
          <article key={post.slug} className="border-b p-5 last:border-b-0 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
              <div className="space-y-2">
                <a
                  className="inline-flex min-h-11 items-center rounded-md text-xl font-semibold tracking-tight hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                  href={`/posts/${post.slug}`}
                >
                  {post.title}
                </a>
                <p className="text-sm text-muted-foreground">{formatDate(post.date)}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <a
                    key={tag}
                    className="inline-flex min-h-11 items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                    href={`/tags/${encodeURIComponent(tag)}`}
                  >
                    <Badge variant="outline">{tag}</Badge>
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <p className="max-w-2xl text-muted-foreground">{post.description}</p>
              <a
                className="inline-flex min-h-11 items-center gap-1 rounded-md font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                href={`/posts/${post.slug}`}
              >
                Read more <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
