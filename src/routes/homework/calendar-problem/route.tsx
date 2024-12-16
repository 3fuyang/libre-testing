import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const searchSchema = z.object({
  tab: z.enum(['question', 'result']).default('question').catch('question'),
})

export const Route = createFileRoute('/homework/calendar-problem')({
  validateSearch: searchSchema,
  context: () => {
    return {
      segment: '万年历问题',
    }
  },
})
