'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo, useCallback } from 'react';
import type { Product } from '@/model/api';
import { PriceFilter } from './price-filter';
import { PRICE_FILTER_CONFIG } from '@/lib/config';
import { filterProductsByPrice } from '@/lib/price-utils';

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  const [minPriceFilter, setMinPriceFilter] = useState(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState(Infinity);

  const priceRange = useMemo(() => {
    return {
      min: PRICE_FILTER_CONFIG.MIN_PRICE,
      max: PRICE_FILTER_CONFIG.MAX_PRICE,
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return filterProductsByPrice(products, minPriceFilter, maxPriceFilter);
  }, [products, minPriceFilter, maxPriceFilter]);

  const handlePriceFilter = useCallback((min: number, max: number) => {
    setMinPriceFilter(min);
    setMaxPriceFilter(max);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        E-commerce Product Catalog
      </h1>

      {/* Price Filter */}
      <div className="mb-8">
        <PriceFilter
          minPrice={priceRange.min}
          maxPrice={priceRange.max}
          onFilter={handlePriceFilter}
        />
      </div>

      {/* Results count */}
      <div className="mb-6 text-sm text-gray-600">
        Showing {filteredProducts.length} of {products.length} products
        {(minPriceFilter > priceRange.min ||
          maxPriceFilter < priceRange.max) && (
          <span className="ml-2 text-blue-600">
            (filtered by price: ${minPriceFilter.toFixed(2)} - $
            {maxPriceFilter.toFixed(2)})
          </span>
        )}
      </div>

      {/* Product Grid */}
      <div
        data-testid="product-grid"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredProducts.map(product => (
          <div
            key={product.id}
            data-testid="product-card"
            className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className="w-full h-48 object-contain mb-4"
                priority={true}
              />
            </Link>
            <h2 className="text-lg font-semibold mb-2 line-clamp-2">
              {product.title}
            </h2>
            <p className="text-gray-500 text-sm mb-2 line-clamp-3">
              {product.description}
            </p>
            <div className="flex justify-between items-center mb-2">
              <span
                data-testid="product-price"
                className="text-xl font-bold text-green-600"
              >
                ${product.price}
              </span>
              <span className="text-sm text-gray-500 capitalize">
                {product.category}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="text-sm ml-1">
                  {product.rating.rate} ({product.rating.count})
                </span>
              </div>
              <Link
                href={`/products/${product.id}`}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors inline-block text-center"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && products.length > 0 && (
        <div className="text-center text-gray-500 py-8">
          No products found in the selected price range.
          <br />
          <button
            onClick={() => handlePriceFilter(priceRange.min, priceRange.max)}
            className="mt-2 text-blue-600 hover:text-blue-800 underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {products.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No products available.
        </div>
      )}
    </div>
  );
}
