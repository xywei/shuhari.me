import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(dirname, '..')
const dist = path.join(root, 'dist')
const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')

const serverEntry = await import(pathToFileURL(path.join(dist, 'server', 'entry-server.js')))

for (const route of serverEntry.staticRoutes) {
  const { appHtml, headTags } = serverEntry.render(route)
  const html = template
    .replace('<!--head-tags-->', headTags)
    .replace('<!--app-html-->', appHtml)

  await writeRoute(route, html)
}

await fs.writeFile(path.join(dist, 'feed.xml'), serverEntry.getFeedXml(), 'utf8')
await fs.writeFile(path.join(dist, 'sitemap.xml'), serverEntry.getSitemapXml(serverEntry.staticRoutes), 'utf8')
await fs.writeFile(
  path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: https://www.shuhari.me/sitemap.xml\n`,
  'utf8'
)

await fs.rm(path.join(dist, 'server'), { recursive: true, force: true })

async function writeRoute(route, html) {
  if (route === '/') {
    await fs.writeFile(path.join(dist, 'index.html'), html, 'utf8')
    return
  }

  if (route === '/404') {
    await fs.writeFile(path.join(dist, '404.html'), html, 'utf8')
    return
  }

  const outputDir = path.join(dist, ...route.slice(1).split('/'))
  await fs.mkdir(outputDir, { recursive: true })
  await fs.writeFile(path.join(outputDir, 'index.html'), html, 'utf8')

  const cleanUrlFile = path.join(dist, `${route.slice(1)}.html`)
  await fs.mkdir(path.dirname(cleanUrlFile), { recursive: true })
  await fs.writeFile(cleanUrlFile, html, 'utf8')
}
