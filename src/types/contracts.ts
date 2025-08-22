/**
 * Contract-based types using TypeScript branded types for type safety.
 * These types enforce validation at API boundaries and ensure data integrity.
 */

// Branded types for validated data
export type ValidatedSlug = string & { readonly __brand: 'ValidatedSlug' };
export type SafeHTML = string & { readonly __brand: 'SafeHTML' };
export type SanitizedContent = string & { readonly __brand: 'SanitizedContent' };
export type ValidatedPath = string & { readonly __brand: 'ValidatedPath' };

// Contract interfaces
export interface ValidationContract<T> {
  validate(input: unknown): T;
  isValid(input: unknown): input is T;
}

export interface PostContract {
  slug: ValidatedSlug;
  content: SafeHTML;
  rawMarkdown: SanitizedContent;
}

export interface CitationContract {
  id: string;
  url: string;
  domain: string;
}

// Assertion functions for API boundaries
export function assertValidSlug(value: string): asserts value is ValidatedSlug {
  // Prevent path traversal attacks
  if (!value || typeof value !== 'string') {
    throw new Error('Slug must be a non-empty string');
  }
  if (value.includes('..') || value.includes('/') || value.includes('\\')) {
    throw new Error('Invalid slug: contains path traversal characters');
  }
  if (!/^[a-z0-9-]+$/.test(value)) {
    throw new Error('Invalid slug: must contain only lowercase letters, numbers, and hyphens');
  }
}

export function assertSafeHTML(value: string): asserts value is SafeHTML {
  if (typeof value !== 'string') {
    throw new Error('HTML content must be a string');
  }
  // Trust that the HTML has been properly sanitized by our markdown processor
  // This is a boundary assertion, not a sanitization function
}

export function assertSanitizedContent(value: string): asserts value is SanitizedContent {
  if (typeof value !== 'string') {
    throw new Error('Content must be a string');
  }
  // Trust that content has been properly sanitized
}

export function assertValidPath(value: string): asserts value is ValidatedPath {
  if (!value || typeof value !== 'string') {
    throw new Error('Path must be a non-empty string');
  }
  if (value.includes('..')) {
    throw new Error('Invalid path: contains directory traversal');
  }
}

// Type guards
export function isValidSlug(value: unknown): value is ValidatedSlug {
  if (typeof value !== 'string' || !value) return false;
  if (value.includes('..') || value.includes('/') || value.includes('\\')) return false;
  return /^[a-z0-9-]+$/.test(value);
}

export function isSafeHTML(value: unknown): value is SafeHTML {
  return typeof value === 'string';
}

export function isSanitizedContent(value: unknown): value is SanitizedContent {
  return typeof value === 'string';
}

export function isValidPath(value: unknown): value is ValidatedPath {
  if (typeof value !== 'string' || !value) return false;
  return !value.includes('..');
}

// Validators for creating branded types
export const SlugValidator: ValidationContract<ValidatedSlug> = {
  validate(input: unknown): ValidatedSlug {
    if (typeof input !== 'string') {
      throw new Error('Slug must be a string');
    }
    assertValidSlug(input);
    return input;
  },
  isValid: isValidSlug
};

export const HTMLValidator: ValidationContract<SafeHTML> = {
  validate(input: unknown): SafeHTML {
    if (typeof input !== 'string') {
      throw new Error('HTML must be a string');
    }
    assertSafeHTML(input);
    return input;
  },
  isValid: isSafeHTML
};

export const ContentValidator: ValidationContract<SanitizedContent> = {
  validate(input: unknown): SanitizedContent {
    if (typeof input !== 'string') {
      throw new Error('Content must be a string');
    }
    assertSanitizedContent(input);
    return input;
  },
  isValid: isSanitizedContent
};

export const PathValidator: ValidationContract<ValidatedPath> = {
  validate(input: unknown): ValidatedPath {
    if (typeof input !== 'string') {
      throw new Error('Path must be a string');
    }
    assertValidPath(input);
    return input;
  },
  isValid: isValidPath
};