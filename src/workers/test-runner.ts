import {
  triangleJudgeImplementations,
  type TriangleJudgeVersion,
} from '@/atoms/triangle-judge'
import type { TestResultItem } from '@/components/result-table/columns'

onmessage = (e) => {
  const { version, cases } = e.data
  const implementation =
    triangleJudgeImplementations[version as TriangleJudgeVersion]
  const result = runTest(
    implementation as (...args: unknown[]) => string,
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
