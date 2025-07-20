import Link from "next/link";
import { blogConfig } from "@/lib/config";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Logo variant="monogram" size="sm" />
              <h3 className="text-lg font-semibold">{blogConfig.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {blogConfig.tagline}
            </p>
            <p className="text-sm text-muted-foreground">
              AI solutions built for real business problems
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {blogConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Connect</h4>
            <ul className="space-y-2 text-sm">
              {blogConfig.social.github && (
                <li>
                  <a 
                    href={blogConfig.social.github} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
              )}
              {blogConfig.social.twitter && (
                <li>
                  <a 
                    href={`https://twitter.com/${blogConfig.social.twitter.replace('@', '')}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                </li>
              )}
              {blogConfig.social.email && (
                <li>
                  <a 
                    href={`mailto:${blogConfig.social.email}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Email
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {blogConfig.title}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with Next.js and shadcn/ui
          </p>
        </div>
      </div>
    </footer>
  );
}
