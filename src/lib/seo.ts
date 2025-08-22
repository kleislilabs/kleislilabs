import { Metadata } from 'next';
import { PostData, PostMetadata } from '../types/post';
import { formatDateForSEO } from './date';

const defaultMetadata = {
  title: 'Kleislilabs',
  description: 'Bringing AI into the core of your business',
  author: 'Kleislilabs',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  image: '/images/og-default.jpg',
};

export function generateBlogMetadata(): Metadata {
  return {
    title: defaultMetadata.title,
    description: defaultMetadata.description,
    keywords: ['blog', 'nextjs', 'typescript', 'web development', 'AI', 'LLM', 'Business', 'MVP'],
    authors: [{ name: defaultMetadata.author }],
    creator: defaultMetadata.author,
    publisher: defaultMetadata.author,
    openGraph: {
      type: 'website',
      url: `${defaultMetadata.siteUrl}/blog`,
      title: defaultMetadata.title,
      description: defaultMetadata.description,
      images: [{
        url: defaultMetadata.image,
        width: 1200,
        height: 630,
        alt: defaultMetadata.title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: defaultMetadata.title,
      description: defaultMetadata.description,
      images: [defaultMetadata.image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generatePostMetadata(post: PostData): Metadata {
  const postUrl = `${defaultMetadata.siteUrl}/blog/${post.slug}`;
  const publishedTime = formatDateForSEO(post.frontmatter.date);
  const imageUrl = post.frontmatter.image || defaultMetadata.image;
  
  return {
    title: `${post.frontmatter.title} | ${defaultMetadata.title}`,
    description: post.frontmatter.excerpt,
    keywords: post.frontmatter.tags,
    authors: [{ name: post.frontmatter.author || defaultMetadata.author }],
    creator: post.frontmatter.author || defaultMetadata.author,
    publisher: defaultMetadata.author,
    openGraph: {
      type: 'article',
      url: postUrl,
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      publishedTime,
      authors: [post.frontmatter.author || defaultMetadata.author],
      tags: post.frontmatter.tags,
      images: [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: post.frontmatter.title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generatePostStructuredData(post: PostData) {
  const postUrl = `${defaultMetadata.siteUrl}/blog/${post.slug}`;
  const publishedTime = formatDateForSEO(post.frontmatter.date);
  const imageUrl = post.frontmatter.image || defaultMetadata.image;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    image: imageUrl,
    datePublished: publishedTime,
    dateModified: publishedTime,
    author: {
      '@type': 'Person',
      name: post.frontmatter.author || defaultMetadata.author,
    },
    publisher: {
      '@type': 'Organization',
      name: defaultMetadata.title,
      logo: {
        '@type': 'ImageObject',
        url: `${defaultMetadata.siteUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: post.frontmatter.tags.join(', '),
    articleBody: post.content,
    url: postUrl,
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(post: PostMetadata) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: defaultMetadata.siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${defaultMetadata.siteUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${defaultMetadata.siteUrl}/blog/${post.slug}`,
      },
    ],
  };
}
