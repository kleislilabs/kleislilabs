/**
 * Clean navigation component architecture - 3 core components only
 */

import * as React from "react"
import Link from "next/link"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// Navigation contract
export interface NavigationItem {
  title: string;
  href: string;
  description?: string;
  items?: NavigationItem[];
  external?: boolean;
}

interface NavigationMenuProps {
  items: NavigationItem[];
  className?: string;
}

/**
 * Main navigation menu component
 * Handles the overall navigation structure
 */
export function NavigationMenu({ items, className }: NavigationMenuProps) {
  return (
    <nav 
      className={cn(
        "relative flex max-w-max flex-1 items-center justify-center",
        className
      )}
    >
      <ul className="group flex flex-1 list-none items-center justify-center gap-1">
        {items.map((item) => (
          <NavigationMenuItem key={item.href} item={item} />
        ))}
      </ul>
    </nav>
  );
}

/**
 * Navigation menu item component
 * Handles individual navigation items with optional dropdown
 */
export function NavigationMenuItem({ item }: { item: NavigationItem }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const hasDropdown = item.items && item.items.length > 0;
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!hasDropdown) {
    return (
      <li>
        <Link 
          href={item.href}
          className={cn(
            "inline-flex h-9 w-max items-center justify-center rounded-md",
            "bg-background px-4 py-2 text-sm font-medium transition-colors",
            "hover:bg-accent hover:text-accent-foreground",
            "focus:bg-accent focus:text-accent-foreground focus:outline-none",
            "disabled:pointer-events-none disabled:opacity-50"
          )}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
        >
          {item.title}
        </Link>
      </li>
    );
  }

  return (
    <li 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={cn(
          "inline-flex h-9 w-max items-center justify-center rounded-md",
          "bg-background px-4 py-2 text-sm font-medium transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          "focus:bg-accent focus:text-accent-foreground focus:outline-none",
          "disabled:pointer-events-none disabled:opacity-50",
          isOpen && "bg-accent/50 text-accent-foreground"
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.title}
        <ChevronDownIcon
          className={cn(
            "relative top-[1px] ml-1 h-3 w-3 transition duration-300",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
      
      {isOpen && item.items && (
        <NavigationMenuContent items={item.items} />
      )}
    </li>
  );
}

/**
 * Navigation menu content component
 * Handles dropdown content display
 */
export function NavigationMenuContent({ items }: { items: NavigationItem[] }) {
  return (
    <div className={cn(
      "absolute left-0 top-full mt-1.5 w-48",
      "animate-in fade-in-0 zoom-in-95",
      "rounded-md border bg-popover p-1 text-popover-foreground shadow-lg"
    )}>
      <ul className="grid gap-0.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "block select-none rounded-sm px-3 py-2 text-sm leading-none no-underline outline-none transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:bg-accent focus:text-accent-foreground"
              )}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
            >
              <div className="text-sm font-medium leading-none">{item.title}</div>
              {item.description && (
                <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
                  {item.description}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

