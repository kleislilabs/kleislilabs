import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center border font-medium w-fit whitespace-nowrap shrink-0 gap-1 [&>svg]:pointer-events-none transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        success:
          "border-transparent bg-green-600 text-white [a&]:hover:bg-green-600/90 dark:bg-green-700",
        warning:
          "border-transparent bg-amber-500 text-white [a&]:hover:bg-amber-500/90 dark:bg-amber-600",
        info:
          "border-transparent bg-blue-600 text-white [a&]:hover:bg-blue-600/90 dark:bg-blue-700",
      },
      size: {
        sm: "px-1.5 py-0.5 text-xs [&>svg]:size-3",
        md: "px-2 py-0.5 text-xs [&>svg]:size-3",
        lg: "px-3 py-1 text-sm [&>svg]:size-4",
      },
      shape: {
        rounded: "rounded-md",
        pill: "rounded-full",
        square: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "rounded",
    },
    compoundVariants: [
      {
        size: "sm",
        shape: "pill",
        className: "px-2",
      },
      {
        size: "lg",
        shape: "pill",
        className: "px-4",
      },
    ],
  }
)

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean
    closable?: boolean
    onClose?: () => void
    closeLabel?: string
    icon?: React.ReactNode
  }

/**
 * Badge component for displaying labels, statuses, and tags.
 * 
 * @example
 * <Badge variant="success" size="lg">
 *   <CheckCircle className="size-4" />
 *   Completed
 * </Badge>
 * 
 * @example Closable badge
 * <Badge closable onClose={() => console.log('closed')}>
 *   Tag
 * </Badge>
 */
function Badge({
  className,
  variant,
  size,
  shape,
  asChild = false,
  closable = false,
  onClose,
  closeLabel = "Remove",
  icon,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span"

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClose?.()
  }

  // When using asChild, pass through children directly
  if (asChild && !icon && !closable) {
    return (
      <Comp
        data-slot="badge"
        data-testid="badge"
        className={cn(
          badgeVariants({ variant, size, shape }),
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  }

  // For regular badges, we can add icons and close button
  return (
    <Comp
      data-slot="badge"
      data-testid="badge"
      className={cn(
        badgeVariants({ variant, size, shape }),
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {closable && (
        <button
          type="button"
          onClick={handleClose}
          aria-label={closeLabel}
          className="ml-0.5 -mr-0.5 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-ring/50"
          data-testid="badge-close"
        >
          <X className="size-3" />
        </button>
      )}
    </Comp>
  )
}

export { Badge, badgeVariants, type BadgeProps }