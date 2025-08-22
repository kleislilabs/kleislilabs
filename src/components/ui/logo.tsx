'use client'

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'full' | 'monogram'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const LogoMark = ({ className }: { className?: string }) => (
  <>
    <path d="M -1.2246467991473532e-16 22 
             L 1.2246467991473532e-16 26 
             L 32 26 
             L 32 22 Z" 
          fill="var(--logo-primary)" className={className} />
    <path d="M 32 30 
             L 44 24 
             L 32 18 Z" 
          fill="var(--logo-primary)" className={className} />
    
    <path d="M 17 10.267949192431123 
             L 15 13.732050807568877 
             L 39.248711305964285 27.73205080756888 
             L 41.248711305964285 24.26794919243112 Z" 
          fill="var(--logo-secondary)" className={className} />
    <path d="M 37.248711305964285 31.196152422706632 
             L 50.64101615137755 32 
             L 43.248711305964285 20.803847577293368 Z" 
          fill="var(--logo-secondary)" className={className} />
    
    <path d="M 15 34.267949192431125 
             L 17 37.732050807568875 
             L 41.248711305964285 23.73205080756888 
             L 39.248711305964285 20.26794919243112 Z" 
          fill="var(--logo-secondary)" className={className} />
    <path d="M 43.248711305964285 27.196152422706632 
             L 50.64101615137755 16 
             L 37.248711305964285 16.803847577293368 Z" 
          fill="var(--logo-secondary)" className={className} />
  </>
)

const LogoMonogram = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? resolvedTheme === 'dark' : false

  return (
    <svg viewBox="0 0 64 64" className={cn("h-full w-auto", className)} role="img" aria-label="KleisliLabs logo">
      <rect width="64" height="64" rx="12" 
            fill={isDark ? "var(--logo-bg-dark)" : "var(--logo-bg-light)"} 
            stroke={isDark ? "none" : "var(--logo-border-light)"} 
            strokeWidth={isDark ? "0" : "1"} />
      
      <g transform="translate(8, 8)" opacity="0.95">
        <LogoMark />
      </g>
    </svg>
  )
}

export function Logo({
  variant = 'full',
  size = 'md',
  className,
}: LogoProps) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={cn(
        'flex items-center',
        size === 'sm' ? 'h-8' : size === 'md' ? 'h-12' : 'h-16',
        className
      )} />
    )
  }

  const isDark = resolvedTheme === 'dark'

  const sizeMap = {
    sm: { full: 'h-8', monogram: 'h-8 w-8' },
    md: { full: 'h-12', monogram: 'h-12 w-12' },
    lg: { full: 'h-16', monogram: 'h-16 w-16' }
  } as const

  const containerClasses = cn(
    'flex items-center relative',
    sizeMap[size][variant],
    className,
  )

  if (variant === 'monogram') {
    return <LogoMonogram className={containerClasses} />
  }

  const logoSrc = isDark 
    ? '/logos/kleislilabs-logo-dark.svg' 
    : '/logos/kleislilabs-logo-light.svg'

  return (
    <div className={containerClasses}>
      <Image 
        src={logoSrc}
        alt="KleisliLabs"
        width={280}
        height={60}
        priority
        className="h-full max-h-full w-auto object-contain"
        role="img"
        aria-label="KleisliLabs logo"
      />
    </div>
  )
}

export default Logo