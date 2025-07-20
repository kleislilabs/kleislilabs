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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
      {/* Previous Post */}
      <div className="flex justify-start">
        {previousPost && (
          <Card className="w-full hover:shadow-lg transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <Link href={`/blog/${previousPost.slug}`}>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous Post</span>
                </div>
                <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors text-sm sm:text-base">
                  {previousPost.title}
                </h3>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Next Post */}
      <div className="flex justify-end">
        {nextPost && (
          <Card className="w-full hover:shadow-lg transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <Link href={`/blog/${nextPost.slug}`}>
                <div className="flex items-center justify-end space-x-2 text-sm text-muted-foreground mb-2">
                  <span>Next Post</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
                <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors text-right text-sm sm:text-base">
                  {nextPost.title}
                </h3>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
