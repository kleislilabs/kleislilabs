import { PostData } from "@/types/post";
import { formatDate } from "@/lib/date";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, User } from "lucide-react";

interface PostHeaderProps {
  post: PostData;
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          {post.frontmatter.title}
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground">
          {post.frontmatter.excerpt}
        </p>
      </div>

      {/* Meta information */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 sm:gap-6">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback>
              {post.frontmatter.author 
                ? post.frontmatter.author.charAt(0).toUpperCase() 
                : "B"
              }
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {post.frontmatter.author || "Blog Author"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(post.frontmatter.date)}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{post.readingTime} min read</span>
        </div>
      </div>

      {/* Tags */}
      {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.frontmatter.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <Separator />
    </div>
  );
}
