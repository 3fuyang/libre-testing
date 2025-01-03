import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/final-project/system-testing')({
  component: RouteComponent,
  context: () => {
    return {
      segment: '系统测试',
    }
  },
})

function RouteComponent() {
  return <div>WIP 🚧</div>
}
