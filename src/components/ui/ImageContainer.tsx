import { ReactNode } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ImageContainerProps {
  src: string;
  alt?: string;
  title?: string;
  description?: string;
  className?: string;
  children?: ReactNode;
  width?: number;
  height?: number;
}

export function ImageContainer({
  src,
  alt,
  title,
  description,
  className,
  children,
  width = 800,
  height = 600,
}: ImageContainerProps) {
  return (
    <Card className={cn("overflow-hidden border-2 border-border/30 shadow-lg rounded-2xl hover:shadow-xl hover:border-border/50 transition-all duration-300 group", className)}>
      <CardContent className="p-0">
        <div className="relative">
          <Image
            src={src}
            alt={alt || title || "Image"}
            width={width}
            height={height}
            className="w-full h-auto object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />
          
          {/* Overlay for title if present and no description */}
          {title && !description && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 sm:p-6 rounded-b-2xl">
              <h3 className="text-white font-semibold text-sm sm:text-base leading-tight">
                {title}
              </h3>
            </div>
          )}
        </div>
        
        {/* Caption area when description is provided */}
        {(title || description) && description && (
          <div className="p-4 sm:p-6 bg-muted/20 border-t border-border/30">
            {title && (
              <h3 className="font-semibold text-base sm:text-lg mb-2 text-foreground">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}
        
        {children}
      </CardContent>
    </Card>
  );
}
