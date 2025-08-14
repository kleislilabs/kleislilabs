import { visit } from 'unist-util-visit';
import type { Root, Text, Element, ElementContent, Properties } from 'hast';
import { getDomain } from 'tldts';

export type CitationMap = Record<string, string>;

/**
 * Rehype plugin that transforms text patterns like "[^7]" into anchor links with hover-preview metadata.
 * It relies on a provided citation map from id -> absolute/relative URL.
 */
export function rehypeCitations(options: { citations: CitationMap }) {
  const { citations } = options || { citations: {} };

  // Resolve a human-friendly domain for a URL, falling back safely.
  const resolveDomain = (url: string): string => {
    const parsed = getDomain(url);
    if (parsed) return parsed;
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  return (tree: Root) => {
    visit(tree as unknown as Root, 'text', ((node: Text, index?: number, parent?: Element) => {
      if (!parent || typeof index !== 'number') return;
      if (!node.value || Object.keys(citations).length === 0) return;

      const pattern = /\[\^(\d+)\]/g; // matches [^7]
      const original = node.value;
      const matches = Array.from(original.matchAll(pattern));
      if (matches.length === 0) return;

      let cursor = 0;
      const newChildren: ElementContent[] = [];

      const buildAnchor = (domain: string, count: number, url: string, id: string): Element => ({
        type: 'element',
        tagName: 'a',
        properties: {
          href: url,
          target: '_blank',
          rel: 'noopener noreferrer',
          className: ['citation-link'],
          'data-citation-url': url,
          'data-citation-id': id,
          title: `Open source ${domain} in new tab`,
          'aria-label': `Open source ${domain} in new tab`,
        } as Properties,
        children: [
          {
            type: 'element',
            tagName: 'span',
            properties: { className: ['citation-pill'] } as Properties,
            children: [
              { type: 'text', value: domain },
              ...(count > 1
                ? [{
                    type: 'element',
                    tagName: 'span',
                    properties: { className: ['citation-count'] } as Properties,
                    children: [{ type: 'text', value: ` +${count - 1}` }],
                  } as Element]
                : []),
            ],
          },
        ],
      });

      for (let i = 0; i < matches.length; i++) {
        const m = matches[i];
        const start = m.index as number;
        const mText = m[0];
        // m[1] is the citation id, used when building anchors per-domain below

        // Push preceding text
        if (start > cursor) {
          newChildren.push({ type: 'text', value: original.slice(cursor, start) } as Text);
        }

        // Build a contiguous group of citations separated only by whitespace
        let j = i;
        let endPrev = start + mText.length;
        while (j + 1 < matches.length) {
          const next = matches[j + 1];
          const between = original.slice(endPrev, next.index as number);
          if (between.trim().length === 0) {
            j += 1;
            endPrev = (next.index as number) + next[0].length;
          } else {
            break;
          }
        }

        // Aggregate domains and counts within the group
        const domainToFirstId: Record<string, string> = {};
        const domainCounts: Record<string, number> = {};
        for (let k = i; k <= j; k++) {
          const idK = matches[k][1];
          const urlK = citations[idK];
          if (!urlK) continue;
          const domainK = resolveDomain(urlK);
          domainCounts[domainK] = (domainCounts[domainK] || 0) + 1;
          if (!domainToFirstId[domainK]) domainToFirstId[domainK] = idK;
        }

        // Render one pill per domain in group order
        const renderedDomains = new Set<string>();
        for (let k = i; k <= j; k++) {
          const idK = matches[k][1];
          const urlK = citations[idK];
          if (!urlK) continue;
          const domainK = resolveDomain(urlK);
          if (renderedDomains.has(domainK)) continue;
          renderedDomains.add(domainK);
          const count = domainCounts[domainK] || 1;
          const firstId = domainToFirstId[domainK] || idK;
          newChildren.push(buildAnchor(domainK, count, urlK, firstId));
          // Insert a space between multiple pills that came from a group
          if (k < j) newChildren.push({ type: 'text', value: ' ' } as Text);
        }

        cursor = endPrev;
        i = j; // skip processed matches
      }

      // Trailing text
      if (cursor < original.length) {
        newChildren.push({ type: 'text', value: original.slice(cursor) } as Text);
      }

      // Replace this single text node with the expanded children
      parent.children = (parent.children || []) as ElementContent[];
      parent.children.splice(index, 1, ...newChildren);
    }) as unknown as (node: unknown, index?: number, parent?: unknown) => void);
  };
}


