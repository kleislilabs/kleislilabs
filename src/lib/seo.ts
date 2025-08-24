import { Metadata } from 'next';
import { PostData, PostMetadata } from '../types/post';
import { formatDateForSEO } from './date';

const defaultMetadata = {
  title: 'Kleislilabs',
  description: 'From Vision to AI Reality - AI solutions built for real business problems',
  author: 'Kleislilabs',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://kleislilabs.com',
  image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://kleislilabs.com'}/og-image.png`,
  twitterImage: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://kleislilabs.com'}/twitter-image.png`,
  locale: 'en_US',
  themeColor: '#0070F3',
};

// Helper function to get absolute image URL
function getAbsoluteImageUrl(imagePath: string): string {
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  return `${defaultMetadata.siteUrl}${imagePath}`;
}

export function generateBlogMetadata(): Metadata {
  const blogUrl = `${defaultMetadata.siteUrl}/blog`;
  
  return {
    title: defaultMetadata.title,
    description: defaultMetadata.description,
    keywords: ['blog', 'nextjs', 'typescript', 'web development', 'AI', 'LLM', 'Business', 'MVP'],
    authors: [{ name: defaultMetadata.author }],
    creator: defaultMetadata.author,
    publisher: defaultMetadata.author,
    alternates: {
      canonical: blogUrl,
    },
    openGraph: {
      type: 'website',
      locale: defaultMetadata.locale,
      url: blogUrl,
      title: defaultMetadata.title,
      description: defaultMetadata.description,
      siteName: defaultMetadata.title,
      images: [
        {
          url: getAbsoluteImageUrl(defaultMetadata.image),
          width: 1024,
          height: 1024,
          alt: defaultMetadata.title,
          type: 'image/png',
        },
        {
          url: getAbsoluteImageUrl(defaultMetadata.twitterImage),
          width: 512,
          height: 512,
          alt: defaultMetadata.title,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@kleislilabs',
      creator: '@kleislilabs',
      title: defaultMetadata.title,
      description: defaultMetadata.description,
      images: [{
        url: getAbsoluteImageUrl(defaultMetadata.twitterImage),
        width: 512,
        height: 512,
        alt: defaultMetadata.title,
      }],
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
  const imageUrl = getAbsoluteImageUrl(post.frontmatter.image || defaultMetadata.image);
  
  // Handle draft posts
  const isDraft = post.frontmatter.draft === true;
  const robotsConfig = isDraft 
    ? {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-snippet': -1,
          'max-image-preview': 'large' as const,
          'max-video-preview': -1,
        },
      };
  
  return {
    title: `${post.frontmatter.title} | ${defaultMetadata.title}`,
    description: post.frontmatter.excerpt,
    keywords: post.frontmatter.tags || [],
    authors: [{ name: post.frontmatter.author || defaultMetadata.author }],
    creator: post.frontmatter.author || defaultMetadata.author,
    publisher: defaultMetadata.author,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: 'article',
      locale: defaultMetadata.locale,
      url: postUrl,
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      siteName: defaultMetadata.title,
      publishedTime,
      authors: [post.frontmatter.author || defaultMetadata.author],
      tags: post.frontmatter.tags,
      images: [{
        url: imageUrl,
        width: 1024,
        height: 1024,
        alt: post.frontmatter.title,
        type: 'image/png',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@kleislilabs',
      creator: '@kleislilabs',
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      images: [{
        url: imageUrl,
        width: 512,
        height: 512,
        alt: post.frontmatter.title,
      }],
    },
    robots: robotsConfig,
  };
}

export function generatePostStructuredData(post: PostData) {
  const postUrl = `${defaultMetadata.siteUrl}/blog/${post.slug}`;
  const publishedTime = formatDateForSEO(post.frontmatter.date);
  const modifiedTime = formatDateForSEO(post.frontmatter.updated || post.frontmatter.date);
  const imageUrl = getAbsoluteImageUrl(post.frontmatter.image || defaultMetadata.image);
  
  // Calculate word count
  const wordCount = post.content.split(/\s+/).filter(word => word.length > 0).length;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    image: imageUrl,
    datePublished: publishedTime,
    dateModified: modifiedTime,
    author: {
      '@type': 'Person',
      name: post.frontmatter.author || defaultMetadata.author,
    },
    publisher: {
      '@type': 'Organization',
      name: defaultMetadata.title,
      url: defaultMetadata.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: getAbsoluteImageUrl('/og-image.png'),
        width: 1024,
        height: 1024,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: post.frontmatter.tags.join(', '),
    articleBody: post.content,
    articleSection: 'Blog',
    wordCount: wordCount,
    url: postUrl,
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(post: PostMetadata) {
  const homeUrl = defaultMetadata.siteUrl;
  const blogUrl = `${defaultMetadata.siteUrl}/blog`;
  const postUrl = `${defaultMetadata.siteUrl}/blog/${post.slug}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: { '@id': homeUrl },
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: { '@id': blogUrl },
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: { '@id': postUrl },
      },
    ],
  };
}
