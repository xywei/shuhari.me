import { ArrowUpRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const chronology = [
  ['current', 'build software at Pathlit', 'https://pathlit.com/'],
  ['2023-2024', "master's student at UIUC - technology management", 'https://giesbusiness.illinois.edu/'],
  [
    '2018-2022',
    'research at UIUC - scientific and high performance computing',
    'https://siebelschool.illinois.edu/',
  ],
  [
    '2014-2018',
    'PhD student at HKUST - math, physics, scientific computing',
    'https://www.math.hkust.edu.hk/',
  ],
  ['2010-2014', 'undergrad at PKU - math and economics', 'https://www.math.pku.edu.cn/'],
] as const

const publications = [
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

export function HomePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-[clamp(3.5rem,8vw,5.5rem)]">
      <section className="grid gap-10 lg:min-h-[22rem] lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
        <div className="space-y-6">
          <Badge variant="outline" className="w-fit">
            */acc
          </Badge>
          <div className="space-y-4">
            <h1 className="type-display max-w-3xl whitespace-nowrap">
              Jacob Xiaoyu Wei
            </h1>
            <p className="type-lede">
              Builder with roots in scientific computing, math, and high performance numerical
              methods.
            </p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="type-subsection-title">Current</CardTitle>
            <CardDescription>Building software at Pathlit.</CardDescription>
          </CardHeader>
          <CardContent>
            <a
              className="inline-flex min-h-11 items-center gap-1 rounded-md font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              href="https://pathlit.com/"
            >
              pathlit.com <ArrowUpRight className="h-4 w-4" />
            </a>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 border-t pt-10 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-12 lg:pt-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="type-section-title">Chrono</h2>
        </div>
        <ol className="space-y-3">
          {chronology.map(([period, label, href]) => (
            <li key={`${period}-${label}`}>
              <a
                className="group -mx-3 grid min-h-11 gap-2 rounded-md px-3 py-2 font-medium hover:bg-secondary/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:grid-cols-[8rem_1fr] sm:items-center"
                href={href}
              >
                <span className="type-metadata">{period}</span>
                <span>
                  {label}{' '}
                  <ArrowUpRight className="inline h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-6 border-t pt-10 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-12 lg:pt-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="type-section-title">Works</h2>
        </div>
        <div className="space-y-12">
          <div className="space-y-4">
            <h3 className="type-subsection-title">Journal Publications</h3>
            <ul className="space-y-3">
              {publications.map(([year, title, venue, href]) => (
                <li key={title}>
                  <a
                    className="-mx-3 grid min-h-11 gap-2 rounded-md px-3 py-2 hover:bg-secondary/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:grid-cols-[4rem_1fr]"
                    href={href}
                  >
                    <span className="type-metadata">{year}</span>
                    <span>
                      <span className="font-medium text-primary underline-offset-4 hover:underline">
                        {title}
                      </span>
                      <span className="block text-sm text-muted-foreground">{venue}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="type-subsection-title">Software Projects</h3>
            <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-card">
              {projects.map(([name, description, href, status]) => (
                <a
                  key={name}
                  className="grid min-h-16 gap-3 border-b p-5 underline-offset-4 last:border-b-0 hover:bg-secondary/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:grid-cols-[10rem_1fr_auto] sm:items-start"
                  href={href}
                >
                  <span className="type-ledger-title hover:underline">
                    {name}
                  </span>
                  <span className="text-sm leading-6 text-muted-foreground">{description}</span>
                  <Badge variant={status === 'current' ? 'default' : 'secondary'} className="w-fit">
                    {status}
                  </Badge>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
