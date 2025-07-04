import { z } from 'zod';
import { API_CONFIG } from '@/lib/config';

const RatingSchema = z.object({
  rate: z.number(),
  count: z.number(),
});

const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string().url(),
  rating: RatingSchema,
});

const ProductsSchema = z.array(ProductSchema);

export type Product = z.infer<typeof ProductSchema>;
export type Rating = z.infer<typeof RatingSchema>;

// Base API URL
const API_BASE_URL = API_CONFIG.BASE_URL;

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const validatedData = ProductsSchema.parse(data);

    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      throw new Error('Invalid data format received from API');
    }

    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function getProduct(id: number): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Product with ID ${id} not found`);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const validatedData = ProductSchema.parse(data);

    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      throw new Error('Invalid data format received from API');
    }

    console.error('Error fetching product:', error);
    throw error;
  }
}
