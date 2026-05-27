import { escapeXml } from './escape'
import { posts } from './posts'
import { site } from './site'

export function getFeedXml() {
  const items = posts
    .map((post) => {
      const url = `${site.url}/posts/${post.slug}`

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.description)}</description>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00.000Z`).toUTCString()}</pubDate>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <description>${escapeXml(site.description)}</description>
    <link>${site.url}</link>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`
}

export function getSitemapXml(routes: string[]) {
  const urls = routes
    .filter((route) => route !== '/404')
    .map((route) => {
      const post = posts.find((candidate) => route === `/posts/${candidate.slug}`)
      const lastmod = post ? `\n    <lastmod>${formatDateForSitemap(post.date)}</lastmod>` : ''
      return `  <url>
    <loc>${site.url}${route === '/' ? '' : route}</loc>${lastmod}
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

function formatDateForSitemap(date: string) {
  return new Date(`${date}T00:00:00.000Z`).toISOString().slice(0, 10)
}
