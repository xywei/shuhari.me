import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react'
import 'nextra-theme-blog/style.css'
import '../styles/main.css'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        />
      </Head>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
      <Analytics />
    </>
  )
}
