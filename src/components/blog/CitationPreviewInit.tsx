'use client';

import { useEffect } from 'react';

export function CitationPreviewInit() {
  useEffect(() => {
    let previewEl: HTMLDivElement | null = null;
    let hideTimer: number | null = null;
    let openTimer: number | null = null;

    type Preview = { url: string; domain: string; title?: string; description?: string; favicon?: string; image?: string };
    const getPreviews = (): Record<string, Preview> => {
      // Prefer a global if present
      const w = window as unknown as { __CITATION_PREVIEWS__?: Record<string, Preview> };
      if (w.__CITATION_PREVIEWS__ && typeof w.__CITATION_PREVIEWS__ === 'object') {
        return w.__CITATION_PREVIEWS__;
      }
      const node = document.getElementById('citation-previews');
      return node ? (JSON.parse(node.textContent || '{}') as Record<string, Preview>) : {};
    };

    const ensurePreviewEl = () => {
      if (previewEl) return previewEl;
      previewEl = document.createElement('div');
      previewEl.className = 'citation-preview';
      document.body.appendChild(previewEl);
      return previewEl;
    };

    const showPreview = (anchor: HTMLAnchorElement) => {
      const id = anchor.getAttribute('data-citation-id') || '';
      const previewsMap = getPreviews();
      const data = previewsMap[id];
      if (!data || !data.title) return;
      const el = ensurePreviewEl();
      el.innerHTML = '';
      const wrap = document.createElement('div');
      wrap.style.padding = '12px';
      wrap.style.display = 'grid';
      wrap.style.gridTemplateColumns = 'auto 1fr';
      wrap.style.gap = '10px';

      if (data.favicon) {
        const ico = document.createElement('img');
        ico.src = data.favicon;
        ico.alt = '';
        ico.width = 20;
        ico.height = 20;
        ico.style.borderRadius = '4px';
        wrap.appendChild(ico);
      } else {
        const ph = document.createElement('div');
        ph.style.width = '20px';
        ph.style.height = '20px';
        ph.style.borderRadius = '4px';
        ph.style.background = 'var(--muted)';
        wrap.appendChild(ph);
      }

      const col = document.createElement('div');
      const title = document.createElement('div');
      title.textContent = data.title;
      title.style.fontWeight = '600';
      title.style.marginBottom = '4px';
      const desc = document.createElement('div');
      if (data.description) desc.textContent = data.description;
      desc.style.fontSize = '0.85em';
      desc.style.color = 'var(--muted-foreground)';
      col.appendChild(title);
      if (data.description) col.appendChild(desc);
      wrap.appendChild(col);
      el.appendChild(wrap);

      const rect = anchor.getBoundingClientRect();
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollX = window.scrollX || document.documentElement.scrollLeft;
      const top = rect.top + scrollY + rect.height + 8;
      const left = Math.min(
        scrollX + rect.left,
        scrollX + window.innerWidth - 380
      );
      el.style.top = `${top}px`;
      el.style.left = `${left}px`;
      el.style.opacity = '1';
      el.style.pointerEvents = 'auto';
    };

    const hidePreview = () => {
      if (!previewEl) return;
      previewEl.style.opacity = '0';
      previewEl.style.pointerEvents = 'none';
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement;
      if (!target) return;
      if (hideTimer) window.clearTimeout(hideTimer);
      if (openTimer) window.clearTimeout(openTimer);
      openTimer = window.setTimeout(() => showPreview(target), 250);
    };

    const handleMouseLeave = () => {
      if (hideTimer) window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(hidePreview, 120);
    };

    const attach = () => {
      const anchors = document.querySelectorAll<HTMLAnchorElement>('a.citation-link');
      anchors.forEach(a => {
        a.addEventListener('mouseenter', handleMouseEnter);
        a.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    const detach = () => {
      const anchors = document.querySelectorAll<HTMLAnchorElement>('a.citation-link');
      anchors.forEach(a => {
        a.removeEventListener('mouseenter', handleMouseEnter);
        a.removeEventListener('mouseleave', handleMouseLeave);
      });
      if (previewEl && previewEl.parentNode) {
        previewEl.parentNode.removeChild(previewEl);
        previewEl = null;
      }
    };

    attach();
    window.addEventListener('resize', hidePreview);
    window.addEventListener('scroll', hidePreview, { passive: true });
    window.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') hidePreview(); });

    return () => {
      window.removeEventListener('resize', hidePreview);
      window.removeEventListener('scroll', hidePreview as EventListener);
      detach();
    };
  }, []);

  return null;
}


