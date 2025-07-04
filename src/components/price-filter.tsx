'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

type PriceFilterProps = {
  minPrice: number;
  maxPrice: number;
  onFilter: (min: number, max: number) => void;
};

export function PriceFilter({
  minPrice,
  maxPrice,
  onFilter,
}: PriceFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const urlMinPrice = searchParams.get('minPrice');
  const urlMaxPrice = searchParams.get('maxPrice');

  const [min, setMin] = useState(
    urlMinPrice ? parseFloat(urlMinPrice) : minPrice
  );
  const [max, setMax] = useState(
    urlMaxPrice ? parseFloat(urlMaxPrice) : maxPrice
  );

  const [isMinEmpty, setIsMinEmpty] = useState(!urlMinPrice);
  const [isMaxEmpty, setIsMaxEmpty] = useState(!urlMaxPrice);

  const updateURL = useCallback(
    (newMin: number, newMax: number) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newMin > minPrice) {
        params.set('minPrice', newMin.toString());
      } else {
        params.delete('minPrice');
      }

      if (newMax < maxPrice) {
        params.set('maxPrice', newMax.toString());
      } else {
        params.delete('maxPrice');
      }

      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;
      router.replace(url, { scroll: false });
    },
    [searchParams, pathname, router, minPrice, maxPrice]
  );

  // Apply filter
  const handleFilter = useCallback(() => {
    const validMin = Math.max(minPrice, Math.min(min || minPrice, maxPrice));
    const validMax = Math.min(maxPrice, Math.max(max || maxPrice, minPrice));

    setMin(validMin);
    setMax(validMax);
    updateURL(validMin, validMax);
    onFilter(validMin, validMax);
  }, [min, max, minPrice, maxPrice, updateURL, onFilter]);

  const handleClear = useCallback(() => {
    setMin(minPrice);
    setMax(maxPrice);
    updateURL(minPrice, maxPrice);
    onFilter(minPrice, maxPrice);
  }, [minPrice, maxPrice, updateURL, onFilter]);

  const handleMinChange = (value: string) => {
    if (value === '') {
      setIsMinEmpty(true);
      const params = new URLSearchParams(searchParams.toString());
      params.delete('minPrice');
      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;
      router.replace(url, { scroll: false });
      onFilter(minPrice, max);
      return;
    }
    setIsMinEmpty(false);
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setMin(numValue);
    }
  };

  const handleMaxChange = (value: string) => {
    if (value === '') {
      setIsMaxEmpty(true);
      const params = new URLSearchParams(searchParams.toString());
      params.delete('maxPrice');
      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;
      router.replace(url, { scroll: false });
      onFilter(min, maxPrice);
      return;
    }
    setIsMaxEmpty(false);
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setMax(numValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleFilter();
    }
  };

  useEffect(() => {
    if (urlMinPrice || urlMaxPrice) {
      const initialMin = urlMinPrice ? parseFloat(urlMinPrice) : minPrice;
      const initialMax = urlMaxPrice ? parseFloat(urlMaxPrice) : maxPrice;
      onFilter(initialMin, initialMax);
    }
  }, [urlMinPrice, urlMaxPrice, minPrice, maxPrice, onFilter]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-white">Filter by Price</h3>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="minPrice"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Min Price
            </label>
            <input
              id="minPrice"
              type="number"
              min={minPrice}
              max={maxPrice}
              step="0.01"
              value={isMinEmpty ? '' : min}
              onChange={e => handleMinChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Min"
            />
          </div>

          <div>
            <label
              htmlFor="maxPrice"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Max Price
            </label>
            <input
              id="maxPrice"
              type="number"
              min={minPrice}
              max={maxPrice}
              step="0.01"
              value={isMaxEmpty ? '' : max}
              onChange={e => handleMaxChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Max"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            ${min.toFixed(2)} - ${max.toFixed(2)}
          </div>

          <div className="space-x-2">
            <button
              onClick={handleClear}
              className="px-3 py-1 text-sm text-gray-400 hover:text-gray-200 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={handleFilter}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
