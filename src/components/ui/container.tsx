import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const containerVariants = cva(
  "mx-auto w-full",
  {
    variants: {
      size: {
        sm: "max-w-screen-sm",
        md: "max-w-screen-md",
        lg: "max-w-screen-lg",
        xl: "max-w-screen-xl",
        "2xl": "max-w-screen-2xl",
        full: "max-w-full",
        prose: "max-w-prose",
        narrow: "max-w-2xl",
        wide: "max-w-7xl",
      },
      padding: {
        none: "",
        sm: "px-4 sm:px-6",
        md: "px-4 sm:px-6 lg:px-8",
        lg: "px-6 sm:px-8 lg:px-12",
        xl: "px-8 sm:px-12 lg:px-16",
        responsive: "px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16",
      },
      center: {
        true: "flex flex-col items-center justify-center",
        false: "",
      },
      minHeight: {
        none: "",
        screen: "min-h-screen",
        content: "min-h-[calc(100vh-theme(spacing.16))]",
        half: "min-h-[50vh]",
      },
    },
    defaultVariants: {
      size: "xl",
      padding: "md",
      center: false,
      minHeight: "none",
    },
  }
)

type ContainerProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof containerVariants> & {
    as?: React.ElementType
  }

/**
 * Container component for consistent layout and responsive sizing.
 * 
 * @example
 * <Container size="lg" padding="responsive">
 *   <h1>Page Content</h1>
 * </Container>
 * 
 * @example Centered content with min height
 * <Container center minHeight="screen">
 *   <div>Centered Content</div>
 * </Container>
 */
const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ 
    className, 
    size, 
    padding, 
    center, 
    minHeight,
    as: Component = "div",
    ...props 
  }, ref) => {
    return (
      <Component
        ref={ref}
        data-testid="container"
        className={cn(
          containerVariants({ size, padding, center, minHeight }),
          className
        )}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

const containerSectionVariants = cva(
  "w-full",
  {
    variants: {
      spacing: {
        none: "",
        sm: "py-8 sm:py-12",
        md: "py-12 sm:py-16",
        lg: "py-16 sm:py-20 lg:py-24",
        xl: "py-20 sm:py-24 lg:py-32",
      },
      background: {
        none: "",
        muted: "bg-muted",
        accent: "bg-accent",
        primary: "bg-primary text-primary-foreground",
        gradient: "bg-gradient-to-b from-background to-muted",
      },
    },
    defaultVariants: {
      spacing: "md",
      background: "none",
    },
  }
)

type ContainerSectionProps = React.ComponentPropsWithoutRef<"section"> &
  VariantProps<typeof containerSectionVariants> &
  ContainerProps

/**
 * Section wrapper with Container built-in for page sections.
 * 
 * @example
 * <ContainerSection spacing="lg" background="muted">
 *   <h2>Section Title</h2>
 * </ContainerSection>
 */
const ContainerSection = React.forwardRef<HTMLElement, ContainerSectionProps>(
  ({ 
    className,
    children,
    spacing,
    background,
    size,
    padding,
    center,
    minHeight,
    ...props 
  }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(containerSectionVariants({ spacing, background }), className)}
        {...props}
      >
        <Container size={size} padding={padding} center={center} minHeight={minHeight}>
          {children}
        </Container>
      </section>
    )
  }
)
ContainerSection.displayName = "ContainerSection"

export { 
  Container, 
  ContainerSection,
  containerVariants, 
  containerSectionVariants,
  type ContainerProps,
  type ContainerSectionProps
}