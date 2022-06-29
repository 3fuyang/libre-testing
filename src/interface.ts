// Reusable Types
import type { LineSeriesOption, BarSeriesOption, PieSeriesOption } from 'echarts/charts'
import type {
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
} from 'echarts/components'
import type { ComposeOption } from 'echarts'

export interface Row {
  [index: string]: string | undefined | number
  key: string
  TestCaseID?: string
  Year?: string
  Month?: string
  Day?: string
  Edge1?: string
  Edge2?: string
  Edge3?: string
  Host?: string
  Monitor?: string
  Peripheral?: string
  callingTime?: number
  count?: number
  ExpectedOutput?: string
  ActualOutput?: string
  Correctness?: string
  Time?: string
  TesterName?: string
}

export interface Column {
  title: string
  key: string
}

export interface Crumb {
  label: string
  path: string
}

export type ECOption = ComposeOption<
  | LineSeriesOption
  | BarSeriesOption
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>

export interface IterationData {
  key: string
  version: string
  dataset: string
  result: string
  bug: string
}

export interface Iteration {
  columns: Column[]
  data: IterationData[]
}