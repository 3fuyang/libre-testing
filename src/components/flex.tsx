import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'

export const gapValues = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
] as const

type GapDimension = 'gap' | 'gapX' | 'gapY'

type GapEnum = (typeof gapValues)[number]

type GapPropDefs = Partial<Record<GapDimension, GapEnum>>

const gapVariants = {
  gap: {
    '0': 'gap-0',
    '1': 'gap-1',
    '2': 'gap-2',
    '3': 'gap-3',
    '4': 'gap-4',
    '5': 'gap-5',
    '6': 'gap-6',
    '7': 'gap-7',
    '8': 'gap-8',
    '9': 'gap-9',
  },
  gapX: {
    '0': 'gap-x-0',
    '1': 'gap-x-1',
    '2': 'gap-x-2',
    '3': 'gap-x-3',
    '4': 'gap-x-4',
    '5': 'gap-x-5',
    '6': 'gap-x-6',
    '7': 'gap-x-7',
    '8': 'gap-x-8',
    '9': 'gap-x-9',
  },
  gapY: {
    '0': 'gap-y-0',
    '1': 'gap-y-1',
    '2': 'gap-y-2',
    '3': 'gap-y-3',
    '4': 'gap-y-4',
    '5': 'gap-y-5',
    '6': 'gap-y-6',
    '7': 'gap-y-7',
    '8': 'gap-y-8',
    '9': 'gap-y-9',
  },
}

interface FlexProps extends ComponentPropsWithoutRef<'div'>, GapPropDefs {
  as?: 'div' | 'span'
  display?: 'flex' | 'inline-flex'
  direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse'
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  wrap?: 'no-wrap' | 'wrap' | 'wrap-reverse'
}

const flexVariants = cva('', {
  variants: {
    display: {
      flex: 'flex',
      'inline-flex': 'inline-flex',
    },
    direction: {
      row: 'flex-row',
      'row-reverse': 'flex-row-reverse',
      col: 'flex-col',
      'col-reverse': 'flex-col-reverse',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
    },
    wrap: {
      'no-wrap': 'flex-nowrap',
      wrap: 'flex-wrap',
      'wrap-reverse': 'flex-wrap-reverse',
    },
    ...gapVariants,
  },
})

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  function Flex(props, ref) {
    const {
      as: Tag = 'div',
      display = 'flex',
      direction = 'row',
      align = 'start',
      justify = 'start',
      wrap = 'no-wrap',
      gap = '1',
      className,
      ...flexProps
    } = props

    return (
      <Tag
        ref={ref}
        className={cn(
          flexVariants({
            display,
            direction,
            align,
            justify,
            wrap,
            gap,
          }),
          className,
        )}
        {...flexProps}
      />
    )
  },
)
