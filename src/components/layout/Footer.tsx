import Link from "next/link";
import { blogConfig } from "@/lib/config";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Blog Info */}
          <div className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold">{blogConfig.title}</h3>
            <p className="text-sm text-muted-foreground">
              {blogConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
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
          <div className="space-y-3 sm:space-y-4">
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
                    className="text-muted-foreground hover:text-foreground transition-colors break-all"
                  >
                    Email
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <Separator className="my-4 sm:my-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} {blogConfig.title}. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Built with Next.js and shadcn/ui
          </p>
        </div>
      </div>
    </footer>
  );
}
