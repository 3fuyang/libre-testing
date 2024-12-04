import {
  triangleJudgeAtom,
  type TriangleJudgeTestCase,
  type TriangleJudgeVersion,
} from '@/atoms/triangle-judge'
import { Flex } from '@/components/flex'
import { columns, type TestResultItem } from '@/components/result-table/columns'
import { DataTable } from '@/components/result-table/table'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList } from '@/components/ui/tabs'
import { highlighter } from '@/lib/highlighter'
// @ts-expect-error Typed worker module
import testRunnerWorker from '@/workers/test-runner?worker'
import { TabsContent, TabsTrigger } from '@radix-ui/react-tabs'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useAtom } from 'jotai'
import { Loader2, Play } from 'lucide-react'

export const Route = createLazyFileRoute('/homework/triangle-judge')({
  component: RouteComponent,
})

function RouteComponent() {
  const { tab } = Route.useSearch()
  const navigate = Route.useNavigate()

  return (
    <Tabs
      value={tab}
      onValueChange={(value) => {
        navigate({
          to: '.',
          search: {
            tab: value as 'question' | 'result',
          },
          replace: true,
        })
      }}
    >
      {/* @see https://github.com/shadcn-ui/ui/issues/2928#issuecomment-1984805942 */}
      <TabsList className="mb-3 w-full justify-start rounded-none border-b bg-transparent p-0 text-sm">
        <TabsTrigger
          value="question"
          className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-1 text-muted-foreground shadow-none transition-all data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          问题描述
        </TabsTrigger>
        <TabsTrigger
          value="result"
          className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-1 text-muted-foreground shadow-none transition-all data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          测试结果
        </TabsTrigger>
      </TabsList>

      <TabsContent value="question">
        <QuestionPanel />
      </TabsContent>

      <TabsContent value="result">
        <ResultPanel />
      </TabsContent>
    </Tabs>
  )
}

function QuestionPanel() {
  const code = `function triangleJudge(a: number, b: number, c: number): string {
  if (a <= 0 || b <= 0 || c <= 0 || a > 200 || b > 200 || c > 200) {
    return '边长数值越界'
  }
  if (
    a + b > c &&
    a + c > b &&
    b + c > a
  ) {
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
}`

  const html = highlighter.codeToHtml(code, {
    lang: 'typescript',
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  })

  return (
    <Card className="flex-1">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Question 1. 判断三角形类型</CardTitle>
        <CardDescription>输入三角形的三条边，判断三角形的类型</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="font-medium">算法思想</p>
        <p className="text-sm">
          本题输入变量有 <code>a</code>, <code>b</code>, <code>c</code>{' '}
          三个，首先判断其两边之和是否大于第三边，若大于则判断可以构成三角形，再进一步判断该三角形类型；否则不能构成三角形。
        </p>
        <p className="font-medium">代码实现</p>
        <TestToolbar />
        {/* eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml */}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </CardContent>
    </Card>
  )
}

function ResultPanel() {
  const [{ testResult = [] }] = useAtom(triangleJudgeAtom)

  console.log(testResult)

  return (
    <Card className="flex-1">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Question 1. 判断三角形类型</CardTitle>
        <CardDescription>输入三角形的三条边，判断三角形的类型</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <TestToolbar />
          <div className="container">
            <DataTable columns={columns} data={testResult} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function TestToolbar() {
  const navigate = Route.useNavigate()
  const [triangleJudgeState, setTriangleJudgeState] = useAtom(triangleJudgeAtom)
  const { version, testCase, runningState } = triangleJudgeState

  const isRunning = runningState === 'running'

  return (
    <Flex align="center" gap="4">
      <Select defaultValue="typescript" disabled={isRunning}>
        <SelectTrigger>
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="typescript">TypeScript</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={version}
        disabled={isRunning}
        onValueChange={(value) =>
          setTriangleJudgeState({
            ...triangleJudgeState,
            version: value as TriangleJudgeVersion,
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Version" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0.1.0">0.1.0</SelectItem>
          <SelectItem value="0.2.0">0.2.0</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={testCase}
        disabled={isRunning}
        onValueChange={(value) =>
          setTriangleJudgeState({
            ...triangleJudgeState,
            testCase: value as TriangleJudgeTestCase,
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Test Case" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="text-foreground/80">边界值</SelectLabel>
            <SelectItem value="boundary-basic">基本边界值</SelectItem>
            <SelectItem value="boundary-robust">健壮边界值</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel className="text-foreground/80">等价类</SelectLabel>
            <SelectItem value="equivalence-weak-common">
              弱一般等价类
            </SelectItem>
            <SelectItem value="equivalence-strong-common">
              强一般等价类
            </SelectItem>
            <SelectItem value="equivalence-weak-robust">
              弱健壮等价类
            </SelectItem>
            <SelectItem value="equivalence-strong-robust">
              强健壮等价类
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button
        variant="default"
        disabled={isRunning}
        onClick={async () => {
          setTriangleJudgeState({
            ...triangleJudgeState,
            runningState: 'running',
          })
          const { cases } = (await import(
            `../../../cases/triangle-judge/${testCase}.json`
          )) as {
            cases: {
              input: [number, number, number]
              expected: string
            }[]
          }

          const worker: Worker = new testRunnerWorker()

          worker.postMessage({
            version,
            cases,
          })

          worker.onmessage = (e) => {
            const result = e.data as TestResultItem[]
            setTriangleJudgeState({
              ...triangleJudgeState,
              runningState: 'idle',
              testResult: result,
            })
            navigate({
              to: '.',
              search: {
                tab: 'result',
              },
              replace: true,
            })
          }
        }}
      >
        <Flex align="center" gap="2">
          {isRunning ? <Loader2 className="animate-spin" /> : <Play />}
          <span>执 行</span>
        </Flex>
      </Button>
    </Flex>
  )
}
