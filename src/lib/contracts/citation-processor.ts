/**
 * Simplified citation processor using contracts
 * Replaces 500+ lines with a simple, contract-based implementation
 */

import { CitationContract } from '@/types/contracts';

export interface CitationProcessor {
  extractCitations(markdown: string): Map<string, CitationContract>;
  replaceCitations(html: string, citations: Map<string, CitationContract>): string;
}

export class SimpleCitationProcessor implements CitationProcessor {
  /**
   * Extract citation definitions from markdown
   * Pattern: [^id]: url
   */
  extractCitations(markdown: string): Map<string, CitationContract> {
    const citations = new Map<string, CitationContract>();
    const pattern = /\[\^(\d+)\]:\s*(\S+)/g;
    
    let match;
    while ((match = pattern.exec(markdown)) !== null) {
      const [, id, url] = match;
      citations.set(id, {
        id,
        url,
        domain: this.extractDomain(url)
      });
    }
    
    return citations;
  }
  
  /**
   * Replace citation references with links
   * Pattern: [^id] -> <a href="url">[id]</a>
   */
  replaceCitations(html: string, citations: Map<string, CitationContract>): string {
    return html.replace(/\[\^(\d+)\]/g, (match, id) => {
      const citation = citations.get(id);
      if (!citation) return match;
      
      return `<a href="${citation.url}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="citation-link"
              data-citation-id="${id}"
              title="Open ${citation.domain}">[${id}]</a>`;
    });
  }
  
  private extractDomain(url: string): string {
    try {
      const { hostname } = new URL(url);
      return hostname.replace('www.', '');
    } catch {
      return 'external';
    }
  }
}