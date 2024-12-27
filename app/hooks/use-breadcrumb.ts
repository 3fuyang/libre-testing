import { useMatches } from '@tanstack/react-router'

export function useBreadcrumb() {
  const matches = useMatches()

  const breadcrumb = matches
    .map((match) => (match.context as { segment?: string }).segment)
    .filter(Boolean)

  return breadcrumb
}
