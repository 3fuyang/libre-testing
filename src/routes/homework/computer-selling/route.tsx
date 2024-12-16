import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const searchSchema = z.object({
  tab: z.enum(['question', 'result']).default('question').catch('question'),
})

export const Route = createFileRoute('/homework/computer-selling')({
  validateSearch: searchSchema,
  context: () => {
    return {
      segment: '计算机销售系统',
    }
  },
})
