import Link from "next/link";
import dynamic from "next/dynamic";
import { getAllPostsMetadata } from "@/lib/posts";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CalCta } from "@/components/CalCta";
import { PostCard } from "@/components/blog/PostCard";
import { Logo } from "@/components/ui/logo";
import { Section } from "@/components/ui/Section";
import { blogConfig } from "@/lib/config";
import { ArrowRight, Target, Brain } from "lucide-react";

// Lazy load below-fold components
const Features = dynamic(() => import("@/components/home/Features").then(mod => ({ default: mod.Features })), {
  loading: () => <div className="h-96 animate-pulse bg-muted rounded-lg" />,
  ssr: true
});

const CtaSection = dynamic(() => import("@/components/ui/CtaSection").then(mod => ({ default: mod.CtaSection })), {
  loading: () => <div className="h-64 animate-pulse bg-muted rounded-lg" />,
  ssr: true
});

export default function Home() {
  const posts = getAllPostsMetadata();
  const featuredPosts = posts.slice(0, 3); // Show latest 3 posts

  return (
    <Layout>
      {/* Hero Section */}
      <Section spacing="lg" className="text-center" container={false}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex justify-center mb-6">
              <Logo variant="full" size="lg" />
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-center">
                <span className="text-primary">{blogConfig.tagline}</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed text-center">
                We help businesses implement practical artificial intelligence solutions that solve real problems and drive measurable results.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <CalCta 
                size="lg" 
                className="text-lg px-8 py-3 w-full sm:w-auto"
              >
                <Brain className="mr-2 h-5 w-5" />
                Book a Discovery Call
              </CalCta>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 w-full sm:w-auto" asChild>
                <Link href="/about">
                  <Target className="mr-2 h-5 w-5" />
                  Learn About Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Featured Posts Section - Consider lazy loading if below fold */}
      {featuredPosts.length > 0 && (
        <Section spacing="lg" background="muted" container={false}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Latest Posts
                </h2>
                <p className="text-muted-foreground mt-2 text-lg">
                  Discover our most recent articles and insights
                </p>
              </div>
              <Button variant="outline" size="lg" asChild>
                <Link href="/blog">
                  <span className="hidden sm:inline">View All Posts</span>
                  <span className="sm:hidden">All Posts</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Features Section */}
      <Section spacing="xl" container={false}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Features />
        </div>
      </Section>

      {/* CTA Section */}
      <Section spacing="lg" container={false}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <CtaSection
            variant="primary"
            size="lg"
            title="Ready to Transform Your Business with AI?"
            description="Let's discuss your specific challenges and explore how our AI solutions can drive measurable results for your organization."
            actions={
              <>
                <CalCta size="lg">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </CalCta>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">
                    Learn More About Us
                  </Link>
                </Button>
              </>
            }
          />
        </div>
      </Section>
    </Layout>
  );
}
