import type { TestResultItem } from '@/components/result-table/columns'
import { atom } from 'jotai'

export type ComputerSellingVersion = '0.1.0' | '0.2.0'

export const computerSellingImplementations: Record<
  ComputerSellingVersion,
  (host: number, monitor: number, peripheral: number) => string
> = {
  '0.1.0': (host, monitor, peripheral) => {
    if (host <= 0 || monitor <= 0 || peripheral <= 0) {
      return '数据非法，各部件销售数量不能小于1'
    }
    if (host > 70) {
      return '数据非法，主机销售数量不能超过70'
    }
    if (monitor > 80) {
      return '数据非法，显示器销售数量不能超过80'
    }
    if (peripheral > 90) {
      return '数据非法，外设销售数量不能超过90'
    }

    const totalSales = host * 25 + monitor * 30 + peripheral * 45
    if (totalSales <= 1000) {
      return String(totalSales * 0.1)
    } else if (totalSales <= 1800) {
      return String(totalSales * 0.15)
    } else {
      return String(totalSales * 0.2)
    }
  },
  '0.2.0': (host, monitor, peripheral) => {
    if (host == -1) {
      return '系统开始统计月度销售额'
    }
    if (host <= 0 || monitor <= 0 || peripheral <= 0) {
      return '数据非法，各部件销售数量不能小于1'
    }
    if (host > 70) {
      return '数据非法，主机销售数量不能超过70'
    }
    if (monitor > 80) {
      return '数据非法，显示器销售数量不能超过80'
    }
    if (peripheral > 90) {
      return '数据非法，外设销售数量不能超过90'
    }

    const totalSales = host * 25 + monitor * 30 + peripheral * 45
    if (totalSales <= 1000) {
      return String(totalSales * 0.1)
    } else if (totalSales <= 1800) {
      return String(totalSales * 0.15)
    } else {
      return String(totalSales * 0.2)
    }
  },
}

export type ComputerSellingTestCase =
  | 'boundary-basic'
  | 'boundary-robust'
  | 'equivalence-weak-common'
  | 'equivalence-strong-common'
  | 'equivalence-weak-robust'
  | 'equivalence-strong-robust'
  | 'decision-table'

interface ComputerSellingState {
  version: ComputerSellingVersion
  testCase: ComputerSellingTestCase
  runningState: 'idle' | 'running' | 'finished'
  testResult?: TestResultItem[]
}

export const computerSellingAtom = atom<ComputerSellingState>({
  version: '0.2.0',
  testCase: 'boundary-basic',
  runningState: 'idle',
})
