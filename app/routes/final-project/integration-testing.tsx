import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/final-project/integration-testing')({
  component: RouteComponent,
  context: () => {
    return {
      segment: '集成测试',
    }
  },
})

function RouteComponent() {
  return <div>WIP 🚧</div>
}
