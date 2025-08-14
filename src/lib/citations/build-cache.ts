import fs from 'fs';
import path from 'path';
import { extractCitationMap } from './extract';
import { fetchCitationPreview } from './fetch-firecrawl';
import type { CitationPreviewMap } from '@/types/citation';

export async function buildCitationPreviewsForPost(slug: string, markdown: string): Promise<CitationPreviewMap> {
  const previewsPath = path.join(process.cwd(), 'public', 'previews');
  const outFile = path.join(previewsPath, `${slug}.json`);

  try {
    if (fs.existsSync(outFile)) {
      const raw = fs.readFileSync(outFile, 'utf8');
      const parsed = JSON.parse(raw) as CitationPreviewMap;
      console.log(`[Firecrawl] Using cached previews for '${slug}' (${Object.keys(parsed).length}) -> ${outFile}`);
      return parsed;
    }
  } catch {
    // Ignore and rebuild
  }

  const idToUrl = extractCitationMap(markdown);
  const entries = Object.entries(idToUrl);
  const result: CitationPreviewMap = {};

  if (entries.length === 0) {
    console.log(`[Firecrawl] No citations found for '${slug}'`);
    return result;
  }

  // Ensure output dir
  fs.mkdirSync(previewsPath, { recursive: true });

  // Limit concurrency
  const concurrency = 1; // be gentle; avoid rate limits
  let index = 0;
  let built = 0;
  const run = async () => {
    while (index < entries.length) {
      const current = index++;
      const [id, url] = entries[current];
      const preview = await fetchCitationPreview(id, url);
      if (preview) result[id] = preview;
      else console.log(`[Firecrawl] Skipped preview for id ${id} (${url})`);
      if (preview) built++;
      // Wait 30s between calls to reduce origin/CDN throttling and stay within build budgets
      await new Promise((r) => setTimeout(r, 30000));
    }
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, entries.length) }, run));

  fs.writeFileSync(outFile, JSON.stringify(result, null, 2), 'utf8');
  console.log(`[Firecrawl] Wrote ${built}/${entries.length} previews for '${slug}' -> ${outFile}`);
  return result;
}


