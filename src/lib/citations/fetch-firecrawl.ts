import { decode } from 'html-entities';
import { parse } from 'node-html-parser';
import { getDomain } from 'tldts';
import type { CitationPreview } from '@/types/citation';

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

async function httpGet(url: string, timeoutMs: number): Promise<{ url: string; html: string; status: number } | null> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const start = Date.now();
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'user-agent': 'KleisliLabsPreviewBot/1.0 (+https://kleislilabs.com) Node',
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'accept-language': 'en-US,en;q=0.8',
      },
      signal: controller.signal,
    });
    const ms = Date.now() - start;
    const html = await res.text();
    const finalUrl = res.url || url;
    if (!res.ok) {
      console.log(`[Firecrawl] GET ${res.status} ${finalUrl} in ${ms}ms, size=${html.length}`);
      return null;
    }
    console.log(`[Firecrawl] GET ${res.status} ${finalUrl} in ${ms}ms, size=${html.length}`);
    return { url: finalUrl, html, status: res.status };
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

function absolutize(base: string, href: string | undefined): string | undefined {
  if (!href) return undefined;
  try { return new URL(href, base).toString(); } catch { return undefined; }
}

export async function fetchCitationPreview(id: string, url: string): Promise<CitationPreview | null> {
  console.log(`[Firecrawl] Fetching ${url}`);
  const response = await httpGet(url, 30000);
  if (!response) return null;

  const { url: finalUrl, html, status } = response;
  console.log(`[Firecrawl] Parse ${finalUrl} (status ${status}) htmlSize=${html.length}`);
  const root = parse(html);

  const sel = (q: string) => root.querySelector(q)?.getAttribute('content') || root.querySelector(q)?.getAttribute('href') || '';
  const titleTag = root.querySelector('meta[property="og:title"], meta[name="og:title"], meta[name="twitter:title"]')?.getAttribute('content')
    || root.querySelector('title')?.text || '';
  const descTag = root.querySelector('meta[property="og:description"], meta[name="description"], meta[name="twitter:description"]')?.getAttribute('content') || '';
  const ogImg = sel('meta[property="og:image"], meta[name="og:image"]');
  const twImg = sel('meta[name="twitter:image"], meta[property="twitter:image"]');
  const iconHref = root.querySelector('link[rel~="icon" i], link[rel~="shortcut" i][rel~="icon" i]')?.getAttribute('href') || '';

  const domain = getDomain(finalUrl) || new URL(finalUrl).hostname;
  const title = sanitize(titleTag) || domain;
  const descriptionRaw = sanitize(descTag);
  const description = truncateAtWord(descriptionRaw, 220);

  const siteLogoUrl = absolutize(finalUrl, iconHref) || absolutize(finalUrl, twImg) || absolutize(finalUrl, ogImg);
  const image = absolutize(finalUrl, ogImg) || absolutize(finalUrl, twImg);

  if (!siteLogoUrl) console.log(`[Firecrawl] Missing siteLogoUrl for ${finalUrl}`);
  if (!titleTag) console.log(`[Firecrawl] Missing og:title/title for ${finalUrl}`);
  if (!descTag) console.log(`[Firecrawl] Missing description meta for ${finalUrl}`);
  if (descriptionRaw && descriptionRaw.length > description.length) {
    console.log(`[Firecrawl] Description truncated to ${description.length}/${descriptionRaw.length} chars for ${finalUrl}`);
  }

  const preview = { id, url: finalUrl, domain, title, description, siteLogoUrl, image };
  console.log(`[Firecrawl] Built preview for ${domain} (title=${!!title}, desc=${!!descriptionRaw}, logo=${!!siteLogoUrl})`);
  return preview;
}


