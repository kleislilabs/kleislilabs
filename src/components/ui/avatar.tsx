"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const sizeMap = {
  sm: "size-6",
  md: "size-8",
  lg: "size-12",
  xl: "size-16",
} as const

const textSizeMap = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
} as const

const shapeMap = {
  circle: "rounded-full",
  square: "rounded-md",
} as const

type AvatarProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
  size?: keyof typeof sizeMap
  shape?: keyof typeof shapeMap
  "aria-label"?: string
  name?: string
}

// Create context to share size across components
const AvatarContext = React.createContext<{ 
  size: keyof typeof sizeMap
  shape: keyof typeof shapeMap 
  name?: string
} | null>(null)

// Custom hook to safely access avatar context
function useAvatarContext() {
  const context = React.useContext(AvatarContext)
  if (!context) {
    throw new Error("Avatar components must be used within an Avatar provider")
  }
  return context
}

/**
 * Avatar component with image + fallback support.
 * 
 * Usage:
 * <Avatar size="md" shape="circle" name="John Doe">
 *   <AvatarImage src="/user.jpg" alt="User name" />
 *   <AvatarFallback />
 * </Avatar>
 */
function Avatar({
  className,
  size = "md",
  shape = "circle",
  name,
  children,
  ...props
}: AvatarProps) {
  return (
    <AvatarContext.Provider value={{ size, shape, name }}>
      <AvatarPrimitive.Root
        data-slot="avatar"
        data-testid="avatar-root"
        aria-label={props["aria-label"] || name || "User avatar"}
        className={cn(
          "relative flex shrink-0 overflow-hidden",
          sizeMap[size],
          shapeMap[shape],
          className
        )}
        {...props}
      >
        {children}
      </AvatarPrimitive.Root>
    </AvatarContext.Provider>
  )
}

/**
 * Avatar image component with built-in accessibility and loading state support.
 * @param alt - Alternative text for the image (required for accessibility)
 * @param onLoadingStatusChange - Callback for loading state changes
 */
type AvatarImageProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> & { 
  alt?: string
  onLoadingStatusChange?: (status: "idle" | "loading" | "loaded" | "error") => void
}

function AvatarImage({
  className,
  alt = "User avatar",
  onLoadingStatusChange,
  ...props
}: AvatarImageProps) {
  const context = useAvatarContext()
  
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      data-testid="avatar-image"
      className={cn(
        "aspect-square size-full",
        context.shape === "square" && "rounded-md",
        className
      )}
      alt={alt}
      onLoadingStatusChange={onLoadingStatusChange}
      {...props}
    />
  )
}

/**
 * Avatar fallback component that displays initials when image fails to load.
 * @param name - Full name to extract initials from (e.g., "John Doe" -> "JD")
 */
type AvatarFallbackProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & { 
  name?: string 
}

function AvatarFallback({
  className,
  name,
  children,
  ...props
}: AvatarFallbackProps) {
  const context = useAvatarContext()
  
  // Use name from context if not provided directly
  const effectiveName = name || context.name
  
  const initials = React.useMemo(() => {
    if (effectiveName) {
      const parts = effectiveName
        .trim()
        .split(/\s+/)
        .filter(Boolean)

      if (parts.length === 0) return null
      if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()

      return parts
        .slice(0, 2)
        .map(n => n[0])
        .join("")
        .toUpperCase()
    }
    return null
  }, [effectiveName])

  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      data-testid="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center font-medium",
        textSizeMap[context.size],
        context.shape === "square" ? "rounded-md" : "rounded-full",
        className
      )}
      {...props}
    >
      {children || initials}
    </AvatarPrimitive.Fallback>
  )
}

export { Avatar, AvatarImage, AvatarFallback }
