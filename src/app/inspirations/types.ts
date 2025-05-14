export interface HighlightItem {
  title: string;
  description: string;
}

export interface Attribution {
  author: string;
  link?: string;
  linkText?: string;
}

export interface DetailedContent {
  overview: string;
  highlights: HighlightItem[];
  additionalVideo?: string;
  embedCode?: string;
  attribution?: Attribution;
  albumCovers?: string[];
}

export interface InspirationItem {
  id: number;
  title: string;
  image: string;
  contentImage?: string;
  contentVideo?: string;
  description: string;
  detailedContent: DetailedContent | null;
} 