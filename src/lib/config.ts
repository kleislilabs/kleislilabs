/**
 * Configuration file for blog settings
 */

export const blogConfig = {
  title: 'Kleislilabs',
  description: 'Bringing AI into the core of your business',
  author: 'Kleislilabs',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  
  // Pagination settings
  postsPerPage: 10,
  
  // Reading time calculation
  wordsPerMinute: 200,
  
  // Social media
  social: {
    twitter: '@yourusername',
    github: 'https://github.com/yourusername',
    email: 'your.email@example.com',
  },
  
  // Navigation
  navigation: [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  
  // SEO
  defaultImage: '/images/og-default.jpg',
  favicon: '/favicon.ico',
} as const;

export type BlogConfig = typeof blogConfig;
