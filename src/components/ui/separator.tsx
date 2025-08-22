"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const separatorVariants = cva(
  "shrink-0",
  {
    variants: {
      variant: {
        default: "bg-border",
        muted: "bg-muted",
        strong: "bg-foreground/20",
        gradient: "bg-gradient-to-r from-transparent via-border to-transparent",
      },
      size: {
        default: "data-[orientation=horizontal]:h-px data-[orientation=vertical]:w-px",
        sm: "data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:w-0.5",
        md: "data-[orientation=horizontal]:h-[2px] data-[orientation=vertical]:w-[2px]",
        lg: "data-[orientation=horizontal]:h-1 data-[orientation=vertical]:w-1",
      },
      spacing: {
        none: "",
        sm: "data-[orientation=horizontal]:my-2 data-[orientation=vertical]:mx-2",
        md: "data-[orientation=horizontal]:my-4 data-[orientation=vertical]:mx-4",
        lg: "data-[orientation=horizontal]:my-6 data-[orientation=vertical]:mx-6",
        xl: "data-[orientation=horizontal]:my-8 data-[orientation=vertical]:mx-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      spacing: "none",
    },
  }
)

type SeparatorProps = React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> &
  VariantProps<typeof separatorVariants> & {
    label?: string
  }

/**
 * Separator component with variants and optional label.
 * 
 * @example
 * <Separator variant="gradient" spacing="md" />
 * 
 * @example With label
 * <Separator label="OR" spacing="lg" />
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  variant,
  size,
  spacing,
  label,
  ...props
}: SeparatorProps) {
  if (label && orientation === "horizontal") {
    return (
      <div 
        className={cn(
          "relative flex items-center",
          spacing === "sm" && "my-2",
          spacing === "md" && "my-4",
          spacing === "lg" && "my-6",
          spacing === "xl" && "my-8",
          className
        )}
        data-testid="separator-with-label"
      >
        <SeparatorPrimitive.Root
          decorative={decorative}
          orientation={orientation}
          className={cn(
            separatorVariants({ variant, size }),
            "flex-1 data-[orientation=horizontal]:w-full"
          )}
          {...props}
        />
        <span className="mx-3 text-xs text-muted-foreground font-medium bg-background px-2">
          {label}
        </span>
        <SeparatorPrimitive.Root
          decorative={decorative}
          orientation={orientation}
          className={cn(
            separatorVariants({ variant, size }),
            "flex-1 data-[orientation=horizontal]:w-full"
          )}
          {...props}
        />
      </div>
    )
  }

  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      data-testid="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        separatorVariants({ variant, size, spacing }),
        orientation === "horizontal" ? "w-full" : "h-full",
        className
      )}
      {...props}
    />
  )
}

export { Separator, separatorVariants, type SeparatorProps }