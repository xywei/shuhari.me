import katex from 'katex'

type MathProps = {
  tex: string
  display?: boolean
  label?: string
}

export function Math({ tex, display = false, label }: MathProps) {
  const html = katex.renderToString(tex, {
    displayMode: display,
    throwOnError: false,
    strict: 'warn',
    output: 'html',
  })

  if (display) {
    return (
      <div
        aria-label={label}
        className="math-display"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return (
    <span
      aria-label={label}
      className="whitespace-nowrap"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
