import Link from "next/link";
import { PostMetadata } from "@/types/post";
import { formatDate } from "@/lib/date";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, Calendar } from "lucide-react";

interface PostCardProps {
  post: PostMetadata;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full group">
      <Card className="h-full transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 cursor-pointer border-border/50 group-hover:border-primary/20">
        <CardHeader className="space-y-4 p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10 flex-shrink-0 ring-2 ring-background group-hover:ring-primary/20 transition-all">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {post.author ? post.author.charAt(0).toUpperCase() : "B"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                {post.author || "Blog Author"}
              </p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{formatDate(post.date)}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <CardTitle className="line-clamp-2 hover:text-primary transition-colors duration-200 text-lg sm:text-xl leading-tight">
              {post.title}
            </CardTitle>
            <CardDescription className="line-clamp-3 text-sm leading-relaxed">
              {post.excerpt}
            </CardDescription>
          </div>
        </CardHeader>
      
        <CardContent className="space-y-4 p-6 pt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-3 w-3 flex-shrink-0" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="text-xs hover:bg-primary/10 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
