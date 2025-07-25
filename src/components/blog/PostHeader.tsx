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
    <header className="space-y-8">
      {/* Title and Excerpt */}
      <div className="space-y-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
          {post.frontmatter.title}
        </h1>
        {post.frontmatter.excerpt && (
          <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            {post.frontmatter.excerpt}
          </p>
        )}
      </div>

      {/* Meta information */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-6 sm:gap-8 text-center">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12 ring-2 ring-background shadow-md">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
              {post.frontmatter.author 
                ? post.frontmatter.author.charAt(0).toUpperCase() 
                : "B"
              }
            </AvatarFallback>
          </Avatar>
          <div className="text-left">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">
                {post.frontmatter.author || "Blog Author"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span className="font-medium">{formatDate(post.frontmatter.date)}</span>
        </div>

        <div className="flex items-center space-x-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span className="font-medium">{post.readingTime} min read</span>
        </div>
      </div>

      {/* Tags */}
      {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {post.frontmatter.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="text-sm px-3 py-1 hover:bg-primary/10 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <div className="pt-4">
        <Separator />
      </div>
    </header>
  );
}
