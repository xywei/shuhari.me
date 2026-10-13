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
      'Research explained in plain language for anyone who has taken calculus, starting with my own papers.',
  },
]

export function getSeries(slug: string) {
  return series.find((candidate) => candidate.slug === slug)
}
