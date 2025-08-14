#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// Load TS files via ts-node/register if available; otherwise, transpile-lite by eval is not attempted.
try {
  require('ts-node/register/transpile-only');
} catch {}
const { extractCitationMap } = require('../src/lib/citations/extract.ts');
const { fetchCitationPreview } = require('../src/lib/citations/fetch-firecrawl.ts');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDir = path.join(process.cwd(), 'posts');
const previewsDir = path.join(process.cwd(), 'public', 'previews');

async function main() {
  console.log('[Prebuild] Building citation previews...');
  fs.mkdirSync(previewsDir, { recursive: true });
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  for (const f of files) {
    const slug = f.replace(/\.md$/, '');
    const md = fs.readFileSync(path.join(postsDir, f), 'utf8');
    const idToUrl = extractCitationMap(md);
    const entries = Object.entries(idToUrl);
    console.log(`[Prebuild] ${slug}: ${entries.length} citations`);
    const out = {};
    let i = 0;
    for (const [id, url] of entries) {
      i += 1;
      const preview = await fetchCitationPreview(id, url);
      if (preview) out[id] = preview;
      await new Promise(r => setTimeout(r, 1500));
    }
    const outFile = path.join(previewsDir, `${slug}.json`);
    fs.writeFileSync(outFile, JSON.stringify(out, null, 2));
    console.log(`[Prebuild] Wrote ${Object.keys(out).length}/${entries.length} -> ${outFile}`);
  }
}

main().catch(err => {
  console.error('[Prebuild] Error', err);
  process.exit(1);
});


