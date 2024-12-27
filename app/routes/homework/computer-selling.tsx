import {
  computerSellingAtom,
  type ComputerSellingTestCase,
  type ComputerSellingVersion,
} from '@/atoms/computer-seeling'
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
import { useToast } from '@/hooks/use-toast'
import { triggerConfetti } from '@/lib/confetti'
import { highlighterPromise } from '@/lib/highlighter'
import { cn } from '@/lib/utils'
import testRunnerWorker from '@/workers/test-runner?worker'
import { TabsContent, TabsTrigger } from '@radix-ui/react-tabs'
import { createFileRoute } from '@tanstack/react-router'
import { useAtom, useAtomValue } from 'jotai'
import { Check, Loader2, Play } from 'lucide-react'
import { use } from 'react'
import { z } from 'zod'

const searchSchema = z.object({
  tab: z.enum(['question', 'result']).default('question').catch('question'),
})

export const Route = createFileRoute('/homework/computer-selling')({
  validateSearch: searchSchema,
  component: RouteComponent,
  context: () => {
    return {
      segment: '计算机销售系统',
    }
  },
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
          className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-1 text-muted-foreground shadow-none transition-all hover:text-foreground focus-visible:text-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          问题描述
        </TabsTrigger>
        <TabsTrigger
          value="result"
          className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-1 text-muted-foreground shadow-none transition-all hover:text-foreground focus-visible:text-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
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
  const code = `function computerSelling(host: number, monitor: number, peripheral: number): string {
  if (host == -1) {
    return "系统开始统计月度销售额"
  }
  if (host <= 0 || monitor <= 0 || peripheral <= 0) {
    return "数据非法，各部件销售数量不能小于1"
  }
  if (host > 70) {
    return "数据非法，主机销售数量不能超过70"
  }
  if (monitor > 80) {
    return "数据非法，显示器销售数量不能超过80"
  }
  if (peripheral > 90) {
    return "数据非法，外设销售数量不能超过90"
  }

  const totalSales: number = host * 25 + monitor * 30 + peripheral * 45;
  if (totalSales <= 1000) {
    return String(totalSales * 0.1)
  } else if (totalSales <= 1800) {
    return String(totalSales * 0.15)
  } else {
    return String(totalSales * 0.2)
  }
}`

  const highlighter = use(highlighterPromise)

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
        <CardTitle className="text-lg">Question 3. 电脑销售系统</CardTitle>
        <CardDescription>
          根据输入的主机、显示器、外设数量，计算销售总额
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="font-medium">算法思想</p>
        <p className="text-sm">
          首先判断主机的销售数量，当这个变量值为 <code>-1</code>{' '}
          时，发出月度统计，当值不为 <code>-1</code> 时计算总额
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
  const [{ testResult = [] }] = useAtom(computerSellingAtom)

  return (
    <Card className="flex-1">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Question 3. 电脑销售系统</CardTitle>
        <CardDescription>
          根据输入的主机、显示器、外设数量，计算销售总额
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <TestToolbar />
          <TestResultOverview />
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
  const { toast } = useToast()

  const [computerSellingState, setComputerSellingState] =
    useAtom(computerSellingAtom)
  const { version, testCase, runningState } = computerSellingState

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
          setComputerSellingState({
            ...computerSellingState,
            version: value as ComputerSellingVersion,
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
          setComputerSellingState({
            ...computerSellingState,
            testCase: value as ComputerSellingTestCase,
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
        </SelectContent>
      </Select>

      <Button
        variant="default"
        disabled={isRunning}
        onClick={async () => {
          setComputerSellingState({
            ...computerSellingState,
            runningState: 'running',
          })
          const { cases } = (await import(
            `../../../cases/computer-selling/${testCase}.json`
          )) as {
            cases: {
              input: [number, number, number]
              expected: string
            }[]
          }

          const worker: Worker = new testRunnerWorker()

          worker.postMessage({
            problem: 'computer-selling',
            version,
            cases,
          })

          worker.onmessage = (e) => {
            const result = e.data as TestResultItem[]
            setComputerSellingState({
              ...computerSellingState,
              runningState: 'idle',
              testResult: result,
            })

            toast({
              title: '测试完成 - 电脑销售问题',
              description: `共执行 ${cases.length} 个用例，通过数：${result.filter((item) => item.passed).length}`,
            })

            if (result.every((item) => item.passed)) {
              triggerConfetti()
            }

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

function TestResultOverview() {
  const { testResult = [] } = useAtomValue(computerSellingAtom)

  const shouldDisplay = testResult.length > 0

  return (
    <dl>
      <Flex gap="6" className="text-sm">
        <Flex align="center" gap="2">
          <dt className="leading-none text-muted-foreground">用例总数</dt>
          <dd
            className={cn(
              'leading-none',
              !shouldDisplay && 'text-muted-foreground',
            )}
          >
            {shouldDisplay ? testResult.length : '--'}
          </dd>
        </Flex>

        <Flex align="center" gap="2">
          <dt className="leading-none text-muted-foreground">通过用例数</dt>
          <dd
            className={cn(
              'leading-none',
              !shouldDisplay && 'text-muted-foreground',
            )}
          >
            {shouldDisplay ? (
              <Flex align="center" gap="1">
                <Check className="size-4 text-green-600 dark:text-green-500" />
                <span>{testResult.filter((item) => item.passed).length}</span>
                <span className="text-muted-foreground">/</span>
                <span>{testResult.length}</span>
              </Flex>
            ) : (
              '--'
            )}
          </dd>
        </Flex>
      </Flex>
    </dl>
  )
}
