import Link from "next/link";
import { blogConfig } from "@/lib/config";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Mail, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center md:text-left">
          {/* Company Info */}
          <div className="space-y-4 lg:col-span-2 flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-3">
              <Logo variant="monogram" size="sm" />
              <h3 className="text-xl font-bold">{blogConfig.title}</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md text-center md:text-left">
              {blogConfig.tagline}
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-md text-center md:text-left">
              AI solutions built for real business problems. We help organizations implement 
              practical artificial intelligence that delivers measurable results.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center justify-center md:justify-start space-x-2 pt-2">
              {blogConfig.social.github && (
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0" asChild>
                  <a 
                    href={blogConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {blogConfig.social.twitter && (
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0" asChild>
                  <a 
                    href={`https://twitter.com/${blogConfig.social.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {blogConfig.social.email && (
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0" asChild>
                  <a 
                    href={`mailto:${blogConfig.social.email}`}
                    aria-label="Email"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-3 text-sm flex flex-col items-center md:items-start">
              {blogConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Links */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3 text-sm flex flex-col items-center md:items-start">
              <li>
                <Link 
                  href="/blog" 
                  className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
                >
                  Latest Articles
                </Link>
              </li>
              <li>
                <a 
                  href={`mailto:${blogConfig.social.email}`}
                  className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
                >
                  Get in Touch
                </a>
              </li>
              {blogConfig.social.github && (
                <li>
                  <a 
                    href={blogConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
                  >
                    Open Source
                  </a>
                </li>
              )}
              <li>
                <a 
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
                >
                  Built with Next.js
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center px-4 sm:px-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {blogConfig.title}. All rights reserved.
          </p>
          <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-red-500 fill-current" />
            <span>using Next.js and shadcn/ui</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
