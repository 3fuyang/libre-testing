import { calendarProblemImplementations } from '@/atoms/calendar-problem'
import { computerSellingImplementations } from '@/atoms/computer-seeling'
import {
  triangleJudgeImplementations,
} from '@/atoms/triangle-judge'
import type { TestResultItem } from '@/components/result-table/columns'

const implementationMap = {
  'triangle-judge': triangleJudgeImplementations,
  'calendar-problem': calendarProblemImplementations,
  'computer-selling': computerSellingImplementations,
} as const

onmessage = (e) => {
  const { problem, version, cases } = e.data as {
    problem: keyof typeof implementationMap
    version: string
    cases: { input: unknown[]; expected: string }[]
  }
  const implementations = implementationMap[problem]
  const implementation = implementations[version as keyof typeof implementations] as (...args: unknown[]) => string
  const result = runTest(
    implementation,
    cases,
  )
  postMessage(result)
}

function runTest(
  implementation: (...args: unknown[]) => string,
  cases: { input: unknown[]; expected: string }[],
): TestResultItem[] {
  return cases.map(({ input, expected }, index) => {
    const start = performance.now()
    const result = implementation(...input)
    const duration = performance.now() - start
    return {
      id: `${index + 1}`,
      input: input.join(', '),
      expected,
      actual: result,
      passed: result === expected,
      duration,
    }
  })
}
