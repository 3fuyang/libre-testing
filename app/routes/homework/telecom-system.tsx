import {
  telecomSystemAtom,
  type TelecomSystemTestCase,
  type TelecomSystemVersion,
} from '@/atoms/telecom-system'
import boundaryBasic from '@/cases/telecom-system/boundary-basic.json?no-inline'
import boundaryRobust from '@/cases/telecom-system/boundary-robust.json?no-inline'
import decisionTable from '@/cases/telecom-system/decision-table.json?no-inline'
import equivalentStrongCommon from '@/cases/telecom-system/equivalence-strong-common.json?no-inline'
import equivalentStrongRobust from '@/cases/telecom-system/equivalence-strong-robust.json?no-inline'
import equivalentWeakCommon from '@/cases/telecom-system/equivalence-weak-common.json?no-inline'
import equivalentWeakRobust from '@/cases/telecom-system/equivalence-weak-robust.json?no-inline'
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

export const Route = createFileRoute('/homework/telecom-system')({
  validateSearch: searchSchema,
  head: () => ({
    links: [
      {
        rel: 'preload',
        as: 'script',
        href: boundaryBasic,
      },
      {
        rel: 'preload',
        as: 'script',
        href: boundaryRobust,
      },
      {
        rel: 'preload',
        as: 'script',
        href: decisionTable,
      },
      {
        rel: 'preload',
        as: 'script',
        href: equivalentStrongCommon,
      },
      {
        rel: 'preload',
        as: 'script',
        href: equivalentStrongRobust,
      },
      {
        rel: 'preload',
        as: 'script',
        href: equivalentWeakCommon,
      },
      {
        rel: 'preload',
        as: 'script',
        href: equivalentWeakRobust,
      },
    ],
  }),
  component: RouteComponent,
  context: () => {
    return {
      segment: '电信收费系统',
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
  const code = `function telecomSystem(callingTime: number, count: number): string {
  if (callingTime < 0 || callingTime > 31 * 24 * 60) {
    return "通话时长数值越界"
  }
  if (count < 0 || count > 11) {
    return "未按时缴费次数越界"
  }

  const maxNum: number[] = [1, 2, 3, 3, 6]
  const level: number = getLevel(callingTime)
  if (count <= maxNum[level - 1]) {
    return String(Math.round((25 + 0.15 * callingTime * (1 - (level + 1) * 0.005)) * 100) / 100)
  } else {
    return String(Math.round((25 + 0.15 * callingTime) * 100) / 100)
  }
}

function getLevel(time: number): number {
  if (time > 0 && time <= 60)
    return 1
  else if (time > 60 && time <= 120)
    return 2
  else if (time > 120 && time <= 180)
    return 3
  else if (time > 180 && time <= 300)
    return 4
  else
    return 5
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
        <CardTitle className="text-lg">Question 4. 电信收费系统</CardTitle>
        <CardDescription>
          输入本月通话时间、用户本年度未按时缴费次数，计算本月应缴话费
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="font-medium">算法思想</p>
        <p className="text-sm">
          首先校验输入的通话时间、未按时缴费次数，确定其符合规范后，再判断折扣档位，计算本月应缴话费
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
  const [{ testResult = [] }] = useAtom(telecomSystemAtom)

  return (
    <Card className="flex-1">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Question 4. 电信收费系统</CardTitle>
        <CardDescription>
          输入本月通话时间、用户本年度未按时缴费次数，计算本月应缴话费
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

  const [telecomSystemState, setTelecomSystemState] = useAtom(telecomSystemAtom)
  const { version, testCase, runningState } = telecomSystemState

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
          setTelecomSystemState({
            ...telecomSystemState,
            version: value as TelecomSystemVersion,
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Version" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0.1.0">0.1.0</SelectItem>
          <SelectItem value="0.2.0">0.2.0</SelectItem>
          <SelectItem value="0.3.0">0.3.0</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={testCase}
        disabled={isRunning}
        onValueChange={(value) =>
          setTelecomSystemState({
            ...telecomSystemState,
            testCase: value as TelecomSystemTestCase,
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
          <SelectGroup>
            <SelectLabel className="text-foreground/80">决策表</SelectLabel>
            <SelectItem value="decision-table">决策表</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button
        variant="default"
        disabled={isRunning}
        onClick={async () => {
          setTelecomSystemState({
            ...telecomSystemState,
            runningState: 'running',
          })
          const { cases } = (await import(
            `../../cases/telecom-system/${testCase}.json`
          )) as {
            cases: {
              input: [number, number, number]
              expected: string
            }[]
          }

          const worker: Worker = new testRunnerWorker()

          worker.postMessage({
            problem: 'telecom-system',
            version,
            cases,
          })

          worker.onmessage = (e) => {
            const result = e.data as TestResultItem[]
            setTelecomSystemState({
              ...telecomSystemState,
              runningState: 'idle',
              testResult: result,
            })

            toast({
              title: '测试完成 - 万年历问题',
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
  const { testResult = [] } = useAtomValue(telecomSystemAtom)

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
