/**
 * Configuration file for blog settings
 */

export const blogConfig = {
  title: 'KleisliLabs',
  description: 'Igniting Early-Stage AI Ventures - Technical firepower for ambitious AI founders',
  author: 'KleisliLabs Team',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  tagline: 'Igniting Early-Stage AI Ventures',
  
  // Pagination settings
  postsPerPage: 10,
  
  // Reading time calculation
  wordsPerMinute: 200,
  
  // Social media
  social: {
    twitter: '@kleislilabs',
    github: 'https://github.com/kleislilabs',
    email: 'hello@kleislilabs.com',
  },
  
  // Navigation
  navigation: [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  
  // SEO
  defaultImage: '/logo-512.png',
} as const;

export type BlogConfig = typeof blogConfig;
