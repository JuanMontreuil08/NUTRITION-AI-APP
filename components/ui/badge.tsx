import * as React from 'react'
import { cn } from '@/lib/utils'

function Badge({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-primary',
        className,
      )}
      {...props}
    />
  )
}

function BadgeSecondary({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-secondary/20 to-primary/20 border border-secondary/30 text-secondary',
        className,
      )}
      {...props}
    />
  )
}

export { Badge, BadgeSecondary }
