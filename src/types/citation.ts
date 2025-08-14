export interface CitationPreview {
  id: string;
  url: string;
  domain: string;
  title: string;
  description: string;
  siteLogoUrl?: string;
  image?: string;
}

export type CitationPreviewMap = Record<string, CitationPreview>;


