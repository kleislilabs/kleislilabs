import Link from "next/link";
import { blogConfig } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { 
  NavigationMenu, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList
} from "@/components/ui/navigation-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="font-bold text-2xl">
            {blogConfig.title}
          </Link>
        </div>

        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList className="flex items-center space-x-6">
            {blogConfig.navigation.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild>
                  <Link href={item.href} className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Theme toggle or actions */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/blog">
              Blog
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
