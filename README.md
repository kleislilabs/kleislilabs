# Next.js Static Blog (** visit :: kleislilabs.com **)

A modern, performant static blog built with Next.js 15, TypeScript, and Markdown. This project provides a complete blogging solution with static generation for optimal performance.

## Features

- 🚀 **Next.js 15** with App Router
- 📝 **Markdown Support** for blog posts
- 🎨 **Tailwind CSS** for styling
- 🔒 **TypeScript** for type safety
- 📱 **Responsive Design**
- ⚡ **Static Site Generation** for fast loading
- 🔍 **SEO Optimized**

## Project Structure

```
├── src/
│   ├── app/                 # App Router pages
│   ├── components/          # React components
│   │   ├── blog/           # Blog-specific components
│   │   ├── layout/         # Layout components
│   │   └── ui/             # UI components
│   ├── lib/                # Utility functions
│   └── types/              # TypeScript type definitions
├── posts/                  # Markdown blog posts
└── public/                 # Static assets
```

## Getting Started

### Development

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Adding Blog Posts

1. Create a new `.md` file in the `posts/` directory
2. Add frontmatter with title, date, excerpt, and tags
3. Write your content in Markdown
4. The blog will automatically generate the page

Example post structure:
```markdown
---
title: "Your Post Title"
date: "2025-01-13"
excerpt: "Brief description of your post"
tags: ["nextjs", "blog"]
---

# Your Post Content

Write your blog post content here...
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
