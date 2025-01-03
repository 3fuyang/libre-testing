import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/final-project/unit-testing')({
  component: RouteComponent,
  context: () => {
    return {
      segment: '单元测试',
    }
  },
})

function RouteComponent() {
  return <div>WIP 🚧</div>
}
