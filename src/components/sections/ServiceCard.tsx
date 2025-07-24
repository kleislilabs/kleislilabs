import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  className?: string;
}

export function ServiceCard({ title, description, icon: Icon, className }: ServiceCardProps) {
  return (
    <Card className={cn("h-full transition-all duration-200 hover:shadow-lg", className)}>
      <CardHeader className="text-center">
        {Icon && (
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-teal/10 mb-4">
            <Icon className="h-6 w-6 text-teal" />
          </div>
        )}
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}