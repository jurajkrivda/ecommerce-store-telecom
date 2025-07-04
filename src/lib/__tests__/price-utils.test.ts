import { describe, it, expect } from 'vitest';
import {
  filterProductsByPrice,
  calculatePriceRange,
  formatPrice,
  isValidPriceRange,
} from '../price-utils';
import type { Product } from '@/model/api';

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    price: 10.99,
    description: 'Test product 1',
    category: 'test',
    image: 'https://example.com/1.jpg',
    rating: { rate: 4.5, count: 10 },
  },
  {
    id: 2,
    title: 'Product 2',
    price: 25.5,
    description: 'Test product 2',
    category: 'test',
    image: 'https://example.com/2.jpg',
    rating: { rate: 4.0, count: 5 },
  },
  {
    id: 3,
    title: 'Product 3',
    price: 99.99,
    description: 'Test product 3',
    category: 'test',
    image: 'https://example.com/3.jpg',
    rating: { rate: 3.5, count: 15 },
  },
];

describe('Price Utils', () => {
  describe('filterProductsByPrice', () => {
    it('should filter products within price range', () => {
      const result = filterProductsByPrice(mockProducts, 20, 50);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(2);
      expect(result[0].price).toBe(25.5);
    });

    it('should return all products when range includes all prices', () => {
      const result = filterProductsByPrice(mockProducts, 0, 100);

      expect(result).toHaveLength(3);
    });

    it('should return empty array when no products match', () => {
      const result = filterProductsByPrice(mockProducts, 200, 300);

      expect(result).toHaveLength(0);
    });

    it('should include products at exact price boundaries', () => {
      const result = filterProductsByPrice(mockProducts, 10.99, 25.5);

      expect(result).toHaveLength(2);
      expect(result.map(p => p.id)).toEqual([1, 2]);
    });
  });

  describe('calculatePriceRange', () => {
    it('should calculate correct min and max prices', () => {
      const result = calculatePriceRange(mockProducts);

      expect(result.min).toBe(10.99);
      expect(result.max).toBe(99.99);
    });

    it('should return zeros for empty array', () => {
      const result = calculatePriceRange([]);

      expect(result.min).toBe(0);
      expect(result.max).toBe(0);
    });

    it('should handle single product', () => {
      const result = calculatePriceRange([mockProducts[0]]);

      expect(result.min).toBe(10.99);
      expect(result.max).toBe(10.99);
    });
  });

  describe('formatPrice', () => {
    it('should format price with dollar sign and two decimals', () => {
      expect(formatPrice(10.99)).toBe('$10.99');
      expect(formatPrice(5)).toBe('$5.00');
      expect(formatPrice(99.999)).toBe('$100.00');
    });

    it('should handle zero price', () => {
      expect(formatPrice(0)).toBe('$0.00');
    });
  });

  describe('isValidPriceRange', () => {
    it('should return true for valid ranges', () => {
      expect(isValidPriceRange(0, 100)).toBe(true);
      expect(isValidPriceRange(10, 10)).toBe(true);
      expect(isValidPriceRange(5.99, 25.5)).toBe(true);
    });

    it('should return false for invalid ranges', () => {
      expect(isValidPriceRange(100, 50)).toBe(false);
      expect(isValidPriceRange(-10, 50)).toBe(false);
      expect(isValidPriceRange(10, -5)).toBe(false);
    });
  });
});
