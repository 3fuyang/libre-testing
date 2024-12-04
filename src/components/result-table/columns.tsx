import { Tooltip, TooltipProvider } from '@radix-ui/react-tooltip'
import { ColumnDef } from '@tanstack/react-table'
import { Ban, CheckIcon } from 'lucide-react'
import { Flex } from '../flex'
import { TooltipContent, TooltipTrigger } from '../ui/tooltip'

export interface TestResultItem {
  id: string
  input: string
  expected: string
  actual: string
  passed: boolean
  /**
   * Execution time in ms
   */
  duration: number
}

export const columns: ColumnDef<TestResultItem>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 40,
  },
  {
    accessorKey: 'input',
    header: 'Input',
    size: 80,
    cell: ({ row }) => {
      const inputStr = row.getValue('input') as string

      return <Ellipsis content={inputStr} />
    },
  },
  {
    accessorKey: 'expected',
    header: 'Expected',
    size: 160,
    cell: ({ row }) => {
      const expectedStr = row.getValue('expected') as string

      return <Ellipsis content={expectedStr} />
    },
  },
  {
    accessorKey: 'actual',
    header: 'Actual',
    size: 160,
    cell: ({ row }) => {
      const actualStr = row.getValue('actual') as string

      return <Ellipsis content={actualStr} />
    },
  },
  {
    accessorKey: 'passed',
    header: 'Passed',
    size: 100,
    cell: ({ row }) => {
      const passed = row.getValue('passed') as boolean

      return (
        <Flex align="center" gap="1">
          {passed ? (
            <CheckIcon className="size-4 text-green-500" />
          ) : (
            <Ban className="size-4 text-red-500" />
          )}
          <span className="text-xs">{passed ? 'Passed' : 'Failed'}</span>
        </Flex>
      )
    },
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
    size: 80,
    cell: ({ row }) => {
      const duration = row.getValue('duration') as number

      const formattedDuration = `${duration} ms`

      return <Ellipsis content={formattedDuration} />
    },
  },
]

interface EllipsisProps {
  content: string
}

function Ellipsis({ content }: EllipsisProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger className="max-w-full cursor-auto truncate">
          {content}
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
