import { ArrowRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/date'
import { posts } from '@/lib/posts'

export function PostsIndexPage() {
  return (
    <section className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Posts</h1>
        <p className="text-muted-foreground">Notes, recipes, and longer-form technical writing.</p>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.slug}>
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <CardTitle>
                    <a className="hover:underline" href={`/posts/${post.slug}`}>
                      {post.title}
                    </a>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{formatDate(post.date)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <a key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
                      <Badge variant="outline">{tag}</Badge>
                    </a>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{post.description}</p>
              <a
                className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
                href={`/posts/${post.slug}`}
              >
                Read more <ArrowRight className="h-4 w-4" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
