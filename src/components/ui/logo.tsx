'use client'

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'

const inter = Inter({ 
  subsets: ['latin'], 
  weight: ['300', '400'] 
})

interface LogoProps {
  variant?: 'full' | 'monogram'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showTagline?: boolean
}

const LogoMark = ({ isDark }: { isDark: boolean }) => (
  <>
    <path d="M -1.2246467991473532e-16 22 
             L 1.2246467991473532e-16 26 
             L 32 26 
             L 32 22 Z" 
          fill={isDark ? "#60a5fa" : "#1e3a8a"} />
    <path d="M 32 30 
             L 44 24 
             L 32 18 Z" 
          fill={isDark ? "#60a5fa" : "#1e3a8a"} />
    
    <path d="M 17 10.267949192431123 
             L 15 13.732050807568877 
             L 39.248711305964285 27.73205080756888 
             L 41.248711305964285 24.26794919243112 Z" 
          fill={isDark ? "#2dd4bf" : "#0f766e"} />
    <path d="M 37.248711305964285 31.196152422706632 
             L 50.64101615137755 32 
             L 43.248711305964285 20.803847577293368 Z" 
          fill={isDark ? "#2dd4bf" : "#0f766e"} />
    
    <path d="M 15 34.267949192431125 
             L 17 37.732050807568875 
             L 41.248711305964285 23.73205080756888 
             L 39.248711305964285 20.26794919243112 Z" 
          fill={isDark ? "#2dd4bf" : "#0f766e"} />
    <path d="M 43.248711305964285 27.196152422706632 
             L 50.64101615137755 16 
             L 37.248711305964285 16.803847577293368 Z" 
          fill={isDark ? "#2dd4bf" : "#0f766e"} />
  </>
)

const LogoFull = ({ isDark, showTagline = false }: { isDark: boolean; showTagline?: boolean }) => (
  <svg viewBox="0 0 280 60" className="h-full w-auto" role="img" aria-label="KleisliLabs logo">
    {/* Logo Mark - Scaled down to 80% around center, raised slightly for better midline alignment */}
    <g transform="translate(30, 28) scale(0.618) translate(-30, -28)">
      <g transform="translate(6, 6)">
        <LogoMark isDark={isDark} />
      </g>
    </g>
    
    {/* Company Name - Moved closer to logo */}
    <text x="52" y="33" 
          className={inter.className}
          fontSize="33" 
          fontWeight="300" 
          fill={isDark ? "#f8fafc" : "#1e3a8a"}
          letterSpacing="-0.5"
          dominantBaseline="middle">KleisliLabs</text>
    
    {/* Tagline */}
    {showTagline && (
      <text x="52" dy="20" y="33"
            className={inter.className}
            fontSize="12" 
            fontWeight="400" 
            fill={isDark ? "#cbd5e1" : "#64748b"}
            opacity={isDark ? "0.9" : "1"}>From Vision to AI Reality</text>
    )}
  </svg>
)

const LogoMonogram = ({ isDark }: { isDark: boolean }) => (
  <svg viewBox="0 0 64 64" className="h-full w-auto" role="img" aria-label="KleisliLabs logo">
    <rect width="64" height="64" rx="12" fill={isDark ? "#1e3a8a" : "#f8fafc"} 
          stroke={isDark ? "none" : "#e2e8f0"} strokeWidth={isDark ? "0" : "1"} />
    
    <g transform="translate(8, 8)" opacity="0.95">
      <LogoMark isDark={isDark === false} />
    </g>
  </svg>
)

export function Logo({
  variant = 'full',
  size = 'md',
  className,
  showTagline = false,
}: LogoProps) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === 'dark'

  const sizeClasses = {
    sm: variant === 'full' ? 'h-8' : 'h-8 w-8',
    md: variant === 'full' ? 'h-12' : 'h-12 w-12',
    lg: variant === 'full' ? 'h-16' : 'h-16 w-16'
  }

  const containerClasses = cn(
    'flex items-center',
    sizeClasses[size],
    className,
  )

  if (variant === 'monogram') {
    return (
      <div className={containerClasses}>
        <LogoMonogram isDark={isDark} />
      </div>
    )
  }

  return (
    <div className={containerClasses}>
      <LogoFull isDark={isDark} showTagline={showTagline} />
    </div>
  )
}

export default Logo