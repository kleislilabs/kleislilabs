"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { blogConfig } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/ui/logo";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-200",
          isScrolled
            ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-2 sm:space-x-3 rounded-md px-2 py-1 transition-colors hover:bg-accent/50"
            >
              <Logo variant="monogram" size="sm" />
              <span className="font-bold text-lg sm:text-xl tracking-tight">
                {blogConfig.title}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
            <ul className="flex items-center space-x-8">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-200",
                      "hover:bg-accent hover:text-accent-foreground",
                      "focus:bg-accent focus:text-accent-foreground focus:outline-none",
                      pathname === item.href && "bg-accent/50 text-accent-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right side - CTA and theme toggle */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="default"
              size="sm"
              className="hidden md:inline-flex"
              asChild
            >
              <Link href="/contact">Get AI Audit</Link>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden transition-all duration-250",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="container h-full pt-20">
          <ul className="flex flex-col space-y-6">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block text-2xl font-medium py-3 px-4 rounded-md transition-all duration-200",
                    "hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href && "bg-accent/50 text-accent-foreground"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-6">
              <Button
                variant="default"
                size="lg"
                className="w-full"
                asChild
              >
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Get AI Audit
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}