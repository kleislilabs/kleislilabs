import { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionVariants = cva(
  "w-full",
  {
    variants: {
      spacing: {
        none: "",
        sm: "py-8 sm:py-12",
        default: "py-12 sm:py-16",
        lg: "py-16 sm:py-20",
        xl: "py-20 sm:py-24",
      },
      background: {
        none: "",
        muted: "bg-muted/30",
        accent: "bg-accent/5",
        border: "border-t",
      },
    },
    defaultVariants: {
      spacing: "default",
      background: "none",
    },
  }
);

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  children: ReactNode;
  container?: boolean;
}

export function Section({
  className,
  spacing,
  background,
  children,
  container = true,
  ...props
}: SectionProps) {
  const content = container ? (
    <div className="container">
      {children}
    </div>
  ) : (
    children
  );

  return (
    <section
      className={cn(sectionVariants({ spacing, background, className }))}
      {...props}
    >
      {content}
    </section>
  );
}
