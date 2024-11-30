import { useEffect, type PropsWithChildren } from 'react'
import { useDarkMode } from 'usehooks-ts'

export function ThemeProvider(props: PropsWithChildren) {
  const { isDarkMode } = useDarkMode()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return <>{props.children}</>
}
