import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Hash } from "lucide-react";

interface TagCloudProps {
  tags: string[];
  onTagClick?: (tag: string) => void;
}

export function TagCloud({ tags, onTagClick }: TagCloudProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Hash className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Tags</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className={onTagClick ? "cursor-pointer hover:bg-primary hover:text-primary-foreground" : ""}
              onClick={() => onTagClick?.(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
