import { ArrowUpRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const chronology = [
  ['current', 'build software at Pathlit', 'https://pathlit.com/'],
  ['2023-2024', "master's student at UIUC - technology management", 'https://giesbusiness.illinois.edu/'],
  [
    '2018-2022',
    'research at UIUC - scientific and high-performance computing',
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
  ['uforth', 'A Forth interpreter written in Hoon.', 'https://github.com/xywei/uforth', 'current'],
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
    <div className="mx-auto max-w-5xl space-y-14">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="space-y-6">
          <Badge variant="outline" className="w-fit">
            */acc
          </Badge>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
              Jacob Xiaoyu Wei
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Software engineer with roots in scientific computing, math, and high-performance
              numerical methods.
            </p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Current</CardTitle>
            <CardDescription>Building software at Pathlit.</CardDescription>
          </CardHeader>
          <CardContent>
            <a
              className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
              href="https://pathlit.com/"
            >
              pathlit.com <ArrowUpRight className="h-4 w-4" />
            </a>
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Chrono</h2>
        </div>
        <ol className="space-y-5">
          {chronology.map(([period, label, href]) => (
            <li key={`${period}-${label}`} className="grid gap-2 sm:grid-cols-[8rem_1fr]">
              <span className="font-mono text-sm text-muted-foreground">{period}</span>
              <a className="group font-medium" href={href}>
                {label}{' '}
                <ArrowUpRight className="inline h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ol>
      </section>

      <Separator />

      <section className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Works</h2>
        </div>
        <div className="space-y-10">
          <div className="space-y-4">
            <h3 className="font-semibold">Journal Publications</h3>
            <ul className="space-y-4">
              {publications.map(([year, title, venue, href]) => (
                <li key={title} className="grid gap-2 sm:grid-cols-[4rem_1fr]">
                  <span className="font-mono text-sm text-muted-foreground">{year}</span>
                  <div>
                    <a className="font-medium text-primary underline-offset-4 hover:underline" href={href}>
                      {title}
                    </a>
                    <p className="text-sm text-muted-foreground">{venue}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Software Projects</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map(([name, description, href, status]) => (
                <Card key={name}>
                  <CardHeader>
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle className="text-base">
                        <a className="hover:underline" href={href}>
                          {name}
                        </a>
                      </CardTitle>
                      <Badge variant={status === 'current' ? 'default' : 'secondary'}>{status}</Badge>
                    </div>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
