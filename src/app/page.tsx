import Link from "next/link";
import { getAllPostsMetadata } from "@/lib/posts";
import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/blog/PostCard";
import { Logo } from "@/components/ui/logo";
import { blogConfig } from "@/lib/config";
import { ArrowRight, BookOpen, Bot, Lightbulb, Target } from "lucide-react";

export default function Home() {
  const posts = getAllPostsMetadata();
  const featuredPosts = posts.slice(0, 3); // Show latest 3 posts

  return (
    <Layout>
      <Container>
        {/* Hero Section */}
        <section className="py-12 sm:py-16 md:py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <div className="flex justify-center mb-4 sm:mb-6">
              <Logo variant="full" size="lg" showTagline={false} />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight px-4">
              <span className="text-primary">{blogConfig.tagline}</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              We help businesses implement practical artificial intelligence solutions that solve real problems and drive measurable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button size="lg" asChild>
                <Link href="/about">
                  <Target className="mr-2 h-4 w-4" />
                  Learn About Us
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/blog">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Read Our Blog
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <section className="py-12 sm:py-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Latest Posts
                </h2>
                <p className="text-muted-foreground mt-2">
                  Discover our most recent articles and insights
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/blog">
                  <span className="hidden sm:inline">View All Posts</span>
                  <span className="sm:hidden">All Posts</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="py-16 border-t">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our AI Solutions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We specialize in building practical AI applications that integrate seamlessly with your existing business processes.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Custom AI Development</h3>
              <p className="text-muted-foreground">
                Machine learning models, automation systems, and data analysis tools designed for your specific requirements.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">AI Strategy Consulting</h3>
              <p className="text-muted-foreground">
                Strategic guidance on where and how to implement AI within your organization, including feasibility assessments.
              </p>
            </div>
            
            <div className="text-center space-y-4 sm:col-span-2 lg:col-span-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Integration & Support</h3>
              <p className="text-muted-foreground">
                Seamless integration with existing systems and ongoing support to ensure your AI solutions continue delivering value.
              </p>
            </div>
          </div>
        </section>
      </Container>
    </Layout>
  );
}
