import FirecrawlApp from '@mendable/firecrawl-js';
import { decode } from 'html-entities';
import { getDomain } from 'tldts';
import type { CitationPreview } from '@/types/citation';

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY || process.env.FIRECRAWL_KEY;

if (!FIRECRAWL_API_KEY) {
  // Build-time only: we do not throw here to allow local builds without previews
  console.warn('FIRECRAWL_API_KEY not set; citation previews will be empty.');
}

const app = FIRECRAWL_API_KEY ? new FirecrawlApp({ apiKey: FIRECRAWL_API_KEY }) : null;

function truncateAtWord(input: string, max = 200): string {
  const text = input.replace(/\s+/g, ' ').trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 120 ? cut.slice(0, lastSpace) : cut) + '…';
}

function sanitize(text: string | undefined | null): string {
  if (!text) return '';
  return decode(text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim());
}

export async function fetchCitationPreview(id: string, url: string): Promise<CitationPreview | null> {
  if (!app) return null;
  try {
    const result = await app.scrapeUrl(url, {
      formats: ['extract'],
      timeout: 10000,
    });

    if (!(result as unknown as { success?: boolean }).success) {
      return null;
    }

    type Meta = {
      url?: string;
      title?: string;
      description?: string;
      openGraph?: { description?: string; images?: string[] };
      twitterCard?: { description?: string };
      icons?: string[];
      favicon?: string;
    };

    const meta: Meta | undefined = (result as unknown as { data?: { metadata?: Meta } })?.data?.metadata;

    const resolvedUrl = (meta?.url as string) || url;
    const domain = getDomain(resolvedUrl) || new URL(resolvedUrl).hostname;
    const title = sanitize(meta?.title) || domain;
    const description = truncateAtWord(
      sanitize(meta?.description || meta?.openGraph?.description || meta?.twitterCard?.description),
      220
    );
    const favicon = meta?.icons?.[0] || meta?.favicon || undefined;
    const image = meta?.openGraph?.images?.[0] || undefined;

    return { id, url: resolvedUrl, domain, title, description, favicon, image };
  } catch (err) {
    console.warn('Firecrawl fetch failed for', url, err);
    return null;
  }
}


