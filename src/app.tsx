import { Layout } from '@/components/layout'
import { getRoute, normalizePath } from '@/lib/routes'

type AppProps = {
  pathname?: string
}

export function App({ pathname }: AppProps) {
  const path = normalizePath(pathname ?? window.location.pathname)
  const route = getRoute(path)

  return <Layout pathname={path}>{route.element}</Layout>
}
