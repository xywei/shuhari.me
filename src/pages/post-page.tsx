import { ArrowLeft } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/date'
import type { Post } from '@/lib/posts'

type PostPageProps = {
  post: Post
}

export function PostPage({ post }: PostPageProps) {
  const Component = post.Component

  return (
    <article className="article">
      <a
        className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground no-underline hover:text-foreground"
        href="/posts"
      >
        <ArrowLeft className="h-4 w-4" /> Posts
      </a>
      <header className="mb-10 space-y-5">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <a key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
              <Badge variant="outline">{tag}</Badge>
            </a>
          ))}
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>
          <p className="text-lg leading-8 text-muted-foreground">{post.description}</p>
        </div>
        <time className="block text-sm text-muted-foreground" dateTime={post.date}>
          {formatDate(post.date)}
        </time>
      </header>
      <Component />
    </article>
  )
}
