import { renderToString } from 'react-dom/server'

import { App } from './app'
import { escapeHtml } from './lib/escape'
import { getFeedXml, getSitemapXml } from './lib/rss'
import { getDocumentTitle, getRoute, staticRoutes } from './lib/routes'
import { site } from './lib/site'

export { getFeedXml, getSitemapXml, staticRoutes }

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

  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="robots" content="follow, index" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(site.title)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
  ].join('\n    ')
}
