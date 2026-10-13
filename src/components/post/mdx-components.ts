import type { MDXComponents } from 'mdx/types'

import { Math } from '@/components/math'

import { Curious } from './curious'
import { Figure } from './figure'

// Components available in every .mdx post without an import.
export const mdxComponents: MDXComponents = {
  Curious,
  Figure,
  Math,
}
