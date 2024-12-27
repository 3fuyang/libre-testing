import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/homework/')({
  beforeLoad: () => {
    return redirect({
      to: '/homework/triangle-judge',
      replace: true,
    })
  },
})
