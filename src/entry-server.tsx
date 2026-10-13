import { renderToString } from 'react-dom/server'

import { App } from './app'
import { escapeHtml } from './lib/escape'
import { getOgCard, ogImageSize } from './lib/og'
import { getFeedXml, getSitemapXml } from './lib/rss'
import { getDocumentTitle, getRoute, staticRoutes } from './lib/routes'
import { site } from './lib/site'

export { getFeedXml, getOgCard, getSitemapXml, ogImageSize, staticRoutes }

export function render(pathname: string) {
  const route = getRoute(pathname)
  const appHtml = renderToString(<App pathname={pathname} />)

  return {
    status: route.status,
    appHtml,
    headTags: renderHead(pathname),
  }
}

function renderHead(pathname: string) {
  const route = getRoute(pathname)
  const title = getDocumentTitle(route)
  const description = route.description
  const canonicalPath = route.canonicalPath ?? route.path
  const canonical = `${site.url}${canonicalPath === '/' ? '' : canonicalPath}`
  const ogImage = `${site.url}${getOgCard(pathname).imagePath}`
  const ogType = route.status === 200 && /^\/posts\/[^/]+$/.test(route.path) ? 'article' : 'website'

  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="robots" content="follow, index" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:site_name" content="${escapeHtml(site.title)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:image:width" content="${ogImageSize.width}" />`,
    `<meta property="og:image:height" content="${ogImageSize.height}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
  ].join('\n    ')
}
