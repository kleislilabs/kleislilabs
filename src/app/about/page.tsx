import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CtaSection } from "@/components/ui/CtaSection";
import { Section } from "@/components/ui/Section";
import { IconCard } from "@/components/ui/IconCard";
import { Button } from "@/components/ui/button";
import { blogConfig } from "@/lib/config";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Users, Lightbulb, CheckCircle, Handshake, Zap, Shield, Cpu } from "lucide-react";

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
        
        <div className="mt-12 space-y-16">
          {/* Introduction */}
          <Section spacing="none">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8 sm:p-12 text-center">
                <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                  We are an AI consultancy focused on helping businesses implement practical artificial intelligence solutions. 
                  Our team of engineers and data scientists works with companies to turn AI concepts into working applications 
                  that solve specific business challenges.
                </p>
              </CardContent>
            </Card>
          </Section>

          {/* The Challenge We Address */}
          <Section spacing="none">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-8 sm:p-12">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold">The Challenge We Address</h2>
                </div>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Many organizations recognize AI&apos;s potential but struggle with implementation. The technology moves rapidly, 
                    skilled AI talent is scarce, and the gap between research breakthroughs and practical applications continues to widen.
                  </p>
                  <p>
                    Building internal AI capabilities requires significant investment in both talent and time—resources that many 
                    companies prefer to allocate toward their core business activities.
                  </p>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Our Approach */}
          <Section spacing="none">
            <Card className="border-l-4 border-l-secondary">
              <CardContent className="p-8 sm:p-12">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 rounded-lg bg-secondary/20">
                    <Lightbulb className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold">Our Approach</h2>
                </div>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
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
          </Section>

          {/* What We Offer */}
          <Section spacing="none">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold">What We Offer</h2>
              </div>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              <IconCard
                icon={Cpu}
                title="Custom AI Development"
                description="Machine learning models, automation systems, and data analysis tools designed for your specific requirements."
              />
              <IconCard
                icon={Lightbulb}
                title="AI Strategy Consulting"
                description="Guidance on where and how to implement AI within your organization, including feasibility assessments and implementation roadmaps."
              />
              <IconCard
                icon={Zap}
                title="System Integration"
                description="Connecting AI solutions with your existing technology infrastructure and business processes."
              />
              <IconCard
                icon={Shield}
                title="Ongoing Support"
                description="Maintenance, optimization, and scaling support to ensure your AI systems continue delivering value."
              />
            </div>
          </Section>

          {/* Our Commitment */}
          <Section spacing="none">
            <Card className="bg-muted/30">
              <CardContent className="p-8 sm:p-12">
                <div className="flex items-center justify-center space-x-4 mb-8">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-center">Our Commitment</h2>
                </div>
                
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="flex items-start space-x-4">
                    <Badge variant="secondary" className="mt-1 flex-shrink-0 px-3 py-1">
                      Technical Excellence
                    </Badge>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      We stay current with AI developments and apply proven methodologies to deliver reliable solutions.
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Badge variant="secondary" className="mt-1 flex-shrink-0 px-3 py-1">
                      Clear Communication
                    </Badge>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Regular updates, transparent timelines, and honest assessments of what&apos;s achievable within your budget and timeframe.
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Badge variant="secondary" className="mt-1 flex-shrink-0 px-3 py-1">
                      Collaborative Process
                    </Badge>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      We work as partners, not just vendors, ensuring knowledge transfer and building your team&apos;s AI capabilities.
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Badge variant="secondary" className="mt-1 flex-shrink-0 px-3 py-1">
                      Practical Focus
                    </Badge>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Every solution is designed with real-world constraints in mind—your budget, timeline, and operational requirements.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* CTA Section */}
          <CtaSection
            variant="primary"
            size="lg"
            title="Ready to Get Started?"
            description="If you're considering AI implementation for your business, we'd be happy to discuss your specific challenges and explore potential solutions together."
            actions={
              <Button size="lg" asChild>
                <Link href="/contact">
                  <Handshake className="mr-2 h-5 w-5" />
                  Get In Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            }
          />
        </div>
      </Container>
    </Layout>
  );
}