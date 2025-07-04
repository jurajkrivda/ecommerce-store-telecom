// Price filter configuration
export const PRICE_FILTER_CONFIG = {
  MIN_PRICE: 0,
  MAX_PRICE: 1000,
  STEP: 0.01,
} as const;

// API configuration
export const API_CONFIG = {
  BASE_URL: 'https://fakestoreapi.com',
  TIMEOUT: 10000,
} as const;

// Pagination configuration
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;
