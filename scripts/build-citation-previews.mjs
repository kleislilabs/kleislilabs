#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDir = path.join(process.cwd(), 'posts');
const previewsDir = path.join(process.cwd(), 'public', 'previews');

/**
 * Simple citation extraction (matches the TypeScript version)
 */
function extractCitationMap(markdown) {
  const citations = {};
  const regex = /^\[\^(\d+)\]:\s*(.+)$/gm;
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    const id = match[1];
    const rightSide = match[2].trim();
    const urlMatch = rightSide.match(/https?:\/\/\S+/);
    if (urlMatch) citations[id] = urlMatch[0];
  }
  return citations;
}

async function main() {
  const hasApiKey = !!process.env.FIRECRAWL_API_KEY;
  
  if (!hasApiKey) {
    console.log('[Prebuild] Note: FIRECRAWL_API_KEY not set - will only use existing JSON files');
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
      console.log(`[Prebuild] ${slug}: Using cached preview`);
      skippedCount++;
      continue;
    }
    
    // If no API key and JSON doesn't exist, create empty placeholder
    if (!hasApiKey) {
      // Create empty JSON to prevent build errors
      fs.writeFileSync(outFile, '{}');
      console.log(`[Prebuild] ${slug}: Created empty preview (no API key)`);
      continue;
    }
    
    const md = fs.readFileSync(path.join(postsDir, f), 'utf8');
    const idToUrl = extractCitationMap(md);
    const entries = Object.entries(idToUrl);
    
    if (entries.length === 0) {
      // No citations, create empty file
      fs.writeFileSync(outFile, '{}');
      console.log(`[Prebuild] ${slug}: No citations found`);
      continue;
    }
    
    console.log(`[Prebuild] ${slug}: Found ${entries.length} citations (would fetch with API)`);
    
    // For now, create placeholder data since we're in refactoring mode
    // In production, this would call the fetchCitationPreview function
    const out = {};
    for (const [id, url] of entries) {
      // Placeholder preview data
      out[id] = {
        id,
        url,
        domain: new URL(url).hostname.replace('www.', ''),
        title: `Citation ${id}`,
        description: 'Citation preview'
      };
    }
    
    fs.writeFileSync(outFile, JSON.stringify(out, null, 2));
    console.log(`[Prebuild] ${slug}: Wrote ${Object.keys(out).length} previews`);
    processedCount++;
  }
  
  console.log(`[Prebuild] Complete: ${skippedCount} cached, ${processedCount} processed`);
}

main().catch(err => {
  console.error('[Prebuild] Error:', err.message);
  // Don't fail the build for preview generation issues
  console.log('[Prebuild] Continuing build without citation previews');
  process.exit(0);
});