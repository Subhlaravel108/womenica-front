import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import striptags from "striptags";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Removes HTML tags from a string and returns plain text
 * Uses striptags package to properly handle HTML entities and tags
 */
export function stripHtmlTags(html: string): string {
  if (!html) return "";
  // Use striptags to remove HTML tags while preserving text content
  // This properly handles HTML entities and nested tags
  return striptags(html).trim();
}

/**
 * Limits text to specified number of words and adds "..." if truncated
 */
export function limitWords(text: string, maxWords: number = 100): string {
  if (!text) return "";
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) {
    return text;
  }
  return words.slice(0, maxWords).join(" ") + "...";
}
