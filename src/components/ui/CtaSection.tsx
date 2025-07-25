import { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ctaSectionVariants = cva(
  "relative overflow-hidden rounded-lg border p-6 sm:p-8",
  {
    variants: {
      variant: {
        default: "bg-background border-border",
        primary: "bg-primary/5 border-primary/20",
        secondary: "bg-secondary/50 border-secondary",
        outlined: "bg-transparent border-2",
      },
      size: {
        sm: "p-4 sm:p-6",
        default: "p-6 sm:p-8",
        lg: "p-8 sm:p-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface CtaSectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ctaSectionVariants> {
  title?: string;
  description?: string;
  children?: ReactNode;
  actions?: ReactNode;
}

export function CtaSection({
  className,
  variant,
  size,
  title,
  description,
  children,
  actions,
  ...props
}: CtaSectionProps) {
  return (
    <section
      className={cn(ctaSectionVariants({ variant, size, className }))}
      {...props}
    >
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {title && (
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-muted-foreground leading-6 sm:leading-7 mb-6">
            {description}
          </p>
        )}
        {children}
        {actions && (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6">
            {actions}
          </div>
        )}
      </div>
    </section>
  );
}
