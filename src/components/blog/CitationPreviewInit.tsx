'use client';

import { useEffect } from 'react';

export function CitationPreviewInit() {
  useEffect(() => {
    let previewEl: HTMLDivElement | null = null;
    let hideTimer: number | null = null;

    const ensurePreviewEl = () => {
      if (previewEl) return previewEl;
      previewEl = document.createElement('div');
      previewEl.className = 'citation-preview';
      document.body.appendChild(previewEl);
      return previewEl;
    };

    const showPreview = (anchor: HTMLAnchorElement) => {
      const url = anchor.getAttribute('data-citation-url');
      if (!url) return;
      const el = ensurePreviewEl();
      el.innerHTML = '';
      const iframe = document.createElement('iframe');
      iframe.src = url;
      iframe.setAttribute('loading', 'lazy');
      iframe.setAttribute('referrerpolicy', 'no-referrer');
      el.appendChild(iframe);

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
      if (!(e.currentTarget instanceof HTMLAnchorElement)) return;
      if (hideTimer) window.clearTimeout(hideTimer);
      showPreview(e.currentTarget);
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

    return () => {
      window.removeEventListener('resize', hidePreview);
      window.removeEventListener('scroll', hidePreview as EventListener);
      detach();
    };
  }, []);

  return null;
}


