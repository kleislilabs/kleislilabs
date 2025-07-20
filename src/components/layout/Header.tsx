import Link from "next/link";
import { blogConfig } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/ui/logo";
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
          <Link href="/" className="flex items-center space-x-3">
            <Logo variant="monogram" size="sm" />
            <span className="font-bold text-xl tracking-tight">
              {blogConfig.title}
            </span>
          </Link>
        </div>

        {/* Navigation - Hidden on small screens */}
        <NavigationMenu className="hidden md:flex">
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

        {/* Theme toggle and actions */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
            <Link href="/blog">
              Blog
            </Link>
          </Button>
          {/* Mobile blog button */}
          <Button variant="ghost" size="sm" className="sm:hidden text-xs px-2" asChild>
            <Link href="/blog">
              Blog
            </Link>
          </Button>
        </div>
      </div>
    </header>


);
}
