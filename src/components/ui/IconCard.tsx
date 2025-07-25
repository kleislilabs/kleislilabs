import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface IconCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  children?: ReactNode;
  href?: string;
}

export function IconCard({
  icon: Icon,
  title,
  description,
  className,
  children,
  href,
}: IconCardProps) {
  const content = (
    <Card className={cn(
      "h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group cursor-pointer",
      className
    )}>
      <CardContent className="p-6 text-center space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
        
        {children}
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <a href={href} className="block h-full">
        {content}
      </a>
    );
  }

  return content;
}
