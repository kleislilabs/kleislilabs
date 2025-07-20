import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { blogConfig } from "@/lib/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `About | ${blogConfig.title}`,
  description: `Learn more about ${blogConfig.title} and our mission to share knowledge about web development and technology.`,
};

export default function AboutPage() {
  return (
    <Layout>
      <Container className="py-6 sm:py-8">
        <PageHeader
          title="About"
          description="Learn more about our blog and our mission to share knowledge about web development and technology."
        />
        
        <div className="mt-8 space-y-6 sm:space-y-8">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-6 sm:leading-7">
                We&apos;re passionate about sharing knowledge and helping developers grow their skills. 
                Our blog focuses on practical tutorials, best practices, and insights from the world 
                of web development, programming, and technology.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">What We Cover</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-6 sm:leading-7 mb-4">
                Our content spans across various topics in modern web development:
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs sm:text-sm">Next.js</Badge>
                <Badge variant="secondary" className="text-xs sm:text-sm">React</Badge>
                <Badge variant="secondary" className="text-xs sm:text-sm">TypeScript</Badge>
                <Badge variant="secondary" className="text-xs sm:text-sm">Node.js</Badge>
                <Badge variant="secondary" className="text-xs sm:text-sm">Web APIs</Badge>
                <Badge variant="secondary" className="text-xs sm:text-sm">Database Design</Badge>
                <Badge variant="secondary" className="text-xs sm:text-sm">DevOps</Badge>
                <Badge variant="secondary" className="text-xs sm:text-sm">UI/UX</Badge>
                <Badge variant="secondary" className="text-xs sm:text-sm">Performance</Badge>
                <Badge variant="secondary" className="text-xs sm:text-sm">Security</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Why Choose Our Blog?</h2>
              <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1 flex-shrink-0">•</span>
                  <span>Practical, real-world examples and tutorials</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1 flex-shrink-0">•</span>
                  <span>Step-by-step guides for beginners and advanced developers</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1 flex-shrink-0">•</span>
                  <span>Code examples and live demos</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1 flex-shrink-0">•</span>
                  <span>Regular updates with the latest technologies</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1 flex-shrink-0">•</span>
                  <span>Community-driven content and discussions</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Get In Touch</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-6 sm:leading-7">
                Have questions, suggestions, or want to contribute? We&apos;d love to hear from you! 
                Feel free to reach out through our social media channels or contact us directly.
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Layout>
  );
}
