# Next.js Static Blog (** visit :: kleislilabs.com **)

A modern, performant static blog built with Next.js 15, TypeScript, and Markdown. This project provides a complete blogging solution with static generation for optimal performance.

## Features

- 🚀 Next.js 15 with App Router
- 📝 Markdown posts in `posts/`
- 🎨 Tailwind CSS styling
- 🔒 TypeScript
- ⚡ Static Site Generation (SSG)
- 🔍 SEO metadata and JSON-LD
- 📑 Perplexity-style citation pills with hover previews

## Project Structure

```
kleislilabs/
├── posts/                          # Markdown blog posts
├── public/
│   └── previews/                   # Build-time citation previews per post (JSON)
├── scripts/
│   └── build-citation-previews.mjs # Prebuild crawler for citations
├── src/
│   ├── app/
│   │   └── blog/[slug]/page.tsx    # Blog post page (reads inlined previews)
│   ├── components/
│   │   ├── blog/
│   │   │   ├── PostContent.tsx
│   │   │   └── CitationPreviewInit.tsx
│   │   └── ui/
│   ├── lib/
│   │   ├── citations/
│   │   │   ├── build-cache.ts      # (used by prebuild script)
│   │   │   ├── extract.ts          # [^n]: URL extraction
│   │   │   └── fetch-firecrawl.ts  # HTTP metadata fetcher (brand image + meta)
│   │   ├── rehype-citations.ts     # Turns [^n] into domain pills + data attrs
│   │   └── posts.ts                # Markdown→HTML + rehype pipeline
│   └── types/
│       └── citation.ts             # CitationPreview types
└── README.md
```

## Environment

Create `.env.local` (not committed):

```
# Only needed if you switch back to the Firecrawl SaaS SDK (currently not used)
FIRECRAWL_API_KEY=fc-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

No secrets are required for the default HTTP metadata fetcher.

## Development

```bash
npm i
npm run dev
```

Then open http://localhost:3000.

## Blogging workflow

1. Add a Markdown file to `posts/your-post.md`.
2. Include frontmatter:

```markdown
---
title: "Your Post Title"
date: "2025-01-13"
excerpt: "Brief description"
tags: ["nextjs", "blog"]
---
```

3. Use citations as lines anywhere in the file (often in a Sources comment):

```
[^1]: https://example.com/page
[^2]: https://another.com/article
```

4. In text, reference citations with `[^1]`, `[^2]`. The renderer will convert consecutive `[^n]` into compact domain pills like `example.com +1`.

## Build and previews

Citation hovercards use build-time previews with title/description/siteLogoUrl, generated once and embedded.

- Previews are built before Next’s SSG by `scripts/build-citation-previews.mjs`.
- Output is written to `public/previews/[slug].json`.
- The page reads and inlines this JSON; no runtime network calls on hover.

Commands:

```bash
# Build previews for all posts, then Next build
npm run build

# Force refresh previews for a post, then rebuild
rm -f public/previews/ai-outsourcing-guide-2025.json
npm run build
```

### How previews are generated

- Extract: `src/lib/citations/extract.ts` scans markdown for `[^n]: URL` lines.
- Fetch: `src/lib/citations/fetch-firecrawl.ts` uses direct HTTP GETs to fetch HTML and parse:
  - title: og:title → twitter:title → <title>
  - description: og:description → description → twitter:description
  - siteLogoUrl: link[rel=icon] → twitter:image → og:image (absolute URL)
  - image: og:image → twitter:image (for future use)
- Throttling & logging:
  - 1 request at a time, ~1.5s delay in prebuild (adjust in script) with detailed logs (status, size, truncated notes).

### Styling & behavior

- Citation pills are compact rounded rectangles with domain label and optional `+N` when several consecutive citations share the same domain.
- Hovercard is a small popover with title, description (if any), and uses `siteLogoUrl` when available; click opens the source in a new tab.

## Common issues

- Build takes too long and fails:

  - Ensure previews are generated in prebuild (they are). Do not delete `public/previews/*.json` before build unless you intend to re-crawl.

- No hovercard on some pills:

  - Some sources don’t expose title/description meta; the pill still opens the source.

- Brand image missing:
  - `siteLogoUrl` falls back to `link[rel=icon]`. Not all sites provide icons; the card renders without an image. malay kumar

## Scripts

- `npm run dev` — start Next dev (Turbopack)
- `npm run build` — run prebuild previews then SSG
- `npm start` — serve production build

## Contributing

- Keep code DRY and typed. Shared logic under `src/lib/citations/*` and `src/lib/rehype-citations.ts`.
- For UI, keep styles in `src/app/globals.css` under the citation section (`.citation-link`, `.citation-pill`, `.citation-count`).
- Prefer small, focused PRs with a brief summary of:
  - What changed
  - Why
  - Any user-facing impact

## References

- Next.js docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
