import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "bg-card text-card-foreground flex flex-col rounded-xl border shadow-sm transition-all",
  {
    variants: {
      variant: {
        default: "border-border",
        elevated: "border-transparent shadow-lg hover:shadow-xl",
        outline: "border-border/50 shadow-none",
        ghost: "border-transparent shadow-none",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      interactive: {
        true: "cursor-pointer hover:shadow-md hover:scale-[1.01] active:scale-[0.99]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      interactive: false,
    },
  }
)

type CardProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof cardVariants> & {
    asChild?: boolean
  }

/**
 * Card component with multiple variants and interactive states.
 * 
 * @example
 * <Card variant="elevated" interactive>
 *   <CardHeader>
 *     <CardTitle>Feature Card</CardTitle>
 *   </CardHeader>
 * </Card>
 */
function Card({ 
  className, 
  variant, 
  padding, 
  interactive,
  ...props 
}: CardProps) {
  return (
    <div
      data-slot="card"
      data-testid="card"
      className={cn(
        cardVariants({ variant, padding, interactive }),
        "gap-6",
        className
      )}
      {...props}
    />
  )
}

const cardHeaderVariants = cva(
  "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 has-data-[slot=card-action]:grid-cols-[1fr_auto]",
  {
    variants: {
      spacing: {
        none: "",
        sm: "px-4 [.border-b]:pb-4",
        md: "px-6 [.border-b]:pb-6",
        lg: "px-8 [.border-b]:pb-8",
      },
    },
    defaultVariants: {
      spacing: "md",
    },
  }
)

type CardHeaderProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof cardHeaderVariants>

function CardHeader({ 
  className, 
  spacing,
  ...props 
}: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={cn(cardHeaderVariants({ spacing }), className)}
      {...props}
    />
  )
}

function CardTitle({ 
  className, 
  as: Component = "h3",
  ...props 
}: React.ComponentPropsWithoutRef<"div"> & { as?: React.ElementType }) {
  return (
    <Component
      data-slot="card-title"
      className={cn("leading-none font-semibold text-lg", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm leading-relaxed", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

// intentionally no base classes; spacing is handled via variants
const cardContentVariants = cva(
  "",
  {
    variants: {
      spacing: {
        none: "",
        sm: "px-4",
        md: "px-6",
        lg: "px-8",
      },
    },
    defaultVariants: {
      spacing: "md",
    },
  }
)

type CardContentProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof cardContentVariants>

function CardContent({ 
  className, 
  spacing,
  ...props 
}: CardContentProps) {
  return (
    <div
      data-slot="card-content"
      className={cn(cardContentVariants({ spacing }), className)}
      {...props}
    />
  )
}

const cardFooterVariants = cva(
  "flex items-center",
  {
    variants: {
      spacing: {
        none: "",
        sm: "px-4 [.border-t]:pt-4",
        md: "px-6 [.border-t]:pt-6",
        lg: "px-8 [.border-t]:pt-8",
      },
      justify: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
      },
    },
    defaultVariants: {
      spacing: "md",
      justify: "start",
    },
  }
)

type CardFooterProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof cardFooterVariants>

function CardFooter({ 
  className, 
  spacing,
  justify,
  ...props 
}: CardFooterProps) {
  return (
    <div
      data-slot="card-footer"
      className={cn(cardFooterVariants({ spacing, justify }), className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
  type CardProps,
}