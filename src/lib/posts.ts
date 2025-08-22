/**
 * Legacy post module - now delegates to the contract-based PostService
 * Maintained for backward compatibility
 */

import { postService } from './post-service';
import { PostData, PostMetadata } from '../types/post';
import { assertValidSlug } from '../types/contracts';


/**
 * Get post metadata without full content (for listing pages)
 */
export function getPostMetadata(slug: string): PostMetadata {
  // Validate at API boundary
  assertValidSlug(slug);
  return postService.getPostMetadata(slug);
}

/**
 * Get full post data including HTML content
 */
export async function getPostData(slug: string): Promise<PostData> {
  // Validate at API boundary
  assertValidSlug(slug);
  return postService.getPost(slug);
}

/**
 * Get all posts metadata, sorted by date (newest first)
 */
export function getAllPostsMetadata(): PostMetadata[] {
  return postService.getAllPosts();
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
  return postService.getPostsByTag(tag);
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
  return postService.searchPosts(query);
}
