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

## Architecture Overview

This is a **Next.js 15 static blog** using the App Router pattern with TypeScript and Tailwind CSS.

### Key Architecture Decisions

1. **Static Site Generation (SSG)**: All blog posts are pre-rendered at build time for optimal performance
2. **Markdown-based Content**: Blog posts are stored as `.md` files in the npm `posts/` directory with frontmatter metadata
3. **Component Organization**: 
   - UI components in `src/components/ui/` using Radix UI primitives
   - Blog-specific components in `src/components/blog/`
   - Layout components in `src/components/layout/`

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
- `/` - Homepage
- `/blog` - Blog listing page
- `/blog/[slug]` - Individual blog post pages (dynamically generated from markdown files)
- `/about` - About page
- `/contact` - Contact page

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

### Theme Support

Dark mode is implemented using next-themes with system preference detection and manual toggle capability.