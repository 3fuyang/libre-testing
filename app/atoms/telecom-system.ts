import type { TestResultItem } from '@/components/result-table/columns'
import { atom } from 'jotai'

export type TelecomSystemVersion = '0.1.0' | '0.2.0' | '0.3.0'

export const telecomSystemImplementations: Record<
  TelecomSystemVersion,
  (callingTime: number, count: number) => string
> = {
  '0.1.0': (callingTime: number, count: number) => {
    if (callingTime < 0 || callingTime > 31 * 24 * 60) {
      return '通话时长数值越界'
    }
    if (count < 0 || count > 11) {
      return '未按时缴费次数越界'
    }

    const maxNum: number[] = [1, 2, 3, 3, 6]
    const level: number = getLevel(callingTime)
    if (count <= maxNum[level]) {
      return String(25 + 0.15 * callingTime * (1 - (level + 1) * 0.005))
    } else {
      return String(25 + 0.15 * callingTime)
    }

    function getLevel(time: number): number {
      if (time > 0 && time <= 60) return 1
      else if (time > 60 && time <= 120) return 2
      else if (time > 120 && time <= 180) return 3
      else if (time > 180 && time <= 300) return 4
      else return 5
    }
  },
  '0.2.0': (callingTime, count) => {
    if (callingTime < 0 || callingTime > 31 * 24 * 60) {
      return '通话时长数值越界'
    }
    if (count < 0 || count > 11) {
      return '未按时缴费次数越界'
    }

    const maxNum: number[] = [1, 2, 3, 3, 6]
    const level: number = getLevel(callingTime)
    if (count <= maxNum[level - 1]) {
      return String(25 + 0.15 * callingTime * (1 - (level + 1) * 0.005))
    } else {
      return String(25 + 0.15 * callingTime)
    }

    function getLevel(time: number): number {
      if (time > 0 && time <= 60) return 1
      else if (time > 60 && time <= 120) return 2
      else if (time > 120 && time <= 180) return 3
      else if (time > 180 && time <= 300) return 4
      else return 5
    }
  },
  '0.3.0': (callingTime: number, count: number) => {
    if (callingTime < 0 || callingTime > 31 * 24 * 60) {
      return '通话时长数值越界'
    }
    if (count < 0 || count > 11) {
      return '未按时缴费次数越界'
    }

    const maxNum: number[] = [1, 2, 3, 3, 6]
    const level: number = getLevel(callingTime)
    if (count <= maxNum[level - 1]) {
      return String(
        Math.round(
          (25 + 0.15 * callingTime * (1 - (level + 1) * 0.005)) * 100,
        ) / 100,
      )
    } else {
      return String(Math.round((25 + 0.15 * callingTime) * 100) / 100)
    }

    function getLevel(time: number): number {
      if (time > 0 && time <= 60) return 1
      else if (time > 60 && time <= 120) return 2
      else if (time > 120 && time <= 180) return 3
      else if (time > 180 && time <= 300) return 4
      else return 5
    }
  },
}

export type TelecomSystemTestCase =
  | 'boundary-basic'
  | 'boundary-robust'
  | 'equivalence-weak-common'
  | 'equivalence-strong-common'
  | 'equivalence-weak-robust'
  | 'equivalence-strong-robust'
  | 'decision-table'

interface TelecomSystemState {
  version: TelecomSystemVersion
  testCase: TelecomSystemTestCase
  runningState: 'idle' | 'running' | 'finished'
  testResult?: TestResultItem[]
}

export const telecomSystemAtom = atom<TelecomSystemState>({
  version: '0.3.0',
  testCase: 'boundary-basic',
  runningState: 'idle',
})
