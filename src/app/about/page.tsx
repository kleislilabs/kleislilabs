import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogConfig } from "@/lib/config";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Users, Lightbulb, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: `About Us | ${blogConfig.title}`,
  description: "Learn about KleisliLabs - AI solutions built for real business problems. We help businesses implement practical artificial intelligence solutions.",
};

export default function AboutUsPage() {
  return (
    <Layout>
      <Container className="py-6 sm:py-8">
        <PageHeader
          title="About KleisliLabs"
          description="AI Solutions Built for Real Business Problems"
        />
        
        <div className="mt-8 space-y-6 sm:space-y-8">
          {/* Introduction */}
          <Card>
            <CardContent className="p-6">
              <p className="text-lg text-muted-foreground leading-7">
                We are an AI consultancy focused on helping businesses implement practical artificial intelligence solutions. 
                Our team of engineers and data scientists works with companies to turn AI concepts into working applications 
                that solve specific business challenges.
              </p>
            </CardContent>
          </Card>

          {/* The Challenge We Address */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">The Challenge We Address</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-7">
                <p>
                  Many organizations recognize AI&#39;s potential but struggle with implementation. The technology moves rapidly, 
                  skilled AI talent is scarce, and the gap between research breakthroughs and practical applications continues to widen.
                </p>
                <p>
                  Building internal AI capabilities requires significant investment in both talent and time—resources that many 
                  companies prefer to allocate toward their core business activities.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Our Approach */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Our Approach</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-7">
                <p>
                  We work closely with clients to understand their specific needs and develop tailored AI solutions. 
                  Our focus is on creating systems that integrate smoothly with existing workflows and deliver 
                  measurable improvements to business operations.
                </p>
                <p>
                  We adapt our work to meet the regulatory and cultural requirements of different markets, having 
                  experience with clients across various regions including North America, Europe, Australia, and the Middle East.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* What We Offer */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Users className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">What We Offer</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Custom AI Development</h3>
                  <p className="text-muted-foreground">
                    Machine learning models, automation systems, and data analysis tools designed for your specific requirements.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">AI Strategy Consulting</h3>
                  <p className="text-muted-foreground">
                    Guidance on where and how to implement AI within your organization, including feasibility assessments and implementation roadmaps.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">System Integration</h3>
                  <p className="text-muted-foreground">
                    Connecting AI solutions with your existing technology infrastructure and business processes.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Ongoing Support</h3>
                  <p className="text-muted-foreground">
                    Maintenance, optimization, and scaling support to ensure your AI systems continue delivering value.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Our Commitment */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <CheckCircle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Our Commitment</h2>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary" className="mt-1">Technical Excellence</Badge>
                  <p className="text-muted-foreground">
                    We stay current with AI developments and apply proven methodologies to deliver reliable solutions.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary" className="mt-1">Clear Communication</Badge>
                  <p className="text-muted-foreground">
                    Regular updates, transparent timelines, and honest assessments of what&#39;s achievable within your budget and timeframe.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary" className="mt-1">Collaborative Process</Badge>
                  <p className="text-muted-foreground">
                    We work as partners, not just vendors, ensuring knowledge transfer and building your team&#39;s AI capabilities.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary" className="mt-1">Practical Focus</Badge>
                  <p className="text-muted-foreground">
                    Every solution is designed with real-world constraints in mind—your budget, timeline, and operational requirements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps / CTA */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground leading-7 mb-6 max-w-2xl mx-auto">
                If you&#39;re considering AI implementation for your business, we&#39;d be happy to discuss your specific 
                challenges and explore potential solutions together.
              </p>
              <Button size="lg" asChild>
                <Link href="/contact">
                  Get In Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Layout>
  );
}