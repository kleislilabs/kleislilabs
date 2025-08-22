import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    // existing variant definitions...
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 active:scale-[0.98]",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 active:scale-[0.98] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 active:scale-[0.98]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 active:scale-[0.98]",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        success:
          "bg-green-600 text-white shadow-xs hover:bg-green-600/90 active:scale-[0.98] dark:bg-green-700",
        warning:
          "bg-amber-500 text-white shadow-xs hover:bg-amber-500/90 active:scale-[0.98] dark:bg-amber-600",
      },
      size: {
        default: "h-9 px-4 py-2 text-sm has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 text-xs has-[>svg]:px-2.5",
        lg: "h-10 px-6 text-base has-[>svg]:px-4",
        xl: "h-12 px-8 text-lg has-[>svg]:px-6",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
      shape: {
        default: "rounded-md",
        rounded: "rounded-lg",
        pill: "rounded-full",
        square: "rounded-none",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
      fullWidth: false,
    },
    compoundVariants: [
      {
        shape: "pill",
        size: "default",
        className: "px-6",
      },
      {
        shape: "pill",
        size: "lg",
        className: "px-8",
      },
    ],
  }
)

type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
    loadingText?: string
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
  }

/**
 * Button component with multiple variants, sizes, and loading states.
 * 
 * @example
 * <Button variant="success" size="lg" leftIcon={<CheckIcon />}>
 *   Save Changes
 * </Button>
 * 
 * @example Loading state
 * <Button loading loadingText="Processing...">
 *   Submit
 * </Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    shape,
    fullWidth,
    asChild = false,
    loading = false,
    loadingText,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button"

    // When using asChild, we need to pass through children directly
    // to avoid React.Children.only error
    if (asChild && !loading && !leftIcon && !rightIcon) {
      return (
        <Comp
          ref={ref}
          data-slot="button"
          data-testid="button"
          className={cn(buttonVariants({ variant, size, shape, fullWidth }), className)}
          disabled={disabled}
          {...props}
        >
          {children}
        </Comp>
      )
    }

    // For regular buttons, we can add icons and loading states
    return (
      <Comp
        ref={ref}
        data-slot="button"
        data-testid="button"
        className={cn(buttonVariants({ variant, size, shape, fullWidth }), className)}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <Loader2 className="size-4 animate-spin" aria-label="Loading" />
        )}
        {!loading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {loading ? loadingText || children : children}
        {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants, type ButtonProps }