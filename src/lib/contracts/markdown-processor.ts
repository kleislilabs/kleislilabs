/**
 * Markdown processor contract following Open/Closed Principle
 */

import { SafeHTML, SanitizedContent, assertSafeHTML } from '@/types/contracts';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import { rehype } from 'rehype';
import { rehypeImageContainer } from '../rehype-image-container';
import { rehypeCitations } from '../rehype-citations';
import { extractCitationMap } from '../citations/extract';

export interface MarkdownPlugin {
  process(content: string): Promise<string>;
}

export interface MarkdownProcessor {
  toHTML(markdown: SanitizedContent): Promise<SafeHTML>;
}

// Simple, extensible markdown processor
export class ExtensibleMarkdownProcessor implements MarkdownProcessor {
  constructor(private plugins: MarkdownPlugin[] = []) {}
  
  async toHTML(markdown: SanitizedContent): Promise<SafeHTML> {
    // Extract citations from markdown
    const citations = extractCitationMap(markdown);
    
    // Basic markdown to HTML conversion
    const result = await remark()
      .use(remarkGfm)
      .use(remarkHtml)
      .process(markdown);
    
    let html = result.toString();
    
    // Apply plugins in sequence
    for (const plugin of this.plugins) {
      html = await plugin.process(html);
    }
    
    // Process with rehype for final transformations including citations
    const htmlResult = await rehype()
      .use(rehypeCitations, { citations })
      .use(rehypeImageContainer)
      .process(html);
    
    const finalHtml = htmlResult.toString();
    assertSafeHTML(finalHtml);
    return finalHtml;
  }
}

// Plugin for image containers
export class ImageContainerPlugin implements MarkdownPlugin {
  async process(content: string): Promise<string> {
    // Image container processing is handled by rehype
    return content;
  }
}