import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { blogConfig } from "@/lib/config";
import { Mail, Github, Twitter } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Contact | ${blogConfig.title}`,
  description: `Get in touch with ${blogConfig.title}. We'd love to hear from you!`,
};

export default function ContactPage() {
  return (
    <Layout>
      <Container className="py-6 sm:py-8">
        <PageHeader
          title="Contact"
          description="Get in touch with us. We&apos;d love to hear from you!"
        />
        
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Let&apos;s Connect</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-6 sm:leading-7 mb-6">
                Whether you have questions, feedback, or collaboration ideas, 
                we&apos;re always excited to connect with fellow developers and readers.
              </p>
              
              <div className="space-y-4">
                {blogConfig.social.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-sm sm:text-base">Email</p>
                      <Button variant="link" className="p-0 h-auto text-sm sm:text-base" asChild>
                        <a href={`mailto:${blogConfig.social.email}`} className="break-all">
                          {blogConfig.social.email}
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
                
                {blogConfig.social.github && (
                  <div className="flex items-center space-x-3">
                    <Github className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-sm sm:text-base">GitHub</p>
                      <Button variant="link" className="p-0 h-auto text-sm sm:text-base" asChild>
                        <a 
                          href={blogConfig.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View our projects
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
                
                {blogConfig.social.twitter && (
                  <div className="flex items-center space-x-3">
                    <Twitter className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-sm sm:text-base">Twitter</p>
                      <Button variant="link" className="p-0 h-auto text-sm sm:text-base" asChild>
                        <a 
                          href={`https://twitter.com/${blogConfig.social.twitter.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
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

          <Card>
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Collaboration</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-6 sm:leading-7 mb-6">
                Interested in contributing to our blog or collaborating on a project? 
                We&apos;re always open to working with talented developers and writers.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2 text-sm sm:text-base">Guest Writing</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Share your expertise by writing guest posts for our blog.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2 text-sm sm:text-base">Code Reviews</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Help us improve our code examples and tutorials.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2 text-sm sm:text-base">Topic Suggestions</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Have ideas for topics you&apos;d like us to cover? Let us know!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Layout>
  );
}
