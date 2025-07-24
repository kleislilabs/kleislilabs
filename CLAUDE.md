# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Run Development Server
```bash
npm run dev
```
Starts the Next.js development server with Turbopack at http://localhost:3000

### Build for Production
```bash
npm run build
```
Creates an optimized production build with static site generation

### Start Production Server
```bash
npm start
```
Runs the built application in production mode

### Lint Code
```bash
npm run lint
```
Runs Next.js ESLint configuration to check code quality

### Type Check
```bash
npx tsc --noEmit
```
Runs TypeScript compiler to check for type errors without emitting files

## Architecture Overview

This is a **Next.js 15 AI consulting website** for Kleisli Labs, using the App Router pattern with TypeScript and Tailwind CSS.

### Brand & Design System

**Colors (CSS Variables in globals.css)**:
- Primary: Navy Blue (#102A43)
- Accent: Flame Orange (#FF6F61)  
- Highlight: Teal (#0EDDAA)
- Background: Light Gray (#F7FAFC)
- Foreground: Dark Gray (#1C1C1E)

**Typography**: Inter font with modular scale (H1: 48px hero, H2: 36px, H3: 28px, Body: 16px)

**Animations**: Fade-up animations on scroll, smooth scroll behavior, 200ms transitions

### Key Architecture Decisions

1. **Static Site Generation (SSG)**: All pages pre-rendered at build time for optimal performance
2. **AI Startup Focus**: Homepage and messaging tailored for early-stage AI ventures
3. **Component Organization**: 
   - UI components in `src/components/ui/` using Radix UI primitives
   - Blog-specific components in `src/components/blog/`
   - Layout components in `src/components/layout/`
   - Section components in `src/components/sections/`

### Core Systems

#### Blog Post System (`src/lib/posts.ts`)
- Reads markdown files from `posts/` directory
- Parses frontmatter (title, date, excerpt, tags, author, image, published)
- Converts markdown to HTML using remark with GitHub Flavored Markdown
- Provides functions for:
  - `getPostData()`: Full post content with HTML
  - `getAllPostsMetadata()`: List of posts for index pages
  - `getPostsWithPagination()`: Paginated post lists
  - `getPostsByTag()`: Filter posts by tag
  - `searchPosts()`: Search functionality

#### Routing Structure
- `/` - Homepage (Hero, Services Grid, Contact CTA)
- `/services` - Services page (5 core AI services)
- `/blog` - Blog listing page
- `/blog/[slug]` - Individual blog post pages (dynamically generated from markdown files)
- `/about` - About page
- `/contact` - Contact page

#### Core Services (displayed on homepage and services page)
1. **AI QuickStart** - Rapid prototyping (2-4 weeks) for MVPs
2. **Prompt Foundry** - Design optimized prompt architectures
3. **Data Engine** - Pipeline creation + synthetic data
4. **Model Clinic** - Fine-tuning & optimization
5. **Investor Pack** - Technical documentation for fundraising

#### Path Aliases
- `@/*` maps to `./src/*` for cleaner imports

### Adding New Blog Posts

Create a new `.md` file in the `posts/` directory with required frontmatter:

```markdown
---
title: "Post Title"
date: "YYYY-MM-DD"
excerpt: "Brief description"
tags: ["tag1", "tag2"]
author: "Author Name" # optional
image: "/image-url.jpg" # optional
published: true # optional, defaults to true
---

Post content in markdown...
```

The blog system will automatically:
- Generate a URL slug from the filename
- Calculate reading time
- Create static pages at build time
- Update the blog index and tag pages

### UI Component System

Uses Radix UI primitives wrapped with custom styling via Tailwind CSS and class-variance-authority. Components follow a consistent pattern with TypeScript interfaces and forwardRef for proper ref forwarding.

#### Key Components
- **StickyHeader**: Navigation with mobile hamburger menu, services link, and "Get AI Audit" CTA
- **ServiceCard**: Displays service with icon (48px, teal accent), title, and description
- **ServicesGrid**: Responsive grid layout (3 cols desktop, 1 mobile) for service cards
- **Button**: Multiple variants with 44px min touch target, rounded corners (8px)
- **Card**: Updated with hover transitions and new color scheme

### Theme Support

Dark mode is implemented using next-themes with system preference detection and manual toggle capability. The dark theme uses inverted color scheme with orange as primary.

### Mobile Responsiveness

- All touch targets meet 44px minimum height requirement
- Hamburger menu for mobile navigation with full-screen overlay
- Service cards stack vertically on mobile devices
- Responsive typography that scales appropriately
- Tested on common viewports (360px, 390px, 414px)

### Animation System

- Smooth scroll behavior enabled globally
- Fade-up animations available via `.animate-fade-up` class
- Intersection Observer hook (`useScrollAnimation`) for scroll-triggered animations
- All transitions use 200ms duration for consistency