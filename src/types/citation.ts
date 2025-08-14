export interface CitationPreview {
  id: string;
  url: string;
  domain: string;
  title: string;
  description: string;
  favicon?: string;
  image?: string;
}

export type CitationPreviewMap = Record<string, CitationPreview>;


