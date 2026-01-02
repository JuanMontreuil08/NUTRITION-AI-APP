import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive active:scale-95 shadow-md hover:shadow-lg",
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground hover:shadow-xl hover:from-primary hover:to-primary/70 active:from-primary/90',
        destructive:
          'bg-gradient-to-br from-destructive to-destructive/80 text-white hover:shadow-xl hover:from-destructive hover:to-destructive/70 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        outline:
          'border-2 border-primary bg-background text-primary hover:bg-primary/10 hover:border-primary/60 transition-colors',
        secondary:
          'bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground hover:shadow-xl hover:from-secondary hover:to-secondary/70 active:from-secondary/90',
        ghost:
          'text-primary hover:bg-primary/15 active:bg-primary/20 transition-colors',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-9 rounded-lg gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-11 rounded-lg px-6 has-[>svg]:px-4 text-base',
        icon: 'size-10',
        'icon-sm': 'size-9',
        'icon-lg': 'size-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
