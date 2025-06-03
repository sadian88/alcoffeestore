import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number | undefined | null): string {
  if (price === undefined || price === null) {
    return '0'; // Default to '0' or handle as appropriate for your app
  }
  const fixedPrice = price.toFixed(2); // Get string with 2 decimal places
  if (fixedPrice.endsWith('.00')) {
    return price.toFixed(0); // Return integer part if decimals are .00
  }
  return fixedPrice; // Otherwise, return with two decimal places
}
