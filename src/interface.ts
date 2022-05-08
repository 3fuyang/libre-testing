// Reusable Types
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