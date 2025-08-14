import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import { rehype } from 'rehype';
import { rehypeImageContainer } from './rehype-image-container';
import { rehypeCitations } from './rehype-citations';
import { extractCitationMap } from './citations/extract';
import { PostData, PostMetadata, PostFrontmatter } from '../types/post';

const postsDirectory = path.join(process.cwd(), 'posts');

/**
 * Calculate estimated reading time for a given text
 */
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return readingTime;
}

/**
 * Extract citation id -> URL mappings from markdown lines like:
 * [^7]: https://example.com/...
 * Works even when inside HTML comments.
 */
// Use shared extractor (DRY)

/**
 * Convert markdown content to HTML
 */
async function markdownToHtml(markdown: string): Promise<string> {
  const citations = extractCitationMap(markdown);
  // First convert markdown to HTML
  const markdownResult = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(markdown);
  
  // Then process the HTML to add image containers
  const htmlResult = await rehype()
    .use(rehypeCitations, { citations })
    .use(rehypeImageContainer)
    .process(markdownResult.toString());
  
  return htmlResult.toString();
}

/**
 * Generate a URL-friendly slug from a filename
 */
function generateSlug(filename: string): string {
  return filename.replace(/\.md$/, '');
}

/**
 * Validate post frontmatter
 */
function validateFrontmatter(frontmatter: Record<string, unknown>): PostFrontmatter {
  const required = ['title', 'date', 'excerpt'];
  const missing = required.filter(field => !frontmatter[field]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required frontmatter fields: ${missing.join(', ')}`);
  }

  return {
    title: frontmatter.title as string,
    date: frontmatter.date as string,
    excerpt: frontmatter.excerpt as string,
    tags: (frontmatter.tags as string[]) || [],
    author: frontmatter.author as string | undefined,
    image: frontmatter.image as string | undefined,
    published: frontmatter.published !== false, // Default to true
  };
}

/**
 * Get all post filenames from the posts directory
 */
function getPostFilenames(): string[] {
  try {
    return fs.readdirSync(postsDirectory)
      .filter(filename => filename.endsWith('.md'));
  } catch {
    console.warn('Posts directory not found, returning empty array');
    return [];
  }
}

/**
 * Get post metadata without full content (for listing pages)
 */
export function getPostMetadata(slug: string): PostMetadata {
  const filename = `${slug}.md`;
  const filePath = path.join(postsDirectory, filename);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: ${slug}`);
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const frontmatter = validateFrontmatter(data);
  const readingTime = calculateReadingTime(content);
  
  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    excerpt: frontmatter.excerpt,
    tags: frontmatter.tags,
    author: frontmatter.author,
    image: frontmatter.image,
    readingTime,
  };
}

/**
 * Get full post data including HTML content
 */
export async function getPostData(slug: string): Promise<PostData> {
  const filename = `${slug}.md`;
  const filePath = path.join(postsDirectory, filename);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: ${slug}`);
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const frontmatter = validateFrontmatter(data);
  const htmlContent = await markdownToHtml(content);
  const readingTime = calculateReadingTime(content);
  
  return {
    slug,
    frontmatter,
    content: htmlContent,
    rawMarkdown: content,
    readingTime,
  };
}

/**
 * Get all posts metadata, sorted by date (newest first)
 */
export function getAllPostsMetadata(): PostMetadata[] {
  const filenames = getPostFilenames();
  
  const posts = filenames
    .map(filename => {
      const slug = generateSlug(filename);
      try {
        return getPostMetadata(slug);
      } catch (err) {
        console.error(`Error processing post ${slug}:`, err);
        return null;
      }
    })
    .filter((post): post is PostMetadata => post !== null)
    .filter(post => post.title && post.date) // Filter out posts with missing required fields
    .sort((a, b) => {
      // Sort by date (newest first)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  
  return posts;
}

/**
 * Get posts with pagination
 */
export function getPostsWithPagination(page: number = 1, limit: number = 10) {
  const allPosts = getAllPostsMetadata();
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const posts = allPosts.slice(startIndex, endIndex);
  
  return {
    posts,
    totalPosts: allPosts.length,
    currentPage: page,
    totalPages: Math.ceil(allPosts.length / limit),
    hasNextPage: endIndex < allPosts.length,
    hasPreviousPage: page > 1,
  };
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): PostMetadata[] {
  const allPosts = getAllPostsMetadata();
  return allPosts.filter(post => 
    post.tags.some(postTag => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  );
}

/**
 * Get all unique tags from all posts
 */
export function getAllTags(): string[] {
  const allPosts = getAllPostsMetadata();
  const tags = new Set<string>();
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  
  return Array.from(tags).sort();
}

/**
 * Get previous and next posts for navigation
 */
export function getAdjacentPosts(currentSlug: string): {
  previousPost: PostMetadata | null;
  nextPost: PostMetadata | null;
} {
  const allPosts = getAllPostsMetadata();
  const currentIndex = allPosts.findIndex(post => post.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { previousPost: null, nextPost: null };
  }
  
  return {
    previousPost: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
    nextPost: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
  };
}

/**
 * Search posts by title or content
 */
export function searchPosts(query: string): PostMetadata[] {
  const allPosts = getAllPostsMetadata();
  const lowercaseQuery = query.toLowerCase();
  
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}
