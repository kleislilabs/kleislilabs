import { format, parseISO, isValid } from 'date-fns';

/**
 * Format a date string for display
 */
export function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) {
      throw new Error('Invalid date');
    }
    return format(date, 'MMMM d, yyyy');
  } catch (_error) {
    console.error('Error formatting date:', dateString, _error);
    return dateString; // Return original string if formatting fails
  }
}

/**
 * Format a date for SEO/meta tags (ISO format)
 */
export function formatDateForSEO(dateString: string): string {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) {
      throw new Error('Invalid date');
    }
    return date.toISOString();
  } catch (_error) {
    console.error('Error formatting date for SEO:', dateString, _error);
    return new Date().toISOString(); // Return current date if formatting fails
  }
}

/**
 * Get relative time (e.g., "2 days ago")
 */
export function getRelativeTime(dateString: string): string {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) {
      throw new Error('Invalid date');
    }
    
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return formatDate(dateString);
    }
  } catch (_error) {
    console.error('Error getting relative time:', dateString, _error);
    return 'unknown';
  }
}

/**
 * Sort dates (newest first)
 */
export function sortByDate<T extends { date: string }>(items: T[]): T[] {
  return items.sort((a, b) => {
    try {
      const dateA = parseISO(a.date);
      const dateB = parseISO(b.date);
      
      if (!isValid(dateA) || !isValid(dateB)) {
        return 0;
      }
      
      return dateB.getTime() - dateA.getTime();
    } catch (_error) {
      console.error('Error sorting by date:', _error);
      return 0;
    }
  });
}
