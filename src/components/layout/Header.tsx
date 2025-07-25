"use client";

import Link from "next/link";
import { useState } from "react";
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
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 backdrop-blur-sm flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3" onClick={closeMobileMenu}>
            <Logo variant="monogram" size="sm" />
            <span className="font-bold text-lg sm:text-xl tracking-tight truncate">
              {blogConfig.title}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation - Hidden on small screens */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex items-center space-x-6">
            {blogConfig.navigation.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild>
                  <Link 
                    href={item.href} 
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side actions */}
        <div className="flex items-center space-x-2">
          {/* Desktop Theme Toggle */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden h-9 w-9 p-0"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop with blur */}
          <div className="fixed inset-0 z-40 md:hidden backdrop-blur-sm bg-black/20" onClick={closeMobileMenu} />
          
          {/* Mobile Menu Panel */}
          <div className="fixed inset-0 z-50 md:hidden bg-white/95 dark:bg-gray-900/95">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeMobileMenu}
                aria-label="Close menu"
                className="h-10 w-10 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            {/* Navigation Links */}
            <div className="p-6">
              <nav className="space-y-4">
                {blogConfig.navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="block px-4 py-4 text-lg font-medium text-gray-900 dark:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-lg border border-gray-200/50 dark:border-gray-700/50 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              
              {/* Theme Toggle Section */}
              <div className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-gray-700 dark:text-gray-300">Theme</span>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
