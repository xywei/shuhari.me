import { ArrowRight, ArrowUpRight } from 'lucide-react'

import type { ReactNode } from 'react'

import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/date'
import { getPostForPaper, posts } from '@/lib/posts'

const recentPostCount = 3

const chronology = [
  ['current', 'build software at Pathlit', 'https://pathlit.com/'],
  ['2023–2024', "master's student at UIUC – technology management", 'https://giesbusiness.illinois.edu/'],
  [
    '2018–2022',
    'research at UIUC – scientific and high performance computing',
    'https://siebelschool.illinois.edu/',
  ],
  [
    '2014–2018',
    'PhD student at HKUST – math, physics, scientific computing',
    'https://www.math.hkust.edu.hk/',
  ],
  ['2010–2014', 'undergrad at PKU – math and economics', 'https://www.math.pku.edu.cn/'],
] as const

const publications = [
  [
    '2026',
    'Quadrature by Matched Asymptotic Expansion (QBMAX): Accelerating Evaluation of Layer Potentials with Boundary Layers',
    'arXiv preprint, submitted',
    'https://arxiv.org/abs/2609.10857',
  ],
  [
    '2026',
    'modepy: Basis Functions, Interpolation, and Quadrature (not just) for Finite Elements',
    'Journal of Open Source Software',
    'https://doi.org/10.21105/joss.09294',
  ],
  [
    '2024',
    'Exact domain truncation for the Morse-Ingard equations',
    'Computers & Mathematics with Applications',
    'https://doi.org/10.1016/j.camwa.2024.02.046',
  ],
  [
    '2023',
    'Integral equation methods for the Morse-Ingard equations',
    'Journal of Computational Physics',
    'https://doi.org/10.1016/j.jcp.2023.112416',
  ],
  [
    '2020',
    'An integral equation method for the Cahn-Hilliard equation in the wetting problem',
    'Journal of Computational Physics',
    'https://doi.org/10.1016/j.jcp.2020.109521',
  ],
  [
    '2020',
    'Decomposing thermal fluctuations with hydrodynamic modes',
    'Phys. Rev. E',
    'https://doi.org/10.1103/PhysRevE.101.063104',
  ],
  [
    '2017',
    'An efficient iterative thresholding method for image segmentation',
    'Journal of Computational Physics',
    'https://doi.org/10.1016/j.jcp.2017.08.020',
  ],
] as const

const projects = [
  [
    'volumential',
    'OpenCL-accelerated volume potential computation with the fast multipole method.',
    'https://github.com/xywei/volumential',
    'current',
  ],
  [
    'threshseg',
    'Iterative thresholding method for image segmentation, in Matlab.',
    'https://github.com/xywei/threshseg',
    'past',
  ],
  [
    'mbox',
    'Classical Merriman-Bence-Osher scheme in 2/3D, in C++.',
    'https://github.com/xywei/MBOX',
    'past',
  ],
  [
    'vim-dealii-prm',
    "Vim syntax highlighting for deal.ii's parameter files.",
    'https://github.com/xywei/vim-dealii-prm',
    'past',
  ],
] as const

const rowClass =
  'group -mx-3 grid min-h-11 gap-1 rounded-md px-3 py-2.5 transition-colors hover:bg-secondary/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4'

const rowTitleClass =
  'font-medium text-foreground underline-offset-[0.22em] decoration-muted-foreground/40 group-hover:underline'

type SectionProps = {
  title: string
  children: ReactNode
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="grid gap-6 border-t pt-10 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-12 lg:pt-14">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <h2 className="type-section-title">{title}</h2>
      </div>
      <div>{children}</div>
    </section>
  )
}

export function HomePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-[clamp(3.5rem,8vw,5.5rem)]">
      <section className="space-y-6 lg:pt-6">
        <Badge variant="outline" className="w-fit font-medium text-muted-foreground">
          */acc
        </Badge>
        <div className="space-y-5">
          <h1 className="type-display max-w-3xl whitespace-nowrap">Jacob Xiaoyu Wei</h1>
          <p className="type-lede">
            Builder with roots in scientific computing, math, and high performance numerical
            methods.
          </p>
          <p className="flex items-center gap-2.5 text-muted-foreground">
            <span className="annotation-dot" aria-hidden="true" />
            <span>
              Currently building software at{' '}
              <a
                className="ink-link inline-flex items-center gap-0.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                href="https://pathlit.com/"
              >
                Pathlit
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              .
            </span>
          </p>
        </div>
      </section>

      <Section title="Chrono">
        <ol className="space-y-1">
          {chronology.map(([period, label, href]) => (
            <li key={`${period}-${label}`}>
              <a className={rowClass} href={href}>
                <span className="type-metadata flex items-center gap-2 sm:pt-px">
                  {period}
                  {period === 'current' && <span className="annotation-dot" aria-hidden="true" />}
                </span>
                <span>
                  <span className={rowTitleClass}>{label}</span>
                  <ArrowUpRight
                    className="ml-1 inline h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Works">
        <div className="space-y-12">
          <div className="space-y-4">
            <h3 className="type-eyebrow">Journal Publications</h3>
            <ul className="space-y-1">
              {publications.map(([year, title, venue, href]) => {
                const explainer = getPostForPaper(href)

                return (
                  <li key={title}>
                    <a className={rowClass} href={href}>
                      <span className="type-metadata sm:pt-px">{year}</span>
                      <span>
                        <span className={rowTitleClass}>{title}</span>
                        <span className="mt-0.5 block text-sm text-muted-foreground">{venue}</span>
                      </span>
                    </a>
                    {explainer && (
                      <a
                        className="ink-link inline-flex min-h-11 items-center gap-1 text-sm sm:ml-32"
                        href={`/posts/${explainer.slug}`}
                      >
                        Plain-language explainer <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="type-eyebrow">Software Projects</h3>
            <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-card">
              {projects.map(([name, description, href, status]) => (
                <a
                  key={name}
                  className="group grid min-h-16 gap-2 border-b px-5 py-4 transition-colors last:border-b-0 hover:bg-secondary/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:grid-cols-[10rem_minmax(0,1fr)_4.5rem] sm:items-baseline sm:gap-4"
                  href={href}
                >
                  <span className="type-ledger-title underline-offset-[0.22em] decoration-muted-foreground/40 group-hover:underline">
                    {name}
                  </span>
                  <span className="text-sm leading-6 text-muted-foreground">{description}</span>
                  <span className="type-metadata flex items-center gap-2 sm:justify-end">
                    {status === 'current' && <span className="annotation-dot" aria-hidden="true" />}
                    {status}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {posts.length > 0 && (
        <Section title="Writing">
          <div className="space-y-4">
            <ul className="space-y-1">
              {posts.slice(0, recentPostCount).map((post) => (
                <li key={post.slug}>
                  <a className={rowClass} href={`/posts/${post.slug}`}>
                    <time className="type-metadata sm:pt-px" dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                    <span>
                      <span className={rowTitleClass}>{post.title}</span>
                      <span className="mt-0.5 block text-sm text-muted-foreground">
                        {post.description}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              className="ink-link inline-flex min-h-11 items-center gap-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              href="/posts"
            >
              All posts <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Section>
      )}
    </div>
  )
}
