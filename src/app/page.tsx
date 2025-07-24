import Link from "next/link";
import { getAllPostsMetadata } from "@/lib/posts";
import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/blog/PostCard";
import { Logo } from "@/components/ui/logo";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ArrowRight, Target, Mail } from "lucide-react";

export default function Home() {
  const posts = getAllPostsMetadata();
  const featuredPosts = posts.slice(0, 3); // Show latest 3 posts

  return (
    <Layout>
      <Container>
        {/* Hero Section */}
        <section className="py-12 sm:py-16 md:py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fade-up">
            <div className="flex justify-center mb-4 sm:mb-6">
              <Logo variant="full" size="lg" showTagline={false} />
            </div>
            <h1 className="text-hero px-4">
              <span className="text-primary">Igniting Early-Stage AI Ventures</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              From concept to Series A: Technical firepower for ambitious AI founders
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button size="lg" asChild>
                <Link href="/contact">
                  <Target className="mr-2 h-4 w-4" />
                  Get Started
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  View Services
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

        {/* Services Section */}
        <section className="py-16 border-t">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive AI solutions designed specifically for early-stage startups and ambitious founders.
            </p>
          </div>
          <ServicesGrid />
        </section>

        {/* Contact Section */}
        <section className="py-16 border-t">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Start Your AI Journey</h2>
            <p className="text-muted-foreground mb-8">
              Ready to transform your startup with AI? Let&apos;s discuss how we can accelerate your path to Series A.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Get in Touch
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  Free AI Audit
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </Layout>
  );
}
