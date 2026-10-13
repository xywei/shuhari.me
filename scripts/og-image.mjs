import { promises as fs } from 'node:fs'
import { createRequire } from 'node:module'

import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'

const require = createRequire(import.meta.url)

const colors = {
  paper: '#f9f6ee',
  ink: '#091423',
  muted: '#435163',
  amber: '#da9e3f',
  border: '#c1ccd9',
}

const fonts = await Promise.all(
  [400, 600, 700].map(async (weight) => ({
    name: 'Commissioner',
    weight,
    style: 'normal',
    data: await fs.readFile(
      require.resolve(`@fontsource/commissioner/files/commissioner-latin-${weight}-normal.woff`)
    ),
  }))
)

const h = (type, style, ...children) => ({
  type,
  props: { style, children: children.length === 1 ? children[0] : children },
})

export async function renderOgImage(card, size) {
  const titleSize = card.title.length > 48 ? 64 : card.title.length > 28 ? 80 : 96

  const tree = h(
    'div',
    {
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '72px 80px',
      backgroundColor: colors.paper,
      color: colors.ink,
      fontFamily: 'Commissioner',
      borderTop: `12px solid ${colors.amber}`,
    },
    h(
      'div',
      { display: 'flex', fontSize: 28, fontWeight: 600, color: colors.muted, letterSpacing: '-0.01em' },
      card.label
    ),
    h(
      'div',
      { display: 'flex', flexDirection: 'column', gap: 28 },
      h(
        'div',
        {
          display: 'flex',
          fontSize: titleSize,
          fontWeight: 700,
          lineHeight: 1.02,
          letterSpacing: '-0.045em',
        },
        card.title
      ),
      h(
        'div',
        { display: 'flex', fontSize: 32, lineHeight: 1.4, color: colors.muted, maxWidth: 960 },
        card.description
      )
    ),
    h(
      'div',
      {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: 24,
        borderTop: `2px solid ${colors.border}`,
        fontSize: 26,
        color: colors.muted,
      },
      h('div', { display: 'flex' }, 'Jacob Xiaoyu Wei'),
      h('div', { display: 'flex' }, card.date ?? 'www.shuhari.me')
    )
  )

  const svg = await satori(tree, { ...size, fonts })
  return new Resvg(svg, { fitTo: { mode: 'width', value: size.width } }).render().asPng()
}
