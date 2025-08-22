/**
 * Post repository contract using dependency injection and SOLID principles
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ValidatedSlug, assertValidSlug, ValidatedPath } from '@/types/contracts';
import { PostFrontmatter } from '@/types/post';

export interface FileStorage {
  readFile(path: ValidatedPath): string;
  fileExists(path: ValidatedPath): boolean;
  listFiles(directory: ValidatedPath): string[];
}

export interface PostRepository {
  getPostContent(slug: ValidatedSlug): { frontmatter: PostFrontmatter; content: string };
  postExists(slug: ValidatedSlug): boolean;
  listPostSlugs(): ValidatedSlug[];
}

// Default file system implementation
export class FileSystemStorage implements FileStorage {
  readFile(path: ValidatedPath): string {
    return fs.readFileSync(path, 'utf8');
  }
  
  fileExists(path: ValidatedPath): boolean {
    return fs.existsSync(path);
  }
  
  listFiles(directory: ValidatedPath): string[] {
    return fs.readdirSync(directory);
  }
}

// Post repository implementation
export class MarkdownPostRepository implements PostRepository {
  constructor(
    private storage: FileStorage,
    private postsDirectory: string
  ) {}
  
  private getPostPath(slug: ValidatedSlug): ValidatedPath {
    const filename = `${slug}.md`;
    const filePath = path.join(this.postsDirectory, filename);
    return filePath as ValidatedPath; // Trust internal path construction
  }
  
  getPostContent(slug: ValidatedSlug): { frontmatter: PostFrontmatter; content: string } {
    const filePath = this.getPostPath(slug);
    
    if (!this.storage.fileExists(filePath)) {
      throw new Error(`Post not found: ${slug}`);
    }
    
    const fileContents = this.storage.readFile(filePath);
    const { data, content } = matter(fileContents);
    
    // Validate frontmatter at boundary
    const frontmatter = this.validateFrontmatter(data);
    
    return { frontmatter, content };
  }
  
  postExists(slug: ValidatedSlug): boolean {
    const filePath = this.getPostPath(slug);
    return this.storage.fileExists(filePath);
  }
  
  listPostSlugs(): ValidatedSlug[] {
    const files = this.storage.listFiles(this.postsDirectory as ValidatedPath);
    return files
      .filter(filename => filename.endsWith('.md'))
      .map(filename => {
        const slug = filename.replace(/\.md$/, '');
        assertValidSlug(slug);
        return slug;
      });
  }
  
  private validateFrontmatter(data: Record<string, unknown>): PostFrontmatter {
    const required = ['title', 'date', 'excerpt'];
    const missing = required.filter(field => !data[field]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required frontmatter fields: ${missing.join(', ')}`);
    }
    
    return {
      title: data.title as string,
      date: data.date as string,
      excerpt: data.excerpt as string,
      tags: (data.tags as string[]) || [],
      author: data.author as string | undefined,
      image: data.image as string | undefined,
      published: data.published !== false,
    };
  }
}