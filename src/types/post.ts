/**
 * Type definitions for blog posts and related data structures
 */

export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  author?: string;
  image?: string;
  published?: boolean;
  draft?: boolean;
  updated?: string;
}

export interface PostData {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: number;
  rawMarkdown?: string;
}

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  author?: string;
  image?: string;
  readingTime: number;
}

export interface BlogPageProps {
  posts: PostMetadata[];
  totalPosts: number;
  currentPage: number;
  totalPages: number;
}

export interface PostPageProps {
  post: PostData;
  previousPost?: PostMetadata;
  nextPost?: PostMetadata;
}

export interface PostsApiResponse {
  posts: PostMetadata[];
  total: number;
  page: number;
  limit: number;
}
