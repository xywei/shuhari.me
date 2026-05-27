import { formatDate } from '@/lib/date'
import type { Post } from '@/lib/posts'

type TagPageProps = {
  tag: string
  posts: Post[]
}

export function TagPage({ tag, posts }: TagPageProps) {
  return (
    <section className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-12">
      <div className="space-y-3 lg:sticky lg:top-28 lg:self-start">
        <p className="font-mono text-sm text-muted-foreground">tag</p>
        <p className="text-sm text-muted-foreground">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this topic.
        </p>
      </div>

      <div className="space-y-8">
        <h1 className="text-4xl font-bold tracking-tight">Posts tagged “{tag}”</h1>
        <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-card">
          {posts.map((post) => (
            <article key={post.slug} className="border-b p-5 last:border-b-0 sm:p-6">
              <a
                className="inline-flex min-h-11 items-center rounded-md text-xl font-semibold tracking-tight hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                href={`/posts/${post.slug}`}
              >
                {post.title}
              </a>
              <div className="mt-2 space-y-2">
                <p className="text-sm text-muted-foreground">{formatDate(post.date)}</p>
                <p className="max-w-2xl text-muted-foreground">{post.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
