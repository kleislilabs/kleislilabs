import { notFound } from "next/navigation";
import { getAllPostsMetadata, getPostData, getAdjacentPosts } from "@/lib/posts";
import { generatePostMetadata, generatePostStructuredData } from "@/lib/seo";
import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { PostHeader } from "@/components/blog/PostHeader";
import { PostContentWithEnhancements } from "@/components/blog/PostContent";
import { PostNavigation } from "@/components/blog/PostNavigation";
import { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPostsMetadata();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostData(slug);
    return generatePostMetadata(post);
  } catch {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  let post;
  
  try {
    post = await getPostData(slug);
  } catch {
    notFound();
  }

  const { previousPost, nextPost } = getAdjacentPosts(slug);
  const structuredData = generatePostStructuredData(post);

  return (
    <Layout>
      <Container className="py-6 sm:py-8">
        <article className="max-w-4xl mx-auto">
          <PostHeader post={post} />
          
          <div className="mt-6 sm:mt-8">
            <PostContentWithEnhancements content={post.content} />
          </div>
          
          <PostNavigation 
            previousPost={previousPost} 
            nextPost={nextPost} 
          />
        </article>
      </Container>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </Layout>
  );
}
