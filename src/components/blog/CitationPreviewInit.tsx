'use client';

import { useEffect } from 'react';

type Preview = { 
  url: string; 
  domain: string; 
  title?: string; 
  description?: string; 
  siteLogoUrl?: string; 
  image?: string 
};

export function CitationPreviewInit() {
  useEffect(() => {
    // Get previews data from global variable or DOM element
    const getPreviews = (): Record<string, Preview> => {
      // Prefer a global if present
      const w = window as unknown as { __CITATION_PREVIEWS__?: Record<string, Preview> };
      if (w.__CITATION_PREVIEWS__ && typeof w.__CITATION_PREVIEWS__ === 'object') {
        return w.__CITATION_PREVIEWS__;
      }
      const node = document.getElementById('citation-previews');
      return node ? (JSON.parse(node.textContent || '{}') as Record<string, Preview>) : {};
    };

    // Create a container for our hover cards
    const containerEl = document.createElement('div');
    containerEl.id = 'citation-preview-container';
    containerEl.style.position = 'absolute';
    containerEl.style.top = '0';
    containerEl.style.left = '0';
    containerEl.style.pointerEvents = 'none';
    containerEl.style.zIndex = '9999';
    document.body.appendChild(containerEl);

    // Create a style element for our custom CSS
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      .citation-preview-card {
        position: absolute;
        z-index: 50;
        width: 320px;
        border-radius: 0.75rem;
        border: 1px solid var(--border);
        background: var(--card);
        color: var(--foreground);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        opacity: 0;
        transform: translateY(-2px) scale(0.96);
        transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
        overflow: hidden;
      }
      .citation-preview-card.visible {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }
      .citation-preview-content {
        padding: 1rem;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.875rem;
        word-wrap: break-word;
        overflow-wrap: break-word;
      }
      .citation-preview-logo {
        width: 28px;
        height: 28px;
        border-radius: 6px;
        background: var(--muted);
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .citation-preview-logo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .citation-preview-logo-placeholder {
        width: 12px;
        height: 12px;
        border-radius: 2px;
        background: var(--muted-foreground);
        opacity: 0.2;
      }
      .citation-preview-title {
        font-weight: 600;
        font-size: 0.9375rem;
        margin-bottom: 0.375rem;
        line-height: 1.4;
        color: var(--foreground);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .citation-preview-description {
        font-size: 0.8125rem;
        color: var(--muted-foreground);
        line-height: 1.5;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        margin-bottom: 0.5rem;
      }
      .citation-preview-domain {
        font-size: 0.6875rem;
        color: var(--muted-foreground);
        opacity: 0.7;
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      .citation-preview-domain::before {
        content: "";
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: currentColor;
      }
    `;
    document.head.appendChild(styleEl);

    let previewEl: HTMLDivElement | null = null;
    let hideTimer: number | null = null;
    let openTimer: number | null = null;
    const linkTapState = new WeakMap<HTMLAnchorElement, boolean>();     // Track tap state for each link

    const createPreviewEl = () => {
      if (previewEl) return previewEl;
      previewEl = document.createElement('div');
      previewEl.className = 'citation-preview-card';
      containerEl.appendChild(previewEl);
      return previewEl;
    };

    const showPreview = (anchor: HTMLAnchorElement) => {
      const id = anchor.getAttribute('data-citation-id') || '';
      const previewsMap = getPreviews();
      const data = previewsMap[id];
      if (!data || !data.title) return;

      const el = createPreviewEl();
      el.innerHTML = '';

      // Create content container
      const content = document.createElement('div');
      content.className = 'citation-preview-content';

      // Create logo/icon
      const logoContainer = document.createElement('div');
      logoContainer.className = 'citation-preview-logo';
      
      if (data.siteLogoUrl) {
        const logo = document.createElement('img');
        logo.src = data.siteLogoUrl;
        logo.alt = '';
        logoContainer.appendChild(logo);
      } else {
        const placeholder = document.createElement('div');
        placeholder.className = 'citation-preview-logo-placeholder';
        logoContainer.appendChild(placeholder);
      }
      content.appendChild(logoContainer);

      // Create text content container
      const textContent = document.createElement('div');
      
      // Title
      const title = document.createElement('div');
      title.className = 'citation-preview-title';
      title.textContent = data.title;
      textContent.appendChild(title);
      
      // Description
      if (data.description) {
        const description = document.createElement('div');
        description.className = 'citation-preview-description';
        description.textContent = data.description;
        textContent.appendChild(description);
      }
      
      // Domain
      const domain = document.createElement('div');
      domain.className = 'citation-preview-domain';
      domain.textContent = data.domain || new URL(data.url).hostname;
      textContent.appendChild(domain);
      
      content.appendChild(textContent);
      el.appendChild(content);

      // Position the preview
      const rect = anchor.getBoundingClientRect();
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollX = window.scrollX || document.documentElement.scrollLeft;
      const top = rect.top + scrollY + rect.height + 8;
      const left = Math.min(
        scrollX + rect.left,
        scrollX + window.innerWidth - 340
      );
      el.style.top = `${top}px`;
      el.style.left = `${left}px`;
      
      // Show with animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.classList.add('visible');
        });
      });
    };

    const hidePreview = () => {
      if (!previewEl) return;
      previewEl.classList.remove('visible');
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement;
      if (!target) return;
      if (hideTimer) window.clearTimeout(hideTimer);
      if (openTimer) window.clearTimeout(openTimer);
      openTimer = window.setTimeout(() => showPreview(target), 250);
    };

    const handleMouseLeave = () => {
      if (openTimer) window.clearTimeout(openTimer);
      if (hideTimer) window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(hidePreview, 150);
    };

    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!previewEl) return;
      if (target && !previewEl.contains(target)) {
        handleMouseLeave();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      if (!target) return;
      
      const isFirstTap = !linkTapState.get(target);
      
      if (isFirstTap) {
        e.preventDefault();
        linkTapState.set(target, true);
        
        if (hideTimer) window.clearTimeout(hideTimer);
        if (openTimer) window.clearTimeout(openTimer);
        openTimer = window.setTimeout(() => showPreview(target), 100);
      } else {
        linkTapState.set(target, false);
        hidePreview();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      if (!target) return;
      
      const isFirstTap = linkTapState.get(target);
      if (isFirstTap) {
        e.preventDefault();
      }
    };
  
    const attach = () => {
      const anchors = document.querySelectorAll<HTMLAnchorElement>('a.citation-link');
      anchors.forEach(a => {
        a.addEventListener('mouseenter', handleMouseEnter);
        a.addEventListener('mouseleave', handleMouseLeave);
        a.addEventListener('touchstart', handleTouchStart, { passive: false });
        a.addEventListener('touchend', handleTouchEnd, { passive: false });
      })
      document.addEventListener('click', handleDocumentClick, true);
    }

    const detach = () => {
      const anchors = document.querySelectorAll<HTMLAnchorElement>('a.citation-link');
      anchors.forEach(a => {
        a.removeEventListener('mouseenter', handleMouseEnter);
        a.removeEventListener('mouseleave', handleMouseLeave);
        a.removeEventListener('touchstart', handleTouchStart);
        a.removeEventListener('touchend', handleTouchEnd);
      });
      document.removeEventListener('click', handleDocumentClick, true);
      if (previewEl && previewEl.parentNode) {
        previewEl.parentNode.removeChild(previewEl);
        previewEl = null;
      }
      if (containerEl && containerEl.parentNode) {
        containerEl.parentNode.removeChild(containerEl);
      }
      if (styleEl && styleEl.parentNode) {
        styleEl.parentNode.removeChild(styleEl);
      }
    };

    attach();
    window.addEventListener('resize', hidePreview);
    window.addEventListener('scroll', hidePreview, { passive: true });
    window.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') hidePreview(); });

    return () => {
      window.removeEventListener('resize', hidePreview);
      window.removeEventListener('scroll', hidePreview as EventListener);
      window.removeEventListener('keydown', (ev) => { if (ev.key === 'Escape') hidePreview(); });
      detach();
    };
  }, []);

  return null;
}