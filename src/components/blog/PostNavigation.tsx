import Link from "next/link";
import { PostMetadata } from "@/types/post";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PostNavigationProps {
  previousPost?: PostMetadata | null;
  nextPost?: PostMetadata | null;
}

export function PostNavigation({ previousPost, nextPost }: PostNavigationProps) {
  return (
    <nav className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12" aria-label="Post navigation">
      {/* Previous Post */}
      <div className="flex justify-start">
        {previousPost && (
          <Card className="w-full hover:shadow-xl hover:scale-105 transition-all duration-300 group border-border/50 hover:border-primary/20">
            <CardContent className="p-6">
              <Link href={`/blog/${previousPost.slug}`} className="block">
                <div className="flex items-center space-x-3 text-sm text-muted-foreground mb-3 group-hover:text-primary transition-colors">
                  <ChevronLeft className="h-5 w-5" />
                  <span className="font-medium">Previous Post</span>
                </div>
                <h3 className="font-bold line-clamp-2 group-hover:text-primary transition-colors text-base sm:text-lg leading-tight">
                  {previousPost.title}
                </h3>
                {previousPost.excerpt && (
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {previousPost.excerpt}
                  </p>
                )}
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Next Post */}
      <div className="flex justify-end">
        {nextPost && (
          <Card className="w-full hover:shadow-xl hover:scale-105 transition-all duration-300 group border-border/50 hover:border-primary/20">
            <CardContent className="p-6">
              <Link href={`/blog/${nextPost.slug}`} className="block">
                <div className="flex items-center justify-end space-x-3 text-sm text-muted-foreground mb-3 group-hover:text-primary transition-colors">
                  <span className="font-medium">Next Post</span>
                  <ChevronRight className="h-5 w-5" />
                </div>
                <h3 className="font-bold line-clamp-2 group-hover:text-primary transition-colors text-right text-base sm:text-lg leading-tight">
                  {nextPost.title}
                </h3>
                {nextPost.excerpt && (
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2 text-right">
                    {nextPost.excerpt}
                  </p>
                )}
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </nav>
  );
}
