export interface ImageProps {
  src: string;
  alt?: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
}

export function getOptimizedImageProps(
  src: string,
  alt?: string,
  title?: string,
  description?: string
): ImageProps {
  return {
    src,
    alt: alt || title || 'Image',
    title,
    description,
    width: 800,
    height: 600,
  };
}

export function parseImageTitle(title?: string): {
  imageTitle?: string;
  description?: string;
} {
  if (!title) {
    return {};
  }

  if (title.includes('|')) {
    const parts = title.split('|');
    return {
      imageTitle: parts[0].trim(),
      description: parts.slice(1).join('|').trim(),
    };
  }

  return { imageTitle: title };
}

export function getImageContainerClasses(hasCaption: boolean): string[] {
  const baseClasses = [
    'w-full',
    'h-auto',
    'object-cover',
    'transition-transform',
    'duration-300',
    'group-hover:scale-105',
  ];

  const borderClasses = hasCaption ? ['rounded-t-2xl'] : ['rounded-2xl'];

  return [...baseClasses, ...borderClasses];
}
