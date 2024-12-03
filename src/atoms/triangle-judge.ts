import type { TestResultItem } from '@/components/result-table/columns'
import { atom } from 'jotai'

export type TriangleJudgeVersion = '0.1.0' | '0.2.0'

export const triangleJudgeImplementations: Record<
  TriangleJudgeVersion,
  (a: number, b: number, c: number) => string
> = {
  '0.1.0': (a, b, c) => {
    if (a <= 0 || b <= 0 || c <= 0 || a > 200 || b > 200 || c > 200) {
      return '边长数值越界'
    }
    if (a + b > c && a + c > b && b + c > a) {
      if (a === b && a === c) {
        return '该三角形是等边三角形'
      } else if (a === b || a === c || b === c) {
        return '该三角形是等腰三角形'
      } else {
        return '该三角形是普通三角形'
      }
    } else {
      return '所给三边数据不能构成三角形'
    }
  },
  '0.2.0': (a, b, c) => {
    if (a <= 0 || b <= 0 || c <= 0 || a > 200 || b > 200 || c > 200) {
      return '边长数值越界'
    }
    if (a + b > c && a + c > b && b + c > a) {
      if (a === b && a === c) {
        return '该三角形是等边三角形'
      } else if (a === b || a === c || b === c) {
        return '该三角形是等腰三角形'
      } else {
        return '该三角形是普通三角形'
      }
    } else {
      return '所给三边数据不能构成三角形'
    }
  },
}

export type TriangleJudgeTestCase =
  | 'boundary-basic'
  | 'boundary-robust'
  | 'equivalence-weak-common'
  | 'equivalence-strong-common'
  | 'equivalence-weak-robust'
  | 'equivalence-strong-robust'

interface TriangleJudgeState {
  version: TriangleJudgeVersion
  testCase: TriangleJudgeTestCase
  runningState: 'idle' | 'running' | 'finished'
  testResult?: TestResultItem[]
}

export const triangleJudgeAtom = atom<TriangleJudgeState>({
  version: '0.2.0',
  testCase: 'boundary-basic',
  runningState: 'idle',
})
