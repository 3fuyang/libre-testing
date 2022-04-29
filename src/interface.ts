// Reusable Types
export interface Row {
  [index: string]: string | undefined
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