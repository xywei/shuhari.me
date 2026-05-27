const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
})

export function formatDate(date: string) {
  return formatter.format(new Date(`${date}T00:00:00.000Z`))
}
