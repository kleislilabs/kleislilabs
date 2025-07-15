'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'full' | 'monogram'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showTagline?: boolean
}

const LogoFull = ({ isDark, showTagline = false }: { isDark: boolean; showTagline?: boolean }) => (
  <svg width="280" height="60" viewBox="0 0 280 60" className="h-full w-auto">
    <defs>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400&display=swap');`}
      </style>
    </defs>
    
    {/* Logo Mark */}
    <g transform="translate(6, 6)">
      <g id="logo-mark">
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
      </g>
    </g>
    
    {/* Company Name */}
    <text x="70" y="32" 
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
          fontSize="28" 
          fontWeight="300" 
          fill={isDark ? "#f8fafc" : "#1e3a8a"}
          letterSpacing="-0.5">KleisliLabs</text>
    
    {/* Tagline */}
    {showTagline && (
      <text x="70" y="48" 
            fontFamily="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
            fontSize="12" 
            fontWeight="400" 
            fill={isDark ? "#cbd5e1" : "#64748b"}
            opacity={isDark ? "0.9" : "1"}>From Vision to AI Reality</text>
    )}
  </svg>
)

const LogoMonogram = ({ isDark }: { isDark: boolean }) => (
  <svg width="64" height="64" viewBox="0 0 64 64" className="h-full w-auto">
    <rect width="64" height="64" rx="12" fill={isDark ? "#1e3a8a" : "#f8fafc"} 
          stroke={isDark ? "none" : "#e2e8f0"} strokeWidth={isDark ? "0" : "1"} />
    
    <g transform="translate(8, 8)" opacity="0.95">
      <g id="logo-mark">
        <path d="M -1.2246467991473532e-16 22 
                 L 1.2246467991473532e-16 26 
                 L 32 26 
                 L 32 22 Z" 
              fill={isDark ? "#f8fafc" : "#1e3a8a"} />
        <path d="M 32 30 
                 L 44 24 
                 L 32 18 Z" 
              fill={isDark ? "#f8fafc" : "#1e3a8a"} />
        
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
      </g>
    </g>
  </svg>
)

export function Logo({ variant = 'full', size = 'md', className, showTagline = false }: LogoProps) {
  const { theme, systemTheme } = useTheme()
  
  // Determine if we should use dark mode
  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark')
  
  const sizeClasses = {
    sm: variant === 'full' ? 'h-8' : 'h-8 w-8',
    md: variant === 'full' ? 'h-12' : 'h-12 w-12',
    lg: variant === 'full' ? 'h-16' : 'h-16 w-16'
  }
  
  return (
    <div className={cn(
      'flex items-center',
      sizeClasses[size],
      className
    )}>
      {variant === 'full' ? (
        <LogoFull isDark={isDark} showTagline={showTagline} />
      ) : (
        <LogoMonogram isDark={isDark} />
      )}
    </div>
  )
}

export default Logo