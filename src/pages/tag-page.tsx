import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/date'
import type { Post } from '@/lib/posts'

type TagPageProps = {
  tag: string
  posts: Post[]
}

export function TagPage({ tag, posts }: TagPageProps) {
  return (
    <section className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Posts tagged “{tag}”</h1>
        <p className="text-muted-foreground">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this topic.
        </p>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.slug}>
            <CardHeader>
              <CardTitle>
                <a className="hover:underline" href={`/posts/${post.slug}`}>
                  {post.title}
                </a>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{formatDate(post.date)}</p>
              <p className="text-muted-foreground">{post.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
