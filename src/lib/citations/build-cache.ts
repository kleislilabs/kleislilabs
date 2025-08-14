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
      return JSON.parse(raw) as CitationPreviewMap;
    }
  } catch {
    // Ignore and rebuild
  }

  const idToUrl = extractCitationMap(markdown);
  const entries = Object.entries(idToUrl);
  const result: CitationPreviewMap = {};

  if (entries.length === 0) {
    return result;
  }

  // Ensure output dir
  fs.mkdirSync(previewsPath, { recursive: true });

  // Limit concurrency
  const concurrency = 4;
  let index = 0;
  const run = async () => {
    while (index < entries.length) {
      const current = index++;
      const [id, url] = entries[current];
      const preview = await fetchCitationPreview(id, url);
      if (preview) result[id] = preview;
    }
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, entries.length) }, run));

  fs.writeFileSync(outFile, JSON.stringify(result, null, 2), 'utf8');
  return result;
}


