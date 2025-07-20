import { getAllPostsMetadata } from "@/lib/posts";
import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { PostGrid } from "@/components/blog/PostGrid";
import { generateBlogMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateBlogMetadata();

export default function BlogPage() {
  const posts = getAllPostsMetadata();

  return (
    <Layout>
      <Container className="py-6 sm:py-8">
        <PageHeader
          title="Blog"
          description="Explore our latest articles, tutorials, and insights on web development, programming, and technology."
        />
        
        <div className="mt-6 sm:mt-8">
          <PostGrid posts={posts} />
        </div>

        {posts.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-sm sm:text-base text-muted-foreground">
              No posts available yet. Check back soon for new content!
            </p>
          </div>
        )}
      </Container>
    </Layout>
  );
}
