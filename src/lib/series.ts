export type Series = {
  slug: string
  title: string
  description: string
}

export const series: Series[] = [
  {
    slug: 'papers-explained',
    title: 'Papers, explained',
    description:
      'My past research papers, explained in plain language for anyone who has taken calculus.',
  },
]

export function getSeries(slug: string) {
  return series.find((candidate) => candidate.slug === slug)
}
