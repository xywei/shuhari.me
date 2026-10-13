# Writing posts

Posts live in `src/posts/` as `.mdx` files (Markdown with JSX). `.tsx` posts also work.
The build fails if a post's metadata is invalid, so `npm run build` is the check.

## Metadata

Every post exports a `meta` object at the top:

```mdx
export const meta = {
  slug: 'image-segmentation',
  title: 'Find the outline by blurring the mask',
  date: '2026-11-01',
  description: 'One sentence shown under the title, in lists and in link previews.',
  tags: ['papers', 'image-processing'],
  draft: true,
  series: 'papers-explained',
  seriesPart: 1,
  paper: 'https://doi.org/10.1016/j.jcp.2017.08.020',
  aiDisclosure: 'Claude drafted the outline and first draft from the paper and my notes. I checked every technical claim and wrote the behind-the-scenes section myself.',
}
```

- `draft: true` keeps a post out of the build. Remove it to publish.
- `series` and `seriesPart` add the post to a series (defined in `src/lib/series.ts`). The post gets previous/next links, and the series gets a page at `/series/<slug>`.
- `paper` must match the link in the homepage publications list exactly. The homepage then shows a "Plain-language explainer" link under that paper, and the post shows a "Read the paper" link.
- `aiDisclosure` is shown as an "AI use disclosure" section at the end of the post. Posts dated 2026-10-13 or later cannot be published without one.

## Building blocks

These work in any `.mdx` post without an import:

- Math: `$e^{-kx}$` inline, and `$$ ... $$` on its own lines for display math (KaTeX).
- `<Figure src={image} alt="..." caption="..." />` for an image. Import the image at the top of the post, for example `import image from './image-segmentation/cameraman.png'`. For custom content such as an interactive demo, use `<Figure caption="...">...</Figure>`.
- `<Curious>...</Curious>` for a collapsible "For the curious" box. Use `title="..."` to change the label. The main text must make sense with every box closed.
- Markdown tables, footnotes and strikethrough (GitHub Flavored Markdown).

## Papers, explained: post template

Each post in the series uses these sections, in this order:

1. **The hook.** One paragraph about something the reader has seen.
2. **The question.** What we wanted to compute, in one sentence.
3. **Why it's hard.** The obstacle, ideally with a picture of the naive approach failing.
4. **The key idea.** One idea, one figure. Everything else goes in a `<Curious>` box.
5. **Behind the scenes.** What I tried first, what surprised me, who I worked with.
6. **Go further.** The paper, the code, and related posts.
7. **AI use disclosure.** Written in `meta.aiDisclosure`; the page renders it.

## Style

Write 61.8% of the way to ASD-STE100 (Simplified Technical English):

- Use active voice and one idea per sentence.
- Keep sentences to 25 words or fewer and paragraphs to 6 sentences or fewer.
- Use one word for one meaning. Avoid idioms, and avoid phrasal verbs where a plain verb exists.
- STE's controlled dictionary does not apply: technical terms are fine once defined.
- The hook and the behind-the-scenes sections keep a personal voice.

Write for an undergrad who knows calculus. Show the picture before the formula. Say in words what each equation means right after it.
