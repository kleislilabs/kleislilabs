import Link from "next/link";
import { getAllPostsMetadata } from "@/lib/posts";
import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/blog/PostCard";
import { blogConfig } from "@/lib/config";
import { ArrowRight, BookOpen } from "lucide-react";

export default function Home() {
  const posts = getAllPostsMetadata();
  const featuredPosts = posts.slice(0, 3); // Show latest 3 posts

  return (
    <Layout>
      <Container>
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Welcome to{" "}
              <span className="text-primary">{blogConfig.title}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {blogConfig.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/blog">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Explore Blog
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <section className="py-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  Latest Posts
                </h2>
                <p className="text-muted-foreground mt-2">
                  Discover our most recent articles and insights
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/blog">
                  View All Posts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="py-16 border-t">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Quality Content</h3>
              <p className="text-muted-foreground">
                Well-researched articles covering web development, programming, and technology trends.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                <ArrowRight className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Easy to Follow</h3>
              <p className="text-muted-foreground">
                Step-by-step guides and tutorials that are beginner-friendly yet comprehensive.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Regular Updates</h3>
              <p className="text-muted-foreground">
                Fresh content published regularly to keep you updated with the latest developments.
              </p>
            </div>
          </div>
        </section>
      </Container>
    </Layout>
  );
}
