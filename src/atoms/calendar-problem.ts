import type { TestResultItem } from '@/components/result-table/columns'
import { atom } from 'jotai'

export type CalendarProblemVersion = '0.1.0' | '0.2.0' | '0.3.0'

export const calendarProblemImplementations: Record<
  CalendarProblemVersion,
  (year: number, month: number, day: number) => string
> = {
  '0.1.0': (year, month, day) => {
    if (year < 1900 || year > 2100) {
      return '年份数值越界'
    }
    if (month <= 0 || month > 12) {
      return '月份数值越界'
    }

    const monthDays: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    let isLeap = 0
    if (year % 4 == 0) {
      isLeap = 1
    }
    if (year % 100 == 0 && year % 400 == 0) {
      isLeap = 1
    }

    monthDays[1] += isLeap
    const maxDays: number = monthDays[month - 1]
    if (day <= 0 || day > maxDays) {
      return '日期数值越界'
    }

    const result: number[] = [year, month, day + 1]

    if (day == maxDays) result[2] = 1
    result[1]++
    if (result[1] > 12) result[1] = 1
    result[0]++
    return result[0] + '/' + result[1] + '/' + result[2]
  },
  '0.2.0': (year, month, day) => {
    if (year < 1900 || year > 2100) {
      return '年份数值越界'
    }
    if (month <= 0 || month > 12) {
      return '月份数值越界'
    }

    const monthDays: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    let isLeap = 0
    if (year % 4 == 0) {
      isLeap = 1
    }
    if (year % 100 == 0 && year % 400 == 0) {
      isLeap = 1
    }

    monthDays[1] += isLeap
    const maxDays: number = monthDays[month - 1]
    if (day <= 0 || day > maxDays) {
      return '日期数值越界'
    }

    const result: number[] = [year, month, day + 1]

    if (day == maxDays) {
      result[2] = 1
      result[1]++
    }
    if (result[1] > 12) {
      result[1] = 1
      result[0]++
    }
    return result[0] + '/' + result[1] + '/' + result[2]
  },
  '0.3.0': (year, month, day) => {
    if (year < 1900 || year > 2100) {
      return '年份数值越界'
    }
    if (month <= 0 || month > 12) {
      return '月份数值越界'
    }

    const monthDays: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    let isLeap = 0
    if (year % 400 == 0) {
      isLeap = 1
    } else if (year % 100 != 0 && year % 4 == 0) {
      isLeap = 1
    }

    monthDays[1] += isLeap
    const maxDays: number = monthDays[month - 1]
    if (day <= 0 || day > maxDays) {
      return '日期数值越界'
    }

    const result: number[] = [year, month, day + 1]

    if (day == maxDays) {
      result[2] = 1
      result[1]++
    }
    if (result[1] > 12) {
      result[1] = 1
      result[0]++
    }
    return result[0] + '/' + result[1] + '/' + result[2]
  },
}

export type CalendarProblemTestCase =
  | 'boundary-basic'
  | 'boundary-robust'
  | 'equivalence-weak-common'
  | 'equivalence-strong-common'
  | 'equivalence-weak-robust'
  | 'equivalence-strong-robust'
  | 'decision-table'

interface CalendarProblemState {
  version: CalendarProblemVersion
  testCase: CalendarProblemTestCase
  runningState: 'idle' | 'running' | 'finished'
  testResult?: TestResultItem[]
}

export const calendarProblemAtom = atom<CalendarProblemState>({
  version: '0.3.0',
  testCase: 'boundary-basic',
  runningState: 'idle',
})
