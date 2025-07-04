import type { Product } from '@/model/api';

export function filterProductsByPrice(
  products: Product[],
  minPrice: number,
  maxPrice: number
): Product[] {
  return products.filter(
    product => product.price >= minPrice && product.price <= maxPrice
  );
}

export function calculatePriceRange(products: Product[]): {
  min: number;
  max: number;
} {
  if (products.length === 0) {
    return { min: 0, max: 0 };
  }

  const prices = products.map(p => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function isValidPriceRange(min: number, max: number): boolean {
  return min >= 0 && max >= 0 && min <= max;
}
