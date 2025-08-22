import path from 'path';
import { 
  assertValidSlug,
  ContentValidator
} from '@/types/contracts';
import { PostData, PostMetadata } from '@/types/post';
import { 
  PostRepository, 
  MarkdownPostRepository, 
  FileSystemStorage 
} from './contracts/post-repository';
import { 
  MarkdownProcessor, 
  ExtensibleMarkdownProcessor 
} from './contracts/markdown-processor';

export interface PostService {
  getPost(slug: string): Promise<PostData>;
  getPostMetadata(slug: string): PostMetadata;
  getAllPosts(): PostMetadata[];
  searchPosts(query: string): PostMetadata[];
  getPostsByTag(tag: string): PostMetadata[];
}

export class DefaultPostService implements PostService {
  private repository: PostRepository;
  private processor: MarkdownProcessor;
  
  constructor(
    repository?: PostRepository,
    processor?: MarkdownProcessor
  ) {
    const postsDirectory = path.join(process.cwd(), 'posts');
    this.repository = repository || new MarkdownPostRepository(
      new FileSystemStorage(),
      postsDirectory
    );
    this.processor = processor || new ExtensibleMarkdownProcessor();
  }
  
  async getPost(slug: string): Promise<PostData> {
    assertValidSlug(slug);
    
    const { frontmatter, content } = this.repository.getPostContent(slug);
    
    const sanitizedContent = ContentValidator.validate(content);
    const html = await this.processor.toHTML(sanitizedContent);
    
    return {
      slug,
      frontmatter,
      content: html,
      rawMarkdown: sanitizedContent,
      readingTime: this.calculateReadingTime(content)
    };
  }
  
  getPostMetadata(slug: string): PostMetadata {
    assertValidSlug(slug);
    
    const { frontmatter, content } = this.repository.getPostContent(slug);
    
    return {
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      excerpt: frontmatter.excerpt,
      tags: frontmatter.tags,
      author: frontmatter.author,
      image: frontmatter.image,
      readingTime: this.calculateReadingTime(content)
    };
  }
  
  getAllPosts(): PostMetadata[] {
    const slugs = this.repository.listPostSlugs();
    
    return slugs
      .map(slug => {
        try {
          return this.getPostMetadata(slug);
        } catch {
          return null;
        }
      })
      .filter((post): post is PostMetadata => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  
  searchPosts(query: string): PostMetadata[] {
    const posts = this.getAllPosts();
    const lowercaseQuery = query.toLowerCase();
    
    return posts.filter(post => 
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }
  
  getPostsByTag(tag: string): PostMetadata[] {
    const posts = this.getAllPosts();
    return posts.filter(post => 
      post.tags.some(postTag => 
        postTag.toLowerCase() === tag.toLowerCase()
      )
    );
  }
  
  private calculateReadingTime(text: string): number {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }
}

export const postService = new DefaultPostService();