"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button 
        variant="ghost" 
        size="sm" 
        className={cn("relative h-9 w-[72px]", className)} 
        disabled
        aria-label="Theme toggle loading"
      >
        <div className="flex h-7 w-[68px] items-center rounded-full bg-muted p-1">
          <div className="h-5 w-5 rounded-full bg-background shadow-sm" />
        </div>
      </Button>
    )
  }

  const currentTheme = theme === "system" ? systemTheme : theme
  const isDark = currentTheme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={cn(
        // sizing & layout
        "relative h-9 w-[72px] px-0 hover:bg-transparent",
        // keyboard focus
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* track */}
      <div
        className={cn(
          "flex h-7 w-[68px] items-center rounded-full p-1 transition-colors motion-safe:duration-200",
          isDark ? "bg-zinc-700" : "bg-zinc-200",
        )}
      >
        {/* knob */}
        <div
          className={cn(
            "h-6 w-6 rounded-full shadow-sm motion-safe:transition-transform",
            isDark
              ? "translate-x-[36px] bg-zinc-900"
              : "translate-x-0 bg-white",
          )}
        />

        {/* icons - higher z-index so they remain visible */}
        <Sun
          className={cn(
            "pointer-events-none absolute left-[9px] z-10 h-3.5 w-3.5 transition-opacity",
            isDark ? "opacity-50" : "opacity-100",
          )}
          aria-hidden="true"
        />
        <Moon
          className={cn(
            "pointer-events-none absolute right-[9px] z-10 h-3.5 w-3.5 transition-opacity",
            isDark ? "opacity-100" : "opacity-50",
          )}
          aria-hidden="true"
        />
      </div>
    </Button>
  )
}
