import { Suspense } from 'react';
import { getProducts } from '@/model/api';
import { ProductGrid } from '@/components/product-grid';

export const revalidate = 300;

export const metadata = {
  title: 'E-commerce Product Catalog - Telecom Store',
  description:
    'Browse our collection of products with advanced filtering options. Find the perfect items with our price range filters.',
};

export default async function Home() {
  const products = await getProducts();

  return (
    <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
      <ProductGrid products={products} />
    </Suspense>
  );
}
