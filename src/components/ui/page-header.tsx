import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-2 sm:space-y-3">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
