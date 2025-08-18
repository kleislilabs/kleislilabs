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
  const hasApiKey = !!process.env.FIRECRAWL_API_KEY;
  
  if (!hasApiKey) {
    console.log('[Prebuild] Warning: FIRECRAWL_API_KEY not set - will only use existing JSON files');
  } else {
    console.log('[Prebuild] Building citation previews...');
  }

  fs.mkdirSync(previewsDir, { recursive: true });
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  
  let skippedCount = 0;
  let processedCount = 0;
  
  for (const f of files) {
    const slug = f.replace(/\.md$/, '');
    const outFile = path.join(previewsDir, `${slug}.json`);
    
    // Skip if JSON already exists
    if (fs.existsSync(outFile)) {
      console.log(`[Prebuild] ${slug}: JSON already exists, using cached version`);
      skippedCount++;
      continue;
    }
    
    // If no API key and JSON doesn't exist, warn and continue
    if (!hasApiKey) {
      console.log(`[Prebuild] ${slug}: No JSON found and API key missing, skipping`);
      continue;
    }
    
    const md = fs.readFileSync(path.join(postsDir, f), 'utf8');
    const idToUrl = extractCitationMap(md);
    const entries = Object.entries(idToUrl);
    console.log(`[Prebuild] ${slug}: Processing ${entries.length} citations`);
    
    const out = {};
    let i = 0;
    for (const [id, url] of entries) {
      i += 1;
      const preview = await fetchCitationPreview(id, url);
      if (preview) out[id] = preview;
      await new Promise(r => setTimeout(r, 1500));
    }
    
    fs.writeFileSync(outFile, JSON.stringify(out, null, 2));
    console.log(`[Prebuild] Wrote ${Object.keys(out).length}/${entries.length} -> ${outFile}`);
    processedCount++;
  }
  
  console.log(`[Prebuild] Complete: ${skippedCount} cached, ${processedCount} processed, ${files.length} total`);
}

main().catch(err => {
  console.error('[Prebuild] Error', err);
  // Exit with success if it's just a missing API key issue
  if (err.message && err.message.includes('FIRECRAWL_API_KEY')) {
    console.log('[Prebuild] Continuing without citation previews');
    process.exit(0);
  }
  process.exit(1);
});


