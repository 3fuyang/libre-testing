import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/homework/')({
  loader: () => {
    return redirect({
      to: '/homework/triangle-judge',
    })
  },
})
