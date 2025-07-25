import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CtaSection } from "@/components/ui/CtaSection";
import { Section } from "@/components/ui/Section";
import { blogConfig } from "@/lib/config";
import { Mail, Github, Twitter, MessageCircle, Users, Lightbulb, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Contact | ${blogConfig.title}`,
  description: `Get in touch with ${blogConfig.title}. We&apos;d love to hear from you!`,
};

export default function ContactPage() {
  return (
    <Layout>
      <Container className="py-6 sm:py-8">
        <PageHeader
          title="Contact"
          description="Get in touch with us. We&apos;d love to hear from you!"
        />
        
        <div className="mt-12 space-y-12">
          {/* Main Contact Section */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Information */}
            <Card className="h-fit">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Let&apos;s Connect</h2>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Whether you have questions about AI implementation, want to discuss a potential project, 
                  or simply want to share your thoughts, we&apos;re always excited to connect.
                </p>
                
                <div className="space-y-6">
                  {blogConfig.social.email && (
                    <div className="flex items-start space-x-4">
                      <div className="p-2 rounded-lg bg-primary/10 mt-1">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">Email</h3>
                        <p className="text-muted-foreground mb-2">Best way to reach us for project inquiries</p>
                        <Button variant="link" className="p-0 h-auto text-base font-medium" asChild>
                          <a href={`mailto:${blogConfig.social.email}`} className="text-primary hover:text-primary/80">
                            {blogConfig.social.email}
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {blogConfig.social.github && (
                    <div className="flex items-start space-x-4">
                      <div className="p-2 rounded-lg bg-primary/10 mt-1">
                        <Github className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">GitHub</h3>
                        <p className="text-muted-foreground mb-2">Explore our open-source projects and contributions</p>
                        <Button variant="link" className="p-0 h-auto text-base font-medium" asChild>
                          <a 
                            href={blogConfig.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80"
                          >
                            View our projects
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {blogConfig.social.twitter && (
                    <div className="flex items-start space-x-4">
                      <div className="p-2 rounded-lg bg-primary/10 mt-1">
                        <Twitter className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">Twitter</h3>
                        <p className="text-muted-foreground mb-2">Follow us for AI insights and industry updates</p>
                        <Button variant="link" className="p-0 h-auto text-base font-medium" asChild>
                          <a 
                            href={`https://twitter.com/${blogConfig.social.twitter.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80"
                          >
                            {blogConfig.social.twitter}
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Collaboration Information */}
            <Card className="h-fit">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 rounded-lg bg-secondary/20">
                    <Users className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold">Collaboration</h2>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Interested in working together? We&apos;re always open to collaborating with talented 
                  professionals and organizations who share our passion for practical AI solutions.
                </p>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-l-primary pl-6">
                    <h3 className="font-semibold text-lg mb-2 flex items-center">
                      <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                      Partnership Opportunities
                    </h3>
                    <p className="text-muted-foreground">
                      Strategic partnerships for larger AI implementation projects and joint ventures.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-l-primary pl-6">
                    <h3 className="font-semibold text-lg mb-2 flex items-center">
                      <MessageCircle className="h-5 w-5 mr-2 text-primary" />
                      Guest Contributions
                    </h3>
                    <p className="text-muted-foreground">
                      Share your expertise by contributing to our blog or speaking at industry events.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-l-primary pl-6">
                    <h3 className="font-semibold text-lg mb-2 flex items-center">
                      <Github className="h-5 w-5 mr-2 text-primary" />
                      Open Source
                    </h3>
                    <p className="text-muted-foreground">
                      Contribute to our open-source projects or suggest new tools and libraries.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Response Time Information */}
          <Section spacing="none">
            <Card className="bg-muted/30 border-dashed">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">Response Time</h3>
                <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  We typically respond to emails within 24-48 hours during business days. 
                  For urgent project inquiries, please mention &quot;URGENT&quot; in your subject line.
                </p>
              </CardContent>
            </Card>
          </Section>

          {/* CTA Section */}
          <CtaSection
            variant="primary"
            size="lg"
            title="Ready to Start a Conversation?"
            description="Whether you&apos;re exploring AI possibilities or ready to implement a solution, we&apos;re here to help guide you through the process."
            actions={
              <>
                <Button size="lg" asChild>
                  <a href={`mailto:${blogConfig.social.email}`}>
                    <Mail className="mr-2 h-5 w-5" />
                    Send us an Email
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">
                    Learn More About Us
                  </Link>
                </Button>
              </>
            }
          />
        </div>
      </Container>
    </Layout>
  );
}
